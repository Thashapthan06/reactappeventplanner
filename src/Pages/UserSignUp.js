import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import './UserSignUp.css'; // Import the CSS file for Signup styles

function UserSignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contact: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password || !formData.contact) {
            setError('Please fill in all fields');
            return;
        }
        try {
            const response = await fetch('https://eventplanner.azurewebsites.net/user_signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Redirect or show success message
                window.location.href = '/login';
                console.log('User signed up successfully');
            } else {
                // Handle error response
                console.error('Error signing up user');
                setError('Error signing up user');
            }
        } catch (error) {
            console.error('Error signing up user:', error);
            setError('Error signing up user');
        }
    };

    useEffect(() => {
        import ('./UserSignUp.css');
    }, []);

    return (
        <div className="signup-container01">
             <p className='heading'>Welcome to Event Planner!</p>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="text" id="contact" name="contact" placeholder="Contact number" value={formData.contact} onChange={handleChange} />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="signup-button-user">Sign Up as User</button>
            </form>
            <p>If you are a service provider? <Link to="/serviceprovidersignup">Sign up</Link></p>
            <p>Having an account already? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default UserSignUp;

