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

exports.uploadToFirebase = functions.storage.object().onFinalize(async (object) => {
  try {
    const filePath = object.name;
    const fileName = path.basename(filePath);
    const metadata = object.metadata;
    const uid = object.metadata && object.metadata.uid;

    if (metadata) {
      const imageUrl = `gs://${srcBucketName}/${fileName}`;
      const metadataObj = {
        imageUrl,
        uid,
        metadata,
      };
      await admin.database().ref('photos').push(metadataObj);
      console.log(`Image metadata added to Firebase Realtime Database`);
    } else {
      console.error(`No metadata found in the event.`);
    }
  } catch (error) {
    console.error(`Error uploading data to Firebase: ${error}`);
  }
});

exports.landmarkDetection = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  await srcBucket.file(filePath).download({
    destination: tempFilePath,
  });

  const client = new ImageAnnotatorClient();
  const [result] = await client.landmarkDetection(tempFilePath);
  const landmarks = result.landmarkAnnotations.map((landmark) => ({
    description: landmark.description,
    score: landmark.score.toFixed(2),
    locations: landmark.locations.map((location) => ({
      latitude: location.latLng.latitude,
      longitude: location.latLng.longitude,
    })),
  }));

  const metadata = {
    metadata: {
      landmarks: JSON.stringify(landmarks),
    },
  };

  await srcBucket.file(filePath).setMetadata(metadata);

  console.log(`Landmarks detected in ${fileName}:`);
  landmarks.forEach((landmark) => {
    console.log(`- ${landmark.description} (${landmark.score})`);
  });

  fs.unlinkSync(tempFilePath);
});

exports.logoDetection = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  await srcBucket.file(filePath).download({
    destination: tempFilePath,
  });

  const client = new ImageAnnotatorClient();
  const [result] = await client.logoDetection(tempFilePath);
  const logos = result.logoAnnotations.map((logo) => ({
    description: logo.description,
    score: logo.score.toFixed(2),
  }));

  const metadata = {
    metadata: {
      logos: JSON.stringify(logos),
    },
  };

  await srcBucket.file(filePath).setMetadata(metadata);

  console.log(`Logos detected in ${fileName}:`);
  logos.forEach((logo) => {
    console.log(`- ${logo.description} (${logo.score})`);
  });

  fs.unlinkSync(tempFilePath);
});

exports.objectLocalization = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  await srcBucket.file(filePath).download({
    destination: tempFilePath,
  });

  const client = new ImageAnnotatorClient();
  const [result] = await client.objectLocalization(tempFilePath);
  const objects = result.localizedObjectAnnotations.map((object) => ({
    name: object.name,
    score: object.score.toFixed(2),
    locations: object.boundingPoly.normalizedVertices.map((vertex) => ({
      x: vertex.x,
      y: vertex.y,
    })),
  }));

  const metadata = {
    metadata: {
      objects: JSON.stringify(objects),
    },
  };

  await srcBucket.file(filePath).setMetadata(metadata);

  console.log(`Objects detected in ${fileName}:`);
  objects.forEach((object) => {
    console.log(`- ${object.name} (${object.score})`);
  });

  fs.unlinkSync(tempFilePath);
});

