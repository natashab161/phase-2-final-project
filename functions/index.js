const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const os = require('os');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

admin.initializeApp();

const storage = new Storage();

const srcBucketName = 'pullupnyc.appspot.com';
const srcBucket = storage.bucket(srcBucketName);

exports.detectFaces = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  await srcBucket.file(filePath).download({
    destination: tempFilePath,
  });

  const client = new ImageAnnotatorClient();
  const [result] = await client.faceDetection(tempFilePath);
  const faces = result.faceAnnotations;

  const metadata = {
    metadata: {
      faceCount: String(faces.length),
    },
  };

  await srcBucket.file(filePath).setMetadata(metadata);

  console.log(`Image ${fileName} has ${faces.length} face(s).`);

  fs.unlinkSync(tempFilePath);
});

exports.labelDetection = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  await srcBucket.file(filePath).download({
    destination: tempFilePath,
  });

  const client = new ImageAnnotatorClient();
  const [result] = await client.labelDetection(tempFilePath);
  const labels = result.labelAnnotations.map(label => label.description);

  const metadata = {
    metadata: {
      labels: JSON.stringify(labels),
    },
  };

  await srcBucket.file(filePath).setMetadata(metadata);

  console.log(`Image ${fileName} has labels added.`);

  fs.unlinkSync(tempFilePath);
});

exports.objectDetection = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  await srcBucket.file(filePath).download({
    destination: tempFilePath,
  });

  const client = new ImageAnnotatorClient();
  const [result] = await client.objectLocalization(tempFilePath);
  const objects = result.localizedObjectAnnotations;

  const objectData = objects.map((object) => {
    return { name: object.name, score: object.score.toFixed(2) };
  });

  const metadata = {
    metadata: {
      objects: JSON.stringify(objectData),
    },
  };

  await srcBucket.file(filePath).setMetadata(metadata);

  console.log(`Objects detected in ${fileName}:`);
  objects.forEach((object) => {
    console.log(`- ${object.name} (${object.score.toFixed(2)})`);
  });

  fs.unlinkSync(tempFilePath);
});

const { BigQuery } = require('@google-cloud/bigquery');
const projectId = process.env.GCP_PROJECT_ID;
const keyFilename = process.env.GCP_KEY_FILENAME;

const bigquery = new BigQuery({ projectId, keyFilename });

const schema = [
  { name: 'image_url', type: 'STRING' },
  { name: 'type', type: 'STRING' },
  { name: 'description', type: 'STRING' },
  { name: 'score', type: 'FLOAT' },
];

const datasetName = 'photo_video_metadata';
const tableName = 'photo_metadata';

async function uploadImageMetadata(file) {
  try {
    const imageUrl = `gs://${file.bucket}/${file.name}`;
    const metadata = file.metadata;

    const rows = [];

    if (metadata.labels) {
      const labels = JSON.parse(metadata.labels);
      for (const label of labels) {
        rows.push({
          image_url: imageUrl,
          type: 'label',
          description: label,
          score: null,
        });
      }
    }

    if (metadata.objects) {
      const objects = JSON.parse(metadata.objects);
      for (const object of objects) {
        rows.push({
          image_url: imageUrl,
          type: 'object',
          description: object.name,
          score: parseFloat(object.score),
        });
      }
    }

    if (metadata.faces) {
      const faces = JSON.parse(metadata.faces);
      for (let i = 0; i < faces; i++) {
        rows.push({
          image_url: imageUrl,
          type: 'face',
          description: `face_${i + 1}`,
          score: null,
        });
      }
    }

    if (rows.length > 0) {
      await bigquery
        .dataset(datasetName)
        .table(tableName)
        .insert(rows, { schema });

      console.log(`Data uploaded to BigQuery table ${tableName}`);
    }
  } catch (error) {
    console.error(`Error uploading data to BigQuery: ${error}`);
  }
}

exports.handlePhotoMetadata = async (event, context) => {
  const file = storage.bucket(event.bucket).file(event.name);

  if (event.metadata) {
    const metadata = event.metadata;
    file.metadata = metadata;
    await uploadImageMetadata(file);
  } else {
    console.error('No metadata found in the event.');
  }
};
