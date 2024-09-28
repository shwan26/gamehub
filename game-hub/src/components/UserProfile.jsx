import React, { useState } from 'react';
import user from '../data/users.json';

const UserProfile = () => {
  const [profile, setProfile] = useState(user.profile);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save profile logic here
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <img src={profile.avatar} alt="avatar" />
      <input
        type="text"
        name="bio"
        value={profile.bio}
        onChange={handleChange}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UserProfile;
