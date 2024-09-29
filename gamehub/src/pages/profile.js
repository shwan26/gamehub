import Header from "@/components/Header";
const Profile = () => {
  return (
    <div>
      <Header /> {/* Add the Header component here */}
      <h1 className="text-center mb-4">Your Profile</h1>
      <div className="row justify-content-center">
    <div className="col-md-6">
      {/* Display user profile details here */}
      <div className="card p-4 shadow">
        <h3 className="card-title">Profile Details</h3>
        <p className="card-text"><strong>Username:</strong> user1</p> {/* Replace with dynamic data */}
      </div>
    </div>
  </div>
  </div>
  );
};

export default Profile;

// done