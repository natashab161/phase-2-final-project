// Import the required libraries and initialize the Firebase app
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const os = require('os');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

admin.initializeApp();

// Create a new storage bucket
const storage = new Storage();

const srcBucketName = 'pullupnyc.appspot.com';
const faceDstBucketName = 'cloud-vision-faces-bucket';
const labelDstBucketName = 'cloud-vision-labels-bucket';
const objectDstBucketName = 'cloud-vision-objects-bucket';

const srcBucket = storage.bucket(srcBucketName);
const faceDstBucket = storage.bucket(faceDstBucketName);
const labelDstBucket = storage.bucket(labelDstBucketName);
const objectDstBucket = storage.bucket(objectDstBucketName);

// detectFaces function
exports.detectFaces = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
const bucketDir = path.dirname(filePath);
const fileName = path.basename(filePath);
const fileExtension = path.extname(fileName);
const tempFilePath = path.join(os.tmpdir(), fileName);

// Download the image to a temporary directory
await srcBucket.file(filePath).download({
  destination: tempFilePath,
});

// Analyze the image using Cloud Vision API to detect faces
const client = new ImageAnnotatorClient();
const [result] = await client.faceDetection(tempFilePath);
const faces = result.faceAnnotations;

// Check if the image has any faces
if (faces.length > 0) {
  const promises = faces.map(async (face, index) => {
    const vertices = face.boundingPoly.vertices;
    const x = vertices[0].x;
    const y = vertices[0].y;
    const width = vertices[2].x - x;
    const height = vertices[2].y - y;

    // Crop the face from the original image
    const faceFileName = `${path.basename(fileName, fileExtension)}_face${index}${fileExtension}`;
    const faceTempFilePath = path.join(os.tmpdir(), faceFileName);
    await sharp(tempFilePath)
      .extract({ left: x, top: y, width, height })
      .toFile(faceTempFilePath);

    // Upload the cropped face to the new bucket
    const newFilePath = path.join(bucketDir, 'faces', faceFileName);
    await faceDstBucket.upload(faceTempFilePath, {
      destination: newFilePath,
      metadata: {
        contentType: object.contentType,
      },
    });

    // Delete the temporary face file
    fs.unlinkSync(faceTempFilePath);
    console.log(`Face ${index + 1} from ${fileName} uploaded to ${faceDstBucketName}.`);
  });

  // Wait for all cropped face uploads to complete
  await Promise.all(promises);
} else {
  console.log(`Image ${fileName} does not contain any faces.`);
}

// Delete the temporary file
fs.unlinkSync(tempFilePath);

});

// labelDetection function
exports.labelDetection = functions.storage.object().onFinalize(async (object) => {
  // const filePath = object.name;
const bucketDir = path.dirname(filePath);
const fileName = path.basename(filePath);
const fileExtension = path.extname(fileName);
const tempFilePath = path.join(os.tmpdir(), fileName);

// Download the image to a temporary directory
await srcBucket.file(filePath).download({
  destination: tempFilePath,
});

// Analyze the image using Cloud Vision API to detect labels
const client = new ImageAnnotatorClient();
const [result] = await client.labelDetection(tempFilePath);
const labels = result.labelAnnotations.map(label => label.description);

// Add labels to the image metadata
const metadata = {
  contentType: object.contentType,
  metadata: {
    labels: JSON.stringify(labels),
  },
};

// Upload the image with the new metadata to the new bucket
const newFilePath = path.join(bucketDir, 'labeled', fileName);
await labelDstBucket.upload(tempFilePath, {
  destination: newFilePath,
  metadata: metadata,
});

console.log(`Image ${fileName} with labels added uploaded to ${labelDstBucketName}.`);

// Delete the temporary file
fs.unlinkSync(tempFilePath);

});

// Initialize the Cloud Vision client
const visionClient = new ImageAnnotatorClient();

// Add the objectDetection function to your existing functions
exports.objectDetection = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  // Download the image to a temporary directory
  await srcBucket.file(filePath).download({
    destination: tempFilePath,
  });

  // Perform object detection using the Vision API
  const [result] = await visionClient.objectLocalization(tempFilePath);
  const objects = result.localizedObjectAnnotations;

  // Process the objects and create a metadata object
  const objectData = objects.map((object) => {
    return { name: object.name, score: object.score.toFixed(2) };
  });
  const metadata = {
    metadata: {
      objects: JSON.stringify(objectData),
    },
  };

  // Upload the image with new metadata to the destination bucket
  await objectDstBucket.upload(tempFilePath, {
    destination: filePath,
    metadata: metadata,
  });

  // Log the objects
  console.log(`Objects detected in ${fileName}:`);
  objects.forEach((object) => {
    console.log(`- ${object.name} (${object.score.toFixed(2)})`);
  });

  // Delete the temporary file
  fs.unlinkSync(tempFilePath);
});

