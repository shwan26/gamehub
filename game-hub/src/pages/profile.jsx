import React from 'react';
import { Link } from 'react-router-dom';
import users from '../data/users.json'; // Import users data

const Profile = () => {
  const currentUser = users[0]; // Assume the first user is the logged-in user (adjust as needed)

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Profile</h1>
      
      <div className="card p-4">
        {/* Display User Details */}
        <h3>User Details</h3>
        <p><strong>Username:</strong> {currentUser.username}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>

        {/* Account Management */}
        <div className="mt-4">
          <Link to="/transaction" className="btn btn-primary mr-2">View Transactions</Link>
          <button className="btn btn-secondary" onClick={() => alert('Logging out...')}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
