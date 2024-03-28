import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ServiceProviderProfileForUser.css';
import './RatingsAndReviewsUser.css';
import RatingsAndReviewsUser from './RatingsAndReviewsUser';

function ServiceProviderProfileForUser() {
    const [serviceProvider, setServiceProvider] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const email = new URLSearchParams(location.search).get('email');

        if (email) {
            fetch(`https://eventplanner.azurewebsites.net/service_provider?email=${email}`)
                .then(response => response.json())
                .then(data => {
                    setServiceProvider(data);
                })
                .catch(error => {
                    console.error('Error fetching service provider data:', error);
                });
        }
    }, [location]);

    if (!serviceProvider) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="buttongroup">
                <div className="serviceProvider">
                    <button className="notificationButtons02">Service Provider ID: {serviceProvider.ServiceproviderID}</button>
                    <button className="notificationButtons02">Service Provider Name: {serviceProvider.ServiceproviderName}</button>
                    <button className="notificationButtons02">Email: {serviceProvider.Email}</button>
                    <button className="notificationButtons02">Available service: {serviceProvider.AvailableService}</button>
                    <button className="notificationButtons02">Amount: {serviceProvider.Amount}</button>
                </div>
            </div>

            <RatingsAndReviewsUser serviceProviderID={serviceProvider.ServiceproviderID} />
        </div>
    );
}

export default ServiceProviderProfileForUser;