exports.webDetection = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  await srcBucket.file(filePath).download({
    destination: tempFilePath,
  });

  const client = new ImageAnnotatorClient();
  const [result] = await client.webDetection(tempFilePath);
  const webDetection = result.webDetection;

  const entities = webDetection.webEntities.map((entity) => ({
    entityId: entity.entityId,
    description: entity.description,
    score: entity.score.toFixed(2),
  }));

  const pages = webDetection.pagesWithMatchingImages.map((page) => ({
    url: page.url,
    score: page.score.toFixed(2),
  }));

  const metadata = {
    metadata: {
      webEntities: JSON.stringify(entities),
      pagesWithMatchingImages: JSON.stringify(pages),
    },
  };

  await srcBucket.file(filePath).setMetadata(metadata);

  console.log(`Web entities and pages detected in ${fileName}:`);
  entities.forEach((entity) => {
    console.log(`- ${entity.description} (${entity.score})`);
  });
  pages.forEach((page) => {
    console.log(`- ${page.url} (${page.score})`);
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

function uploadImageMetadata(imageUrl, metadata) {
  return new Promise(async (resolve, reject) => {
    try {
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

      resolve();
    } catch (error) {
      console.error(`Error uploading data to BigQuery: ${error}`);
      reject(error);
    }
  });
}

exports.syncPhotoMetadata = functions.database
  .ref('/photo_metadata/{photoId}')
  .onWrite(async (change, context) => {
    const { photoId } = context.params;

    if (!change.after.exists()) {
      console.log(`Photo metadata with ID ${photoId} deleted.`);
      return null;
    }

    const { imageUrl, metadata } = change.after.val();

    try {
      await uploadImageMetadata(imageUrl, metadata);
    } catch (error) {
      console.error(`Error syncing photo metadata with ID ${photoId}: ${error}`);
    }

    console.log(`Photo metadata with ID ${photoId} synced with BigQuery.`);
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


const bq = new BigQuery({ projectId, keyFilename });

const schema2 = [
  { name: 'image_url', type: 'STRING' },
  { name: 'type', type: 'STRING' },
  { name: 'description', type: 'STRING' },
  { name: 'score', type: 'FLOAT' },
];

const datasetName2 = 'photo_video_metadata';
const tableName2 = 'photo_metadata';

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
        .dataset(datasetName2)
        .table(tableName2)
        .insert(rows, { schema });

      console.log(`Data uploaded to BigQuery table ${tableName}`);
    }
  } catch (error) {
    console.error(`Error uploading data to BigQuery: ${error}`);
  }
}

exports.handlePhotoMetadata = async (event, context) => {
  const { name: fileName, bucket: bucketName, metadata } = event;

  if (metadata) {
    const { photoId } = metadata;
    const imageUrl = `gs://${bucketName}/${fileName}`;
    const metadataRef = admin.database().ref(`photo_metadata/${photoId}`);
    
    metadataRef.set({ imageUrl, ...metadata }, (error) => {
      if (error) {
        console.error(`Error syncing photo metadata to Realtime Database: ${error}`);
      } else {
        console.log(`Photo metadata for ${photoId} synced to Realtime Database.`);
      }
    });
    
    await uploadImageMetadata({ bucket: bucketName, name: fileName, metadata });
  } else {
    console.error('No metadata found in the event.');
  }
};

exports.countMenWomenInImage = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  await storage.bucket(object.bucket).file(filePath).download({
    destination: tempFilePath,
  });

  const [result] = await client.faceDetection(tempFilePath);
  const faces = result.faceAnnotations;

  let numMen = 0;
  let numWomen = 0;

  faces.forEach((face) => {
    const isMale = face.genderLikelihood === 'MALE';
    if (isMale) {
      numMen++;
    } else {
      numWomen++;
    }
  });

  const metadata = {
    metadata: {
      numMen,
      numWomen,
    },
  };

  await storage.bucket(object.bucket).file(filePath).setMetadata(metadata);

  console.log(`Number of men and women detected in ${fileName}:`);
  console.log(`- Men: ${numMen}`);
  console.log(`- Women: ${numWomen}`);

  fs.unlinkSync(tempFilePath);
});

exports.detectEthnicity = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const fileName = filePath.split('/').pop();
  const tempFilePath = `/tmp/${fileName}`;

  // Download file from bucket
  await storage.bucket(object.bucket).file(filePath).download({ destination: tempFilePath });
  console.log(`Image ${fileName} downloaded locally to ${tempFilePath}`);

  // Detect faces in the image
  const [result] = await vision.faceDetection(tempFilePath);
  const faces = result.faceAnnotations;

  console.log(`Found ${faces.length} face${faces.length === 1 ? '' : 's'} in ${fileName}`);

  // Extract ethnicity information from the face annotations
  const ethnicityData = faces.map((face) => {
    const { likelihood } = face.underExposedLikelihood === 'VERY_UNLIKELY' && face.overExposedLikelihood === 'VERY_UNLIKELY' ? face.dominantColors.colors[0] : {};

    return { ethnicity: face.attributes.find(attr => attr.name === 'ETHNICITY').value, confidence: face.attributes.find(attr => attr.name === 'ETHNICITY').confidence, skinColorLikelihood: likelihood };
  });

  // Set metadata with ethnicity information
  await storage.bucket(object.bucket).file(filePath).setMetadata({
    metadata: {
      ethnicityData: JSON.stringify(ethnicityData)
    }
  });
  console.log(`Metadata updated for ${fileName}`);

  // Delete local file
  fs.unlinkSync(tempFilePath);
});

