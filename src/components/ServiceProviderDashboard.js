import { useNavigate } from "react-router-dom";
import "../styles/ServiceProviderDashboard.css";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useState } from "react";

import ProviderForm from "./ServiceProviderPages/ProviderForm";
import PlanForm from "./ServiceProviderPages/PlanForm";
import ProfilePage from "./ServiceProviderPages/ProfilePage";
import TiffinMenu from "./ServiceProviderPages/TiffinMenu";

function ServiceProviderDashboard() {
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(UserContext);

  const [selectedPage, setSelectedPage] = useState("dashboard");

  const handleLogout = () => {
    alert("Logout Successful!");
    setUserData({});
    navigate("/");
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="left-panel">
          <div className="logo">
            <h2 style={{ color: "blue", textAlign: "center" }}>
              👨🏻‍🍳 Service Provider
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedPage("dashboard");
            }}
            className={selectedPage === "dashboard" ? "selectedBtn" : "btn"}
          >
            {" "}
            Dashboard
          </button>

          <button
            onClick={() => {
              setSelectedPage("plans");
            }}
            className={selectedPage === "plans" ? "selectedBtn" : "btn"}
          >
            Manage Plans{" "}
          </button>

          <button
            onClick={() => {
              setSelectedPage("menu");
            }}
            className={selectedPage === "menu" ? "selectedBtn" : "btn"}
          >
            Manage Tiffin Menu{" "}
          </button>

          <button
            onClick={() => {
              setSelectedPage("users");
            }}
            className={selectedPage === "users" ? "selectedBtn" : "btn"}
          >
            Manage Users{" "}
          </button>

          <button
            onClick={() => {
              setSelectedPage("payments");
            }}
            className={selectedPage === "payments" ? "selectedBtn" : "btn"}
          >
            {" "}
            Payments{" "}
          </button>

          <button
            onClick={() => {
              setSelectedPage("feedback");
            }}
            className={selectedPage === "feedback" ? "selectedBtn" : "btn"}
          >
            {" "}
            Feedback{" "}
          </button>

          <button
            onClick={() => {
              setSelectedPage("analytics");
            }}
            className={selectedPage === "analytics" ? "selectedBtn" : "btn"}
          >
            {" "}
            Analytics{" "}
          </button>

          <button
            onClick={() => {
              setSelectedPage("profile");
            }}
            className={selectedPage === "profile" ? "selectedBtn" : "btn"}
          >
            {" "}
            Profile Settings{" "}
          </button>

          <button onClick={handleLogout} className={"logout-btn"}>
            {" "}
            Logout{" "}
          </button>
        </div>

        <div className="right-panel">
          {selectedPage === "dashboard" && (
            <div>
              <h2>Dashboard</h2>
              <ProviderForm userData={userData} />
            </div>
          )}

          {selectedPage === "plans" && (
            <div>
              <h2>Manage Plans Page</h2>
              <PlanForm userData={userData} />
            </div>
          )}
          {selectedPage === "menu" && (
            <div>
              <h2>Manage Tiffin Menu</h2>
              <TiffinMenu/>
            </div>
          )}
          {selectedPage === "users" && (
            <div>
              <h2>Users</h2>
            </div>
          )}
          {selectedPage === "payments" && (
            <div>
              <h2>Payments</h2>
            </div>
          )}
          {selectedPage === "feedback" && (
            <div>
              <h2>Feedback & Ratings</h2>
            </div>
          )}
          {selectedPage === "analytics" && (
            <div>
              <h2>Analytics</h2>
            </div>
          )}
          {selectedPage === "profile" && (
            <div>
              <h2>Profile Settings</h2>
              <ProfilePage />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ServiceProviderDashboard;