// Export the bucket names for use in other components
exports.faceBucketName = faceDstBucketName;
exports.labelBucketName = labelDstBucketName;
exports.objectBucketName = objectDstBucketName;


// // Import the required libraries and initialize the Firebase app
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const { Storage } = require('@google-cloud/storage');
// const { ImageAnnotatorClient } = require('@google-cloud/vision');
// const os = require('os');
// const path = require('path');
// const fs = require('fs');
// const sharp = require('sharp');

// admin.initializeApp();

// // Create a new storage bucket
// const storage = new Storage();

// const srcBucketName = 'pullupnyc.appspot.com';
// const faceDstBucketName = 'cloud-vision-faces-bucket';
// const labelDstBucketName = 'cloud-vision-labels-bucket';

// const srcBucket = storage.bucket(srcBucketName);
// const faceDstBucket = storage.bucket(faceDstBucketName);
// const labelDstBucket = storage.bucket(labelDstBucketName);

// // Create a function that listens to changes in the 'images' directory for face detection
// exports.detectFaces = functions.storage.object().onFinalize(async (object) => {
//   const filePath = object.name;
// const bucketDir = path.dirname(filePath);
// const fileName = path.basename(filePath);
// const fileExtension = path.extname(fileName);
// const tempFilePath = path.join(os.tmpdir(), fileName);

// // Download the image to a temporary directory
// await srcBucket.file(filePath).download({
//   destination: tempFilePath,
// });

// // Analyze the image using Cloud Vision API to detect faces
// const client = new ImageAnnotatorClient();
// const [result] = await client.faceDetection(tempFilePath);
// const faces = result.faceAnnotations;

// // Check if the image has any faces
// if (faces.length > 0) {
//   const promises = faces.map(async (face, index) => {
//     const vertices = face.boundingPoly.vertices;
//     const x = vertices[0].x;
//     const y = vertices[0].y;
//     const width = vertices[2].x - x;
//     const height = vertices[2].y - y;

//     // Crop the face from the original image
//     const faceFileName = `${path.basename(fileName, fileExtension)}_face${index}${fileExtension}`;
//     const faceTempFilePath = path.join(os.tmpdir(), faceFileName);
//     await sharp(tempFilePath)
//       .extract({ left: x, top: y, width, height })
//       .toFile(faceTempFilePath);

//     // Upload the cropped face to the new bucket
//     const newFilePath = path.join(bucketDir, 'faces', faceFileName);
//     await faceDstBucket.upload(faceTempFilePath, {
//       destination: newFilePath,
//       metadata: {
//         contentType: object.contentType,
//       },
//     });

//     // Delete the temporary face file
//     fs.unlinkSync(faceTempFilePath);
//     console.log(`Face ${index + 1} from ${fileName} uploaded to ${faceDstBucketName}.`);
//   });

//   // Wait for all cropped face uploads to complete
//   await Promise.all(promises);
// } else {
//   console.log(`Image ${fileName} does not contain any faces.`);
// }

// // Delete the temporary file
// fs.unlinkSync(tempFilePath);

// });

// // Initialize the Cloud Vision client
// const visionClient = new ImageAnnotatorClient();

// // Add the labelDetection function to your existing functions
// exports.labelDetection = functions.storage.object().onFinalize(async (object) => {
//   const filePath = object.name;
//   const fileName = path.basename(filePath);
//   const tempFilePath = path.join(os.tmpdir(), fileName);

//   // Download the image to a temporary directory
//   await srcBucket.file(filePath).download({
//     destination: tempFilePath,
//   });

//   // Perform label detection using the Vision API
//   const [result] = await visionClient.labelDetection(tempFilePath);
//   const labels = result.labelAnnotations;

//   // Process the labels and create a metadata object
//   const labelData = labels.map((label) => {
//     return { description: label.description, score: label.score.toFixed(2) };
//   });
//   const metadata = {
//     metadata: {
//       labels: JSON.stringify(labelData),
//     },
//   };

//   // Upload the image with new metadata to the destination bucket
//   await labelDstBucket.upload(tempFilePath, {
//     destination: filePath,
//     metadata: metadata,
//   });

//   // Log the labels
//   console.log(`Labels detected in ${fileName}:`);
//   labels.forEach((label) => {
//     console.log(`- ${label.description} (${label.score.toFixed(2)})`);
//   });

//   // Delete the temporary file
//   fs.unlinkSync(tempFilePath);
// });

// // Export the bucket names for use in other components
// exports.faceBucketName = faceDstBucketName;
// exports.labelBucketName = labelDstBucketName;
