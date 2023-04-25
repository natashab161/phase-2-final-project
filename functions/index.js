// Import the required libraries and initialize the Firebase app
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const os = require('os');
const path = require('path');
const fs = require('fs');

admin.initializeApp();

// Create a new storage bucket
const storage = new Storage();
const srcBucketName = 'pullupnyc.appspot.com';
const dstBucketName = 'cloud-vision-faces-bucket';
const srcBucket = storage.bucket(srcBucketName);
const dstBucket = storage.bucket(dstBucketName);

// Create a function that listens to changes in the 'images' directory
exports.detectFaces = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const bucketDir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  // Download the image to a temporary directory
  await srcBucket.file(filePath).download({
    destination: tempFilePath,
  });

  // Analyze the image using Cloud Vision API to detect faces
  const client = new ImageAnnotatorClient();
  const [result] = await client.faceDetection(tempFilePath);
  const faces = result.faceAnnotations;

  // Check if the image has any faces and upload to the new bucket if it does
  if (faces.length > 0) {
    const newFilePath = path.join(bucketDir, 'faces', fileName);
    await dstBucket.upload(tempFilePath, {
      destination: newFilePath,
      metadata: {
        contentType: 'image/jpeg',
      },
    });
    console.log(`Image ${fileName} uploaded to ${dstBucketName}.`);
  } else {
    console.log(`Image ${fileName} does not contain any faces.`);
  }

  // Delete the temporary file
  await fs.unlinkSync(tempFilePath);
});

// Export the bucket name for use in other components
exports.bucketName = dstBucketName;
