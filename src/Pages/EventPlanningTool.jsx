import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function EventPlanningTool() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventBudget, setEventBudget] = useState('');
  
  useEffect(() => {
    import ('./EventPlanningTool.css');
    // Fetch service providers when the component mounts
    fetchBestServiceProviders();
  }, []);

  const fetchBestServiceProviders = async () => {
    try {
      const response = await fetch('https://eventplanner.azurewebsites.net/serviceProviders');
      if (response.ok) {
        const data = await response.json();
        setServiceProviders(data);
      } else {
        console.error('Failed to fetch service providers');
      }
    } catch (error) {
      console.error('Error fetching service providers:', error);
    }
  };
  

  const toggleCardSelection = (serviceProvider) => {
    if (selectedCards.includes(serviceProvider.ServiceProviderID)) {
      setSelectedCards(selectedCards.filter(id => id !== serviceProvider.ServiceProviderID));
    } else {
      setSelectedCards([...selectedCards, serviceProvider.ServiceProviderID]);
    }
  };
  
  const handleSubmit = async () => {
    try {
      // Fetch user ID from local storage
      const userEmail = localStorage.getItem('userEmail');

      // Make sure userEmail is not undefined before proceeding
      if (!userEmail) {
          console.error('userEmail is undefined');
          return;
      }

      // Make POST request to fetch userId
      const response = await fetch('https://eventplanner.azurewebsites.net/getUserId', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail }),
      });

      // Check if request was successful
      if (response.ok) {
          const data = await response.json();
          const userId = data.userId;

          // Make sure userId is not undefined before proceeding
          if (!userId) {
              console.error('userId is undefined');
              return;
          }

          // Make POST request to store event details
          const eventResponse = await fetch('https://eventplanner.azurewebsites.net/events', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  eventName,
                  eventType,
                  eventDate,
                  eventLocation,
                  eventBudget,
                  userId,
                  selectedCards,
              }),
          });

          // Check if event request was successful
          if (eventResponse.ok) {
              // Redirect to result page
              window.location.href = '/userprofile';
          } else {
              console.error('Failed to store event details');
          }
      } else {
          console.error('Failed to fetch userId');
      }
    } catch (error) {
        console.error('Error handling event submission:', error);
    }
  };
  
  return (
    <div className="panes">
      <div className="leftpane01">
        <div className="serviceprovidertext">
          <p>Please select the service provider you wish to book for your event :</p>
        </div>
        <div className="serviceproviderbuttonGrid01">
        {serviceProviders.map((provider, index) => (
            <Card key={index} className={selectedCards.includes(provider.ServiceProviderID) ? "card01 selected" : "card01"}>
              <div>
                <Card.Img
                  variant="top"
                  src={`./Images/Serviceprovider02.png`} 
                  className="cardImg01"
                />
              </div>
              <div className="cardBody">
                <Card.Body>
                  <Card.Title>{provider.ServiceProviderName}({provider.AverageRating})</Card.Title>
                  <p>{provider.ServiceCategory}</p>
                  <Button variant="primary" className="cardButton-01">
                    <Link to={`/serviceproviderprofileforuser?email=${provider.ServiceProviderEmail}`}>More Details</Link> {/* Pass ServiceProviderEmail in the URL */}
                  </Button>
                  <Button
                    variant="primary"
                    className="cardButton"
                    onClick={() => toggleCardSelection(provider)}
                  >
                    {selectedCards.includes(provider.ServiceProviderID) ? "Selected" : "Select"}
                  </Button>
                </Card.Body>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="rightpane01">
        <div className="eventText">
        <p className='heading'>Event Details</p>
        </div>
        <div className="eventformGrid">
          <input type="textnew" className="forrmInput-event-new"  value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name" />
          <select 
            className="forrmInput-event01"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)} placeholder="Select Event Type" 
          >
            <option value="Select Event Type">Select Event Type</option>
            <option value="Birthday">Birthday</option>
            <option value="Wedding">Wedding</option>
            <option value="Graduation">Graduation</option>
            <option value="Anniversaries">Anniversaries</option>
            <option value="Puberty Ceremony">Puberty Ceremony</option>
            <option value="Baby Shower">Baby Shower</option>
            <option value="Religious Ceremony">Religious Ceremony</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Sport Event">Sport Event</option>
            <option value="Concert">Concert</option>
          </select>
          <input type="textnew" className="forrmInput-event-new" value={eventDate} onChange={(e) => setEventDate(e.target.value)} placeholder="Date (Eg:- 2024-04-04)" />
          <input type="textnew" className="forrmInput-event-new" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} placeholder="Location (Eg:- Colombo)" />
          <input type="textnew" className="forrmInput-event-new" value={eventBudget} onChange={(e) => setEventBudget(e.target.value)} placeholder="Budget (Eg:- 20000.00)" />
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
