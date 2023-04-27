// // index.js
// const { BigQuery } = require('@google-cloud/bigquery');
// const { Storage } = require('@google-cloud/storage');

// const projectId = process.env.GCP_PROJECT_ID;
// const keyFilename = process.env.GCP_KEY_FILENAME;

// const bigquery = new BigQuery({ projectId, keyFilename });
// const storage = new Storage({ projectId, keyFilename });

// const schema = [
//   { name: 'image_url', type: 'STRING' },
//   { name: 'type', type: 'STRING' },
//   { name: 'description', type: 'STRING' },
//   { name: 'score', type: 'FLOAT' },
// ];

// const datasetName = 'photo_video_metadata';
// const tableName = 'photo_metadata';

// async function uploadImageMetadata(file) {
//   try {
//     const imageUrl = `gs://${file.bucket}/${file.name}`;
//     const metadata = file.metadata;

//     const rows = [];

//     // Process labels
//     if (metadata.labels) {
//       for (const label of Object.keys(metadata.labels)) {
//         rows.push({
//           image_url: imageUrl,
//           type: 'label',
//           description: label,
//           score: metadata.labels[label].score,
//         });
//       }
//     }

//     // Process objects
//     if (metadata.objects) {
//       for (const object of Object.keys(metadata.objects)) {
//         rows.push({
//           image_url: imageUrl,
//           type: 'object',
//           description: object,
//           score: metadata.objects[object].score,
//         });
//       }
//     }

//     // Process faces
//     if (metadata.faces) {
//       for (const face of Object.keys(metadata.faces)) {
//         rows.push({
//           image_url: imageUrl,
//           type: 'face',
//           description: face,
//           score: metadata.faces[face].score,
//         });
//       }
//     }

//     if (rows.length > 0) {
//       await bigquery
//         .dataset(datasetName)
//         .table(tableName)
//         .insert(rows, { schema });

//       console.log(`Data uploaded to BigQuery table ${tableName}`);
//     }
//   } catch (error) {
//     console.error(`Error uploading data to BigQuery: ${error}`);
//   }
// }

// exports.handlePhotoMetadata = async (event, context) => {
//   const file = storage.bucket(event.bucket).file(event.name);

//   if (event.metadata) {
//     const metadata = event.metadata;
//     file.metadata = metadata;
//     await uploadImageMetadata(file);
//   } else {
//     console.error('No metadata found in the event.');
//   }
// };
