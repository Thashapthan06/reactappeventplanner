import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }
        try {
            const response = await fetch('https://eventplanner.azurewebsites.net/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                // Set user email in local storage
                localStorage.setItem('userEmail', formData.email);
                console.log(localStorage.getItem('userEmail'));
                
                // Redirect to appropriate profile based on response
                if (data.role === 'user') {
                    // Set user role in local storage
                    localStorage.setItem('userRole', 'user');
                    window.location.href = '/userprofile';
                } else if (data.role === 'service_provider') {
                    // Set service provider role in local storage
                    localStorage.setItem('userRole', 'service_provider');
                    window.location.href = 'serviceProviderprofileForserviceProvider';
                }
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An error occurred while logging in');
        }
    };
    

    useEffect(() => {
        import('./Login.css');
    }, []);

    return (
        <div className="signup-container03">
            <p className='heading'>Welcome to Event Planner!</p>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                </div>
                {error && <p className="error-message">{error}</p>}
                <p>Forgot password? <Link to="/resetpassword">Reset password</Link></p>
                <button type="submit" className="signup-button-login">Login</button>
            </form>
            <p>If you are a user? <Link to="/usersignup">Sign up</Link></p>
            <p>If you are a service provider? <Link to="/serviceprovidersignup">Sign up</Link></p>
        </div>
    );
}

export default Login;
