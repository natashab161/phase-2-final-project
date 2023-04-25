import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const VideoUploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.type.includes("video")) {
        setFile(selectedFile);
        setError(null);
      } else {
        setFile(null);
        setError("Please select a video file (mp4, avi, mov).");
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (file) {
      const auth = getAuth();
      const storage = getStorage();
      const user = auth.currentUser;

      // Create a storage reference with the user's uid and the file name
      const storageRef = ref(storage, `users/${user.uid}/${file.name}`);

      // Upload the file to Firebase Cloud Storage
      const uploadTask = uploadBytes(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get the upload progress as a percentage
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          setError("An error occurred while uploading the file. Please try again.");
        },
        () => {
          // Upload complete, reset state
          setFile(null);
          setProgress(0);
        }
      );
    } else {
      setError("Please select a video file (mp4, avi, mov).");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileInputChange} />
      {error && <p>{error}</p>}
      {progress > 0 && <p>Uploading {progress.toFixed(0)}%</p>}
      <button type="submit" disabled={!file}>
        Upload
      </button>
    </form>
  );
};

export default VideoUploadForm;
