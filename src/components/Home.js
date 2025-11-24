import '../styles/Home.css'
import Nav from './Nav';
import { Link } from 'react-router-dom';
import RegLogin from './RegLogin';
import Footer from './Footer';
function Home() {
  return (
    <div id="home-page">
    <Nav/>

  <div className="home-container">
    <div className="home-poster">  
      <div className="left-poster">
        <h1>Welcome to Web Based Tiffin Service Management System</h1>
        <h3>A Platform for Managing Tiffin Services for Tiffin Service Providers and Customers</h3>
        <div>
            {/* <Link to="/reglogin" className="login-btn">Login as Customer</Link> &nbsp; &nbsp;&nbsp; &nbsp; */}
            <Link to="/reglogin" className="login-btn">Get Started !</Link>
        </div>
      </div>
      <div className="right-poster">
      </div>
      <div>
        
      </div>
      <div>
      </div>
    </div>

    <div className="home-features">
      <br/><h2>⚙️ Features ⚙️</h2><br/>
      <div className="feature-list">
        <div className="feature-item">
          <img src="../../images/feature_logo1.png" alt="logo1" width="70" />
          <h3>Easy Management</h3>
          <p>Easy management of Tiffin Service</p>
        </div>
        <div className="feature-item">
          <img src="../../images/feature_logo2.png" alt="logo2" width="70" />
          <h3>Online Payments</h3>
          <p>Secure online payments transactions</p>
        </div>
        <div className="feature-item">
          <img src="../../images/feature_logo3.png" alt="logo3" width="70" />
          <h3>Track Meals</h3>
          <p>Track Meal Time Table</p>
        </div>
      </div>
    </div>
  </div>

    {/* <RegLogin/> */}
    <br/>
    <br/>
    <Footer/>
    </div>
  );
}
export default Home;
