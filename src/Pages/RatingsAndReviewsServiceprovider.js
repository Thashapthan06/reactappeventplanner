import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RatingsAndReviewsServiceprovider.css'; // Import the CSS file for Rating styles

function RatingsAndReviewsServiceprovider({ serviceProviderID }) {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        // Fetch ratings and reviews for the specific service provider
        fetchRatings();
    }, [serviceProviderID]); // Execute useEffect when serviceProviderID changes

    const fetchRatings = async () => {
        try {
            // Fetch ratings and reviews data from the backend API for the specific service provider
            const response = await fetch(`https://eventplanner.azurewebsites.net/ratingserviceprovider?service_provider_id=${serviceProviderID}`);
            const data = await response.json();
            console.log('Fetched ratings:', data); // Log fetched data for debugging
            setRatings(data);
        } catch (error) {
            console.error('Error fetching ratings:', error);
        }
    };

    useEffect(() => {
        console.log('Ratings:', ratings); // Add this line to log ratings
    }, [ratings]); // Execute useEffect when ratings changes

    // Function to render stars based on rating value
    const renderStars = (ratingValue) => {
        const stars = [];
        // Fill stars based on rating value
        for (let i = 1; i <= 5; i++) {
            if (i <= ratingValue) {
                stars.push(<span key={i} className="star" style={{ color: 'yellow' }}>★</span>);
            } else {
                stars.push(<span key={i} className="star">★</span>);
            }
        }
        return stars;
    };

    return (
        <div className="rating-container">
            <hr></hr>
            {/* Map over fetched ratings and display each one */}
            <div className="card-container">
                {Array.isArray(ratings) && ratings.map((rating, index) => (
                    <div key={index} className="card04">
                        <img src="./User.jpg" alt="Service Provider" />
                        <div className="card-content">
                            <h2>Rating {index + 1}</h2>
                            <div className="star-rating">
                                {renderStars(rating.RatingValue)} {/* Ensure correct key */}
                            </div>
                            <p>{rating.ReviewDetails}</p> {/* Ensure correct key */}
                        </div>
                    </div>
                ))}
            </div>
            <hr></hr>
            <hr></hr>
            <form className="rating-form">
                <Link to="/analytics" className="rating-button">View Analytics</Link>
            </form>
        </div>
    );
}

export default RatingsAndReviewsServiceprovider;
