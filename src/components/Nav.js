import '../styles/Nav.css'
import {Link} from 'react-router-dom'
function Nav(){
  return(
    <>
    <div className="nav-container">

      <ul className="leftnav">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/about" className="nav-link">About</Link></li>
        <li><Link to="/contact" className="nav-link">Contact</Link></li>
      </ul>
      <ul className="rightnav">
        <li>
          <Link to="/reglogin" className='nav-link'>Register/Login</Link>
        </li>
      </ul>
    </div>
    </>
  );
}

export default Nav;