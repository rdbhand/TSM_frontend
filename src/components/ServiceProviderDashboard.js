import { useNavigate } from "react-router-dom";
import '../styles/ServiceProviderDashboard.css';
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useState } from "react";

import SDashboard from "./ServiceProviderPages/SDashboard";

function ServiceProviderDashboard() {
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(UserContext);

  const[selectedPage, setSelectedPage]=useState("dashboard");


  const handleLogout = ()=>{
    alert("Logout Successful!");
    setUserData({});
    navigate("/");
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="left-panel">
          <button onClick={()=>{
            setSelectedPage("dashboard");
          }} className={(selectedPage==="dashboard")? "selectedBtn":""}> Dashboard </button>

          <button onClick={()=>{
            setSelectedPage("plans");
          }}> Manage Plans </button>

          <button onClick={()=>{
            setSelectedPage("users");
          }}> Manage Users </button>

          <button onClick={()=>{
            setSelectedPage("payments");
          }}> Payments </button>

          <button onClick={()=>{
            setSelectedPage("feedback");
          }}> Feedback & Ratings </button>

          <button onClick={()=>{
            setSelectedPage("analytics");
          }}> Analytics </button>

          <button onClick={()=>{
            setSelectedPage("profile");
          }}> Profile Settings </button>

          <button onClick={handleLogout}> Logout </button>

        </div>

        <div className="right-panel">
          {selectedPage==="dashboard" && <div>
            <h2>Dashboard</h2>
            </div>}

          {selectedPage==="plans" && <div>          
          <h2>Manage Plans Page</h2>
          </div>}
          {selectedPage==="users" && 
          <div>
            <h2>Users</h2>  
          </div>}
          {selectedPage==="payments" && <div>
            <h2>Payments</h2>
            </div>}
          {selectedPage==="feedback" && <div>
            <h2>Feedback & Ratings</h2>
            </div>}
          {selectedPage==="analytics" && <div>
            <h2>Analytics</h2>
            </div>}
          {selectedPage==="profile" && <div>
            <h2>Profile Settings</h2>
            </div>}
        </div>
      </div>
    </>
  );
}

export default ServiceProviderDashboard;
