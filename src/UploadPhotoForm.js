import React, { useState } from 'react';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  updateMetadata,
} from 'firebase/storage';
import { getAuth } from 'firebase/auth';



const UploadPhotoForm = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const storage = getStorage();
  const auth = getAuth();

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles([...selectedFiles]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!files.length) {
      alert('No files selected');
      return;
    }

    try {
      setLoading(true);
      
      const uploadPromises = files.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTaskSnapshot = await uploadBytes(storageRef, file);

        const metadata = {
          customMetadata: {
            uploadedBy: auth.currentUser.uid,
          },
        };

        await updateMetadata(uploadTaskSnapshot.ref, metadata);

        const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
        console.log('File uploaded:', downloadURL);
      });

      await Promise.all(uploadPromises);
      setLoading(false);
    } catch (error) {
      console.error('Upload error:', error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="upload-photo-form">
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};

export default UploadPhotoForm;

