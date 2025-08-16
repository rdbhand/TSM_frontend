import { useNavigate } from "react-router-dom";
import '../styles/ServiceProviderDashboard.css';
function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/logout", {
        method: "GET"
      });

      if (response.ok) {
        alert("Logout Successful!");
        navigate("/");
      } else {
        alert("Logout failed.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong during logout.");
    }
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
        </div>
      </div>
      
    </>
  );
}

export default UserDashboard;
