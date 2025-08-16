import '../styles/Nav.css'
import {Link} from 'react-router-dom'
function Nav(){
  return(
    <>
    <div className="box">
      <div className="nav-container">

      <ul className="leftnav">
        <span className='logo-span'></span>
        <li>ONLINE TIFFIN SERVICE</li>
      </ul>
      <ul className="rightnav">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/about" className="nav-link">About</Link></li>
        <li><Link to="/contact" className="nav-link">Contact</Link></li>
        <li>
          <Link to="/reglogin" className='login-btn'>Login</Link>
        </li>
      </ul>
    </div>

    </div>
    <div className="dummy-box"></div>
    
    </>
  );
}

export default Nav;