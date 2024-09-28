import React from 'react';
import { Link } from 'react-router-dom';
import users from '../data/users.json'; // Import your users data (assuming this contains user details)

const Profile = () => {
  // For simplicity, we'll just use the first user
  const currentUser = users[0]; // You may change this logic based on how you're handling authentication

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Profile</h1>
      
      <div className="card p-4">
        <h3>User Details</h3>
        <p><strong>Username:</strong> {currentUser.username}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>

        {/* Add links for account management and transaction */}
        <div className="mt-4">
          <Link to="/transaction" className="btn btn-primary mr-2">View Transactions</Link>
          <button className="btn btn-secondary" onClick={() => alert('Logging out...')}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
