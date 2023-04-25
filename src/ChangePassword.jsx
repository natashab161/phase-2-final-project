import React, { useState } from 'react';
import { getAuth, updatePassword } from 'firebase/auth';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleChangePassword = async () => {
    setLoading(true);
    setMessage('');
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const email = currentUser.email;
      const credential = EmailAuthProvider.credential(email, oldPassword);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      setMessage('Password successfully updated!');
      setLoading(false);
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Error updating password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="change-password">
      <h3>Change Password</h3>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={handleOldPasswordChange}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={handleNewPasswordChange}
      />
      <button onClick={handleChangePassword} disabled={loading}>
        {loading ? 'Updating Password...' : 'Update Password'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;
