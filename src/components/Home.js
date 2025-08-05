import '../styles/Home.css'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
  <div className="home-container">
    <div className="home-content">  
      <h1>Welcome to Tiffin Service Management Platform..............</h1>
      <p>We are here to provide you with the best tiffin service experience.</p>
      <p><Link to="/reglogin">Register/Login</Link> to explore our services.</p> 
      <p>Contact us for any queries or support.</p>
      <p>Follow us on social media for updates and offers.</p>   
    </div>
  </div>
    </>
  );
}
export default Home;
