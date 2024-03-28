import React, { useState, useEffect } from 'react';
import './RatingsAndReviewsUser.css';

function RatingsAndReviewsUser({ serviceProviderID }) {
    const [ratings, setRatings] = useState([]);
    const [ratingValue, setRatingValue] = useState(0);
    const [reviewDetails, setReviewDetails] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchRatings();
    }, [serviceProviderID]);

    const fetchRatings = async () => {
        try {
            const response = await fetch(`https://eventplanner.azurewebsites.net/ratingserviceprovider?service_provider_id=${serviceProviderID}`);
            const data = await response.json();
            console.log('Fetched ratings data:', data); // Log fetched ratings data
            setRatings(data);
        } catch (error) {
            console.error('Error fetching ratings:', error);
        }
    };

    // Function to render stars based on rating value
    const renderStars = (ratingValue) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= ratingValue) {
                stars.push(<span key={i} className="star" style={{ color: 'yellow' }}>★</span>);
            } else {
                stars.push(<span key={i} className="star">★</span>);
            }
        }
        return stars;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://eventplanner.azurewebsites.net/ratinguser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    RatingValue: ratingValue,
                    ReviewDetails: reviewDetails,
                    ServiceProviderID: serviceProviderID, // Include ServiceProviderID
                }),
            });
            if (response.ok) {
                console.log('Rating and review submitted successfully');
                fetchRatings(); // Update ratings after submitting
            } else {
                console.error('Failed to submit rating and review');
            }
        } catch (error) {
            console.error('Error submitting rating and review:', error);
        }
    };

    const handleChangeRating = (event) => {
        setRatingValue(parseInt(event.target.value));
    };

    const handleChangeReviewDetails = (event) => {
        setReviewDetails(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        console.log('Filter applied:', event.target.value);
    };

    const filteredRatings = ratings ? ratings.filter(rating => {
        if (filter === 'all') {
            return true; // Show all ratings
        } else {
            return rating.Label === filter; // Show ratings based on selected filter
        }
    }) : [];

    return (
        <div className="rating-container">
            {/* Dropdown menu for filtering */}
            <div className="filter-dropdown">
                <select value={filter} onChange={handleFilterChange} style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', margin: '20px' }}>
                    <option value="all">All</option>
                    <option value="positive">Positive</option>
                    <option value="negative">Negative</option>
                    <option value="neutral">Neutral</option>
                </select>
            </div>
            
            <div className="card-container">
                {/* Map over fetched ratings and display each one */}
                {console.log('Filtered Ratings:', filteredRatings)}
                {filteredRatings.map((rating, index) => (
                    <div key={index} className="card05">
                        <img src="./User.jpg" alt="Service Provider" />
                        <div className="card-content">
                            <h2>Rating {index + 1}</h2>
                            <div className="star-rating">
                                {renderStars(rating.RatingValue)}
                            </div>
                            <p>{rating.ReviewDetails}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Rating form inside a card */}
            <div className="card rating-form-card">
                <div className="card-content05">
                    <form onSubmit={handleSubmit}>
                        
                        <p>Please provide your Ratings and Reviews to improve our service: </p>
                        <div className="form-group05">
                            <input type="number" name="rating" min="1" max="5" value={ratingValue} onChange={handleChangeRating} />
                        </div>
                        <div className="form-group">
                            <textarea name="feedback" placeholder="What's your Feedback?" cols="30" rows="5" value={reviewDetails} onChange={handleChangeReviewDetails}></textarea>
                        </div>
                        <button type="submit" className="rating-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RatingsAndReviewsUser;
