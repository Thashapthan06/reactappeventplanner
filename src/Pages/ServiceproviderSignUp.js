import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

function ServiceproviderSignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        availableService: '',
        location: '',
        amount: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://eventplanner.azurewebsites.net/serviceprovider_signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                window.location.href = '/login';
                console.log('Service provider signed up successfully');
            } else {
                console.error('Error signing up service provider');
                setError('Error signing up service provider');
            }
        } catch (error) {
            console.error('Error signing up service provider:', error);
            setError('Error signing up service provider');
        }
    };

    useEffect(() => {
        import ('./ServiceproviderSignUp.css');
    }, []);

    return (
        <div className="signup-container">
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
                    <input type="text" id="location" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="text" id="amount" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} />
                </div>
                <div className="form-group01">
                    <select id="availableService" name="availableService" value={formData.availableService} onChange={handleChange}>
                        <option value="">Select Available Service</option>
                        <option value="photography">Photography</option>
                        <option value="videography">Videography</option>
                        <option value="catering">Catering</option>
                        <option value="beautician">Beautician</option>
                        <option value="decoration">Decoration</option>
                        <option value="venue">Venue</option>
                        <option value="bakeries_and_desserts">Bakeries and Desserts</option>
                        <option value="cakes">Cakes</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="transportation">Transportation</option>
                    </select>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="booking-button-s">Sign Up as Serviceprovider</button>
            </form>
            <p>If you are a user? <Link to="/usersignup">Sign up</Link></p>
            <p>Having an account already? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default ServiceproviderSignUp;
