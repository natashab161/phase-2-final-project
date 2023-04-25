import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth } from './Firebase';

function EditDisplayName({ user }) {
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);

  const handleChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });
      alert("Display name updated successfully!");
    } catch (error) {
      console.error("Error updating display name:", error);
    }
  };

  return (
    <div className="edit-display-name">
      <h3>Edit Display Name</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newDisplayName}
          onChange={handleChange}
          placeholder="New display name"
        />
        <button type="submit">Update Display Name</button>
      </form>
    </div>
  );
}

export default EditDisplayName;
