import '../styles/Home.css'
import Nav from './Nav';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <>
    <Nav/>
  <div className="home-container">
    <div className="home-poster">  
      <div className="left-poster">
        <h1>Healthy Homemade Tiffins Delivered Daily</h1>
        <div>
            <Link to="/reglogin" className="login-btn">Login as Customer</Link> &nbsp; &nbsp;&nbsp; &nbsp;
            <Link to="/reglogin" className="login-btn">Login as Seller</Link>
        </div>
      </div>
      <div className="right-poster">
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
    </>
  );
}
export default Home;
