import React,{Link} from 'react-router-dom';
import './navbar.css';
import logo from '../assets/logo.png';

function Navbarhome() {
  return (

    <header className="header">

      <nav className="navbar">

        <div className="logo">
        <img src={logo} alt="SpeakX Logo" />
        </div>

        <lu className="nav-links"> 
        
          <li className='nav-links1'>
            <Link to="/">Home</Link>
          </li>

          <li className='nav-links1'>
            <Link to="/About">About</Link>
          </li>

          <li className='nav-links1'>
            <Link to="/Work">Work</Link>
          </li>

          <li className='nav-links1'>
            <Link to="/Contact">Contact</Link>
          </li>

        </lu>

        <div className="logo1">SpeakX</div>  
      </nav>

    </header>

  );
}

export default Navbarhome;