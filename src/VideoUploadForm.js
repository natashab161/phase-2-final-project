import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import "./VideoUploadForm.css";

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

      try {
        // Upload the file to Firebase Cloud Storage
        const snapshot = await uploadBytes(storageRef, file, { contentType: file.type });

        // Upload complete, reset state
        setFile(null);
        setProgress(0);
      } catch (error) {
        console.log(error);
        setError("An error occurred while uploading the file. Please try again.");
      }

    } else {
      setError("Please select a video file (mp4, avi, mov).");
    }
  };

  return (
    <form className="video-upload-form" onSubmit={handleUpload}>
      <p className="video-upload-form__label">Please select a video file (mp4, avi, mov) to upload for your event.</p>
      <p className="video-upload-form__label">Tips:</p>
      <ul className="video-upload-form__tips">
        <li>Make sure the video is clear and not blurry</li>
        <li>Record the video in landscape mode for best viewing experience</li>
        <li>Keep the video under 10 minutes long to keep your audience engaged</li>
      </ul>
      <div className="video-upload-form__upload-wrapper">
        <label htmlFor="file-upload" className="video-upload-form__file-upload-button">
          Choose File
        </label>
        <input type="file" id="file-upload" onChange={handleFileInputChange} />
        <button type="submit" className="video-upload-form__submit-button" disabled={!file}>
          {progress > 0 ? `Uploading ${progress.toFixed(0)}%` : "Upload"}
        </button>
      </div>
      {error && <p className="video-upload-form__error">{error}</p>}
    </form>
  );
};

export default VideoUploadForm;
