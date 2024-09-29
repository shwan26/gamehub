import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch the current user (assuming the user with ID 1 is logged in)
    fetch('/api/users/1')
      .then((res) => res.json())
      .then((data) => setCurrentUser(data))
      .catch((err) => console.error('Failed to fetch user', err));
  }, []);

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Profile</h1>
      <div className="card p-4">
        <h3>User Details</h3>
        <p><strong>Username:</strong> {currentUser.username}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>

        <div className="mt-4">
          <button className="btn btn-secondary" onClick={() => alert('Logging out...')}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
