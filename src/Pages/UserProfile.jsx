// UserProfile.js frontend

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./UserProfile.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function UserProfile() {
  // State to store user profile data
  const [userData, setUserData] = useState(null);

  // Fetch user profile data from backend
  useEffect(() => {
    // Retrieve user email from local storage
    const userEmail = localStorage.getItem('userEmail');

    fetch(`https://eventplanner.azurewebsites.net/user_profile?email=${userEmail}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("User data:", data); // Add this line to see the received data
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user profile data:", error);
      });
  }, []);


  return (
    <div className="user-container">
      <div className="panes">
        <div className="leftpane03">
          <div className="form">
            <img src="./User.jpg" alt="" className="profilePic" />
            <div className="profileform">
              {/* Display user profile data */}
              {userData && (
                <>
                  <p className="inputs">User ID: {userData.UserID}</p>
                  <p className="inputs">User name: {userData.UserName}</p>
                  <p className="inputs">Email: {userData.Email}</p>
                  <p className="inputs">Contact number: {userData.ContactNumber}</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="rightpane03">
          <div className="bookedProvidersText03">
            <p>List of Service providers booked by you :</p>
          </div>
          <div className="providercardGrid03">
            {userData && userData.BookedServiceProviders.map(serviceProvider => (
              <Card key={serviceProvider.ServiceProviderID} className="card03">
                <div className="cardContent">
                  <div className="cardImgContainer">
                    <Card.Img
                      variant="top"
                      src="./Images/Serviceprovider02.png"
                      className="cardImg03"
                    />
                  </div>
                  <div className="cardBodyContainer">
                    <Card.Body>
                      <Card.Title>{serviceProvider.ServiceProviderName}</Card.Title>
                      <p>{serviceProvider.AvailableService}</p>
                      <Link to={`/serviceproviderprofileforuser?email=${serviceProvider.Email}`}>
                        <Button variant="primary" className="cardButton03">More Details</Button>
                      </Link>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
