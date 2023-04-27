import React, { useState, useEffect } from 'react';
import {
  getStorage,
  ref,
  listAll,
  getMetadata,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable
} from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const PersonalPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const storage = getStorage();
  const auth = getAuth();

  useEffect(() => {
    const fetchPhotos = async () => {
      const storageRef = ref(storage, 'images');
      const listResult = await listAll(storageRef);
      const currentUserUid = auth.currentUser.uid;

      const personalPhotos = [];

      for (const itemRef of listResult.items) {
        const metadata = await getMetadata(itemRef);
        if (metadata.customMetadata && metadata.customMetadata.uploadedBy === currentUserUid) {
          const photoUrl = await getDownloadURL(itemRef);
          personalPhotos.push({ url: photoUrl, ref: itemRef });
        }
      }

      setPhotos(personalPhotos);
    };

    fetchPhotos();
  }, [storage, auth]);

  const handleDelete = async (photoRef) => {
    await deleteObject(photoRef);
    setPhotos(photos.filter((photo) => photo.ref !== photoRef));
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    const storageRef = ref(storage, `images/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed', (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, (error) => {
      console.log('Upload error:', error);
    }, async () => {
      // Upload completed successfully, now get the download URL
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log('File uploaded:', downloadURL);
      setPhotos([...photos, { url: downloadURL, ref: uploadTask.snapshot.ref }]);
    });
  };

  return (
    <div>
      <h1>Your Personal Photos</h1>
      <div>
        {photos.map((photo) => (
          <div key={photo.url}>
            <img src={photo.url} alt="User uploaded" width="200" />
            <button onClick={() => handleDelete(photo.ref)}>Delete</button>
          </div>
        ))}
      </div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleUpload} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default PersonalPhotos;



// import React, { useState, useEffect } from 'react';
// import {
//   getStorage,
//   ref,
//   listAll,
//   getMetadata,
//   deleteObject,
//   getDownloadURL,
// } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';

// const PersonalPhotos = () => {
//   const [photos, setPhotos] = useState([]);
//   const storage = getStorage();
//   const auth = getAuth();

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       const storageRef = ref(storage, 'images');
//       const listResult = await listAll(storageRef);
//       const currentUserUid = auth.currentUser.uid;

//       const personalPhotos = [];

//       for (const itemRef of listResult.items) {
//         const metadata = await getMetadata(itemRef);
//         if (metadata.customMetadata && metadata.customMetadata.uploadedBy === currentUserUid) {
//           const photoUrl = await getDownloadURL(itemRef);
//           personalPhotos.push({ url: photoUrl, ref: itemRef });
//         }
//       }

//       setPhotos(personalPhotos);
//     };

//     fetchPhotos();
//   }, [storage, auth]);

//   const handleDelete = async (photoRef) => {
//     await deleteObject(photoRef);
//     setPhotos(photos.filter((photo) => photo.ref !== photoRef));
//   };

//   return (
//     <div>
//       <h1>Your Personal Photos</h1>
//       <div>
//         {photos.map((photo) => (
//           <div key={photo.url}>
//             <img src={photo.url} alt="User uploaded" width="200" />
//             <button onClick={() => handleDelete(photo.ref)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PersonalPhotos;
