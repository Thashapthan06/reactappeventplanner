// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar01.css'; // Import the CSS file for Navbar styles

function Navbar01() {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/logo05.jpg" alt="Logo" />
            </div>
            <ul className="nav-links">
                {/* Use Link component with 'to' prop instead of anchor tags */}
                <li><Link to="/usersignup">Sign Up as User</Link></li>
                <li><Link to="/serviceprovidersignup">Sign Up as Service Provider</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar01;
