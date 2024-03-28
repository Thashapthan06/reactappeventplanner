import React, { useState, useEffect } from 'react';
import './ServiceProviderProfileForServiceProvider.css'; // Import the CSS file for Dashboard styles
import './RatingsAndReviewsServiceprovider.css';
import RatingsAndReviewsServiceprovider from './RatingsAndReviewsServiceprovider';

function ServiceProviderProfileForServiceProvider() {
    const [serviceProvider, setServiceProvider] = useState(null);

    useEffect(() => {
        // Retrieve service provider email from local storage
        const serviceProviderEmail = localStorage.getItem('userEmail');

        if (serviceProviderEmail) {
            fetch(`https://eventplanner.azurewebsites.net/service_provider?email=${serviceProviderEmail}`)
                .then(response => response.json())
                .then(data => {
                    setServiceProvider(data);
                })
                .catch(error => {
                    console.error('Error fetching service provider profile:', error);
                });
        }
    }, []);

    return (
        <div>
            {serviceProvider && (
                <div className="buttongroup">
                    <div className="serviceProvider">
                        <button className="notificationButtons01">Service Provider ID: {serviceProvider.ServiceproviderID}</button>
                        <button className="notificationButtons01">Service Provider Name: {serviceProvider.ServiceproviderName}</button>
                        <button className="notificationButtons01">Email: {serviceProvider.Email}</button>
                        <button className="notificationButtons01">Available service: {serviceProvider.AvailableService}</button>
                        <button className="notificationButtons01">Amount: {serviceProvider.Amount}</button>
                    </div>
                </div>
            )}

            {/* Pass the service provider ID to the RatingsAndReviewsServiceprovider component */}
            {serviceProvider && <RatingsAndReviewsServiceprovider serviceProviderID={serviceProvider.ServiceproviderID} />}
        </div>
    );
}

export default ServiceProviderProfileForServiceProvider;
