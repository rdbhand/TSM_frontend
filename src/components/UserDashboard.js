import { useNavigate } from "react-router-dom";
import "../styles/UserDashboard.css";
import { useEffect, useState } from "react";
import Dashboard from "./UserPages/Dashboard";
import Menu from "./UserPages/Menu";
import Subscription from "./UserPages/Subscription";
import Payment from "./UserPages/Payment";
import Feedback from "./UserPages/Feedback";
import Notifications from "./UserPages/Notifications";
import Profile from "./UserPages/Profile";
import Footer from "./Footer";

function UserDashboard() {
  const navigate = useNavigate();

  const userData = sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : null;

  const [selectedPage, setSelectedPage] = useState("dashboard");

  // ✅ Fetch subscriptions once and store in sessionStorage
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const userId = userData?.userId || 1; // fallback for testing
        const res = await fetch(
          `http://localhost:8080/api/subscriptions?userId=${userId}`
        );

        const data = await res.json();

        // Store in session storage
        sessionStorage.setItem("subscription", JSON.stringify(data));
        console.log("Subscription saved in sessionStorage:", data);
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
      }
    };

    if (userData) fetchSubscriptions();
  }, [userData]);

  const handleLogout = () => {
    alert("Logout Successful!");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("subscription");
    navigate("/");
  };

  return (
    <>
      <div className="dashboard-container">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="logo">
            <h2 style={{ color: "blue", textAlign: "center" }}>🙂 User </h2>
          </div>

          <button
            onClick={() => setSelectedPage("dashboard")}
            className={selectedPage === "dashboard" ? "selectedBtn" : "btn"}
          >
            Dashboard
          </button>

          <button
            onClick={() => setSelectedPage("menu")}
            className={selectedPage === "menu" ? "selectedBtn" : "btn"}
          >
            Today’s Menu
          </button>

          <button
            onClick={() => setSelectedPage("subscription")}
            className={selectedPage === "subscription" ? "selectedBtn" : "btn"}
          >
            My Subscription
          </button>

          <button
            onClick={() => setSelectedPage("payments")}
            className={selectedPage === "payments" ? "selectedBtn" : "btn"}
          >
            Payments
          </button>

          <button
            onClick={() => setSelectedPage("feedback")}
            className={selectedPage === "feedback" ? "selectedBtn" : "btn"}
          >
            Feedback
          </button>

          <button
            onClick={() => setSelectedPage("offers")}
            className={selectedPage === "offers" ? "selectedBtn" : "btn"}
          >
            Notifications
          </button>

          <button
            onClick={() => setSelectedPage("profile")}
            className={selectedPage === "profile" ? "selectedBtn" : "btn"}
          >
            Profile
          </button>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        {/* Right Panel Pages */}
        <div className="right-panel">
          {selectedPage === "dashboard" && <Dashboard userData={userData} />}
          {selectedPage === "menu" && <Menu userData={userData} />}
          {selectedPage === "subscription" && <Subscription userData={userData} />}
          {selectedPage === "payments" && <Payment userData={userData} />}
          {selectedPage === "feedback" && <Feedback userData={userData} />}
          {selectedPage === "offers" && <Notifications userData={userData} />}
          {selectedPage === "profile" && <Profile />}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserDashboard;
