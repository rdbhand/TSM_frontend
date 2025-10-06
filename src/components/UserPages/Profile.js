import ProfilePage from "./ProfilePage";

const Profile = ({ userData }) => {
  return (
    <div>
      <h2>My Profile</h2>
      <p>View and edit your profile information here, {userData?.name || "friend"}.</p>
      <ProfilePage/>
    </div>
  );
};

export default Profile;
