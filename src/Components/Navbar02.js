// Navbar02.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar02.css'; // Import the CSS file for Navbar styles

function Navbar02() {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Retrieve user role from local storage or wherever you store it after login
        const role = localStorage.getItem('userRole');
        setUserRole(role);
    }, []);

    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/logo05.jpg" alt="Logo" />
            </div>
            <ul className="nav-links">
                {/* Use Link component with 'to' prop instead of anchor tags */}
                <li><Link to="/eventplanningtool">Event Planning Tool</Link></li>
                {userRole === 'user' && <li><Link to="/userprofile">My Profile </Link></li>}
                {userRole === 'service_provider' && <li><Link to="/serviceProviderprofileForserviceProvider">My Profile </Link></li>}
                {userRole === 'user' && <li><Link to="/userchatbot">chatbot </Link></li>}
                {userRole === 'service_provider' && <li><Link to="/analytics">chatbot</Link></li>}
                <li><Link to="/login">Logout</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar02;
