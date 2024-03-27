import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ResetPassword.css';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (!email || !newPassword || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New password and confirm password don't match");
            return;
        }

        try {
            const response = await fetch('https://eventplanner.azurewebsites.net/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                // Password successfully changed, redirect to login page
                window.location.href = '/login';
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setError('An error occurred while resetting password');
        }
    };

    return (
        <div className="reset-container">
            <p className='heading'>Welcome to Event Planner!</p>
            <p>Please enter your new password to reset your password</p>
            <form className="reset-form" onSubmit={handleResetPassword}>
                <div className="form-group">
                    <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" id="newpassword" name="newpassword" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" id="conpassword" name="conpassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="reset-button">Change Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
