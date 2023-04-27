import { useEffect, useState } from 'react';
import { getStorage, ref, onUpload } from 'firebase/storage';

const useUploadListener = (path) => {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const storage = getStorage();

  useEffect(() => {
    const storageRef = ref(storage, path);
    const unsubscribe = onUpload(storageRef, (snapshot) => {
      setUploadedPhoto(snapshot.ref);
    });

    return () => {
      unsubscribe();
    };
  }, [storage, path]);

  return uploadedPhoto;
};

export default useUploadListener;
