import React from 'react';

const UserInfo = ({ user }) => {
  return (
    <div className="user-info">
      <h2>User Information</h2>
      <div>
        <label><strong>Display Name:</strong></label>
        <p>{user.displayName}</p>
      </div>
      <div>
        <label><strong>Email:</strong></label>
        <p>{user.email}</p>
      </div>
      {/* Add more fields here if needed */}
    </div>
  );
};

export default UserInfo;
