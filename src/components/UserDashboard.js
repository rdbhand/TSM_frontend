import { useNavigate } from "react-router-dom";
import '../styles/ServiceProviderDashboard.css';

import { UserContext } from "./UserContext";
import { useContext } from "react";
function UserDashboard() {
  const navigate = useNavigate();

  const {userData, setUserData} = useContext(UserContext);

  const handleLogout = () => {
      alert("Logout Successful!");
      setUserData({});
      navigate("/");
  };

  return (
    <>

      <div className="dashboard-container">
        <div className="left-panel">
          <button onClick={handleLogout}>Logout</button>
        </div>

        <div className="right-panel">
          <h2>Welcome to User Dashboard</h2>
          <p>Here you can manage your account and view your activities.</p>
          <h3>User Details:</h3>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Role:</strong> {userData.role}</p>
        </div>
      </div>
      
    </>
  );
}

export default UserDashboard;
