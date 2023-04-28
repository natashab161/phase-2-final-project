
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import './ProfilePage.css';
import { app, auth } from './Firebase';
import UserInfo from './UserInfo';
import EditDisplayName from './EditDisplayName';
import PersonalPhotos from './PersonalPhotos';
import VideoUploadForm from './VideoUploadForm';
import PhotoGallery from './PhotoGallery';

const storage = getStorage(app);
const db = getFirestore(app);

function ProfilePage() {
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (currentUser && currentUser.photoURL) {
      setUrl(currentUser.photoURL);
    }
    fetchBio();
  }, [currentUser]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      return;
    }
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // progress function ...
      },
      (error) => {
        // error function ...
        console.log(error);
      },
      async () => {
        // complete function ...
        const downloadURL = await getDownloadURL(storageRef);
        setUrl(downloadURL);
        await updateProfile(currentUser, {
          photoURL: downloadURL,
        });
      }
    );
  };

  const updateBio = async () => {
    const userDocRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userDocRef, {
      bio,
    });
  };

  const fetchBio = async () => {
    if (!currentUser || !currentUser.uid) {
      return;
    }

    const docRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBio(docSnap.data().bio);
    }
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="profile-page">
      <h1>Welcome, {currentUser.displayName}</h1>
      <EditDisplayName user={currentUser} />

      {/* <UserInfo user={currentUser} /> */}
      <div className="profile-info">
        <img src={url} alt="profile" className="profile-picture" />
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload Profile Picture</button>
      </div>
      <div className="bio-section">
        <h3>Bio</h3>
        <textarea
          className="bio-input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows="5"
          cols="30"
        ></textarea>
        <button onClick={updateBio}>Update Bio</button>
      </div>
      <PhotoGallery />
      <PersonalPhotos />
      <VideoUploadForm />
    </div>
  );
}

export default ProfilePage;