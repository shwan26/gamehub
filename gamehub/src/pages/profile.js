import Header from "@/components/Header";
const Profile = () => {
  return (
    <div>
      <Header /> {/* Add the Header component here */}
      <h1>Your Profile</h1>
      {/* Display user profile details here */}
      <p>Username: user1</p> {/* Replace with dynamic data */}
    </div>
  );
};

export default Profile;

// done