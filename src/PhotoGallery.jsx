import React, { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const PhotoGallery = () => {
  const [photoUrls, setPhotoUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const storage = getStorage();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Get a list of all the photos in the 'images' folder
        const storageRef = ref(storage, 'images');
        const res = await listAll(storageRef);
        const photoRefs = res.items;

        // Get the download URL for each photo and add it to the state
        const urls = [];
        for (let i = 0; i < photoRefs.length; i++) {
          const url = await getDownloadURL(photoRefs[i]);
          urls.push(url);
        }
        setPhotoUrls(urls);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading photos...</p>
      ) : photoUrls.length > 0 ? (
        photoUrls.map((url, index) => (
          <img src={url} alt={`photo ${index}`} key={index} />
        ))
      ) : (
        <p>No photos to display</p>
      )}
    </div>
  );
};

export default PhotoGallery;
