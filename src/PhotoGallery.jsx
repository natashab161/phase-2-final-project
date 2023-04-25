// PhotoGallery.jsx
import React, { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import "./PhotoGallery.css";

const PhotoGallery = () => {
  const [photoUrls, setPhotoUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState("");
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

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 3));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(photoUrls.length - 3, prevIndex + 3));
  };

  const handleImageClick = (url) => {
    setModalVisible(true);
    setModalImage(url);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="photo-gallery">
      {loading ? (
        <p>Loading photos...</p>
      ) : photoUrls.length > 0 ? (
        <>
          {photoUrls.slice(currentIndex, currentIndex + 3).map((url, index) => (
            <img
              src={url}
              alt={`photo ${index}`}
              key={index}
              onClick={() => handleImageClick(url)}
            />
          ))}
          <div className="nav-button left" onClick={handlePrevClick}>&lt;</div>
          <div className="nav-button right" onClick={handleNextClick}>&gt;</div>
          {modalVisible && (
            <div className="modal" onClick={closeModal}>
              <img src={modalImage} alt="full-size" />
              <div className="close" onClick={closeModal}>&times;</div>
            </div>
          )}
        </>
      ) : (
        <p>No photos to display</p>
      )}
    </div>
  );
};

export default PhotoGallery;
