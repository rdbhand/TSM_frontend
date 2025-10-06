import { useNavigate } from "react-router-dom";
import '../styles/UserDashboard.css';
import { UserContext } from "./UserContext";
import { useContext, useState } from "react";
import Dashboard from "./UserPages/Dashboard";
import Menu from "./UserPages/Menu";
import Subscription from "./UserPages/Subscription";
import Payment from "./UserPages/Payment";
import Feedback from "./UserPages/Feedback";
import Notifications from "./UserPages/Notifications";
import Profile from "./UserPages/Profile";
import Nav from "./Nav";
import Footer from "./Footer";

function UserDashboard() {
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
        {/* Left Panel (Menu) */}
        <div className="left-panel">
           <div className="logo">
            <h2 style={{color:"blue", textAlign:"center"}}>🙂 User </h2>
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

          {/* <button
            onClick={() => setSelectedPage("orders")}
            className={selectedPage === "orders" ? "selectedBtn" : "btn"}
          >
            Orders & Delivery
          </button> */}

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

        <div className="right-panel">
          {selectedPage === "dashboard" && <Dashboard userData={userData} />}

          {selectedPage === "menu" && <Menu userData={userData} />}

          {selectedPage === "subscription" && <Subscription userData={userData} />}

          {selectedPage === "payments" && <Payment userData={userData} />}

          {selectedPage === "feedback" && <Feedback userData={userData} />}

          {selectedPage === "offers" && <Notifications userData={userData} />}

          {selectedPage === "profile" && <Profile userData={userData} />}
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default UserDashboard;
