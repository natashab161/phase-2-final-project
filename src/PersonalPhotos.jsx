import React, { useState, useEffect } from 'react';
import {
  getStorage,
  ref,
  listAll,
  getMetadata,
  deleteObject,
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
          const photoUrl = await itemRef.getDownloadURL();
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
    </div>
  );
};

export default PersonalPhotos;
