const { BigQuery } = require('@google-cloud/bigquery');
const { Storage } = require('@google-cloud/storage');

const projectId = process.env.GCP_PROJECT_ID;
const keyFilename = process.env.GCP_KEY_FILENAME;

const bigquery = new BigQuery({ projectId, keyFilename });
const storage = new Storage({ projectId, keyFilename });

const bucketName = 'cloud-vision-labels-bucket';

const schema = [
  { name: 'image_url', type: 'STRING' },
  { name: 'label', type: 'STRING' },
  { name: 'score', type: 'FLOAT' },
];

async function uploadImageMetadata() {
  try {
    const files = await storage.bucket(bucketName).getFiles();

    const rows = [];

    for (const file of files[0]) {
      const imageUrl = `gs://${bucketName}/${file.name}`;
      const labels = file.metadata.labels;

      if (labels) {
        for (const label of Object.keys(labels)) {
          const score = labels[label];
          rows.push({ image_url: imageUrl, label, score });
        }
      }
    }

    const tableName = 'mydataset.mytable';

    await bigquery.dataset(tableName).insert(rows, { schema });

    console.log(`Data uploaded to BigQuery table ${tableName}`);
  } catch (error) {
    console.error(`Error uploading data to BigQuery: ${error}`);
  }
}

module.exports = { uploadImageMetadata };
