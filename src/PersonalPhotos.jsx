import React from 'react';
import {
  getFirestore,
  collection,
  where,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { app } from './Firebase';
import './PersonalPhotos.css';

const db = getFirestore(app);

function PersonalPhotos({ user }) {
  const [photos, setPhotos] = React.useState([]);

  React.useEffect(() => {
    const photosRef = collection(db, 'photos');
    const userPhotosQuery = query(
      photosRef,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(userPhotosQuery, (querySnapshot) => {
      const userPhotos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPhotos(userPhotos);
    });

    return () => {
      unsubscribe();
    };
  }, [db, user.uid]);

  return (
    <div className="personal-photos">
      <h2>Your Photos</h2>
      {photos.map((photo) => (
        <div key={photo.id} className="personal-photo">
          <img src={photo.url} alt={photo.caption} />
          <p>{photo.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default PersonalPhotos;

// import React, { useState, useEffect } from 'react';
// import {
//   getStorage,
//   ref,
//   listAll,
//   getMetadata,
//   deleteObject,
//   getDownloadURL,
//   uploadBytesResumable
// } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';
// import "./PersonalPhotos.css"

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

//   const handleUpload = (event) => {
//     event.preventDefault();
//     const selectedFile = event.target.files[0];
//     const storageRef = ref(storage, `images/${selectedFile.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, selectedFile);

//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on('state_changed', (snapshot) => {
//       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log('Upload is ' + progress + '% done');
//     }, (error) => {
//       console.log('Upload error:', error);
//     }, async () => {
//       // Upload completed successfully, now get the download URL
//       const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//       console.log('File uploaded:', downloadURL);
//       setPhotos([...photos, { url: downloadURL, ref: uploadTask.snapshot.ref }]);
//     });
//   };

//   return (
//     <div className="personal-photos-container">
//       <h1 className="personal-photos-title">Your Personal Photos</h1>
//       <div className="personal-photos">
//         {photos.map((photo) => (
//           <div className="photo-container" key={photo.url}>
//             <img className="photo" src={photo.url} alt="User uploaded" />
//             <button className="delete-button" onClick={() => handleDelete(photo.ref)}>Delete</button>
//           </div>
//         ))}
//       </div>
//       <form className="upload-form" onSubmit={handleUpload}>
//         <label htmlFor="file-upload" className="upload-button">Choose File</label>
//         <input type="file" id="file-upload" onChange={handleUpload} />
//         <button type="submit" className="upload-submit-button">Upload</button>
//       </form>
//     </div>
//   );
// };

// export default PersonalPhotos;
