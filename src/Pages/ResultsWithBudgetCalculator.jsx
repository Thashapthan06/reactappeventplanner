import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./ResultsWithBudgetCalculator.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function ResultsWithBudgetCalculator() {
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCardSelect = (index) => {
    // Check if the card is already selected
    const isSelected = selectedCards.includes(index);

    // Toggle selection state
    if (isSelected) {
      setSelectedCards(selectedCards.filter(cardIndex => cardIndex !== index));
    } else {
      setSelectedCards([...selectedCards, index]);
    }
  };

  return (
    <div className={`panes ${selectedCards.length > 0 ? 'grid-selected' : ''}`}>
      <div className="leftpane02">
        <div className="serviceprovidertext02">
          <p>Results according to your requirement, Please select the service provider you wish to book for your event :</p>
        </div>
        <div className="serviceproviderbuttonGrid02">
        {[...Array(10)].map((_, index) => (
            <Card key={index} className={`card02 ${selectedCards.includes(index) ? 'selected' : ''}`}>
              <div>
                <Card.Img variant="top" src="./Images/Serviceprovider02.png"  className="cardImg02"/>
              </div>

              <div className="cardBody">
                <Card.Body>
                  <Card.Title>Service Provider {index + 1}</Card.Title>
                  <Link to="/serviceproviderprofileforuser">
                    <Button variant="primary" className="cardButton02">More Details</Button>
                  </Link>
                </Card.Body>
                <Button variant="primary" className="cardButton-select02" onClick={() => handleCardSelect(index)}>Select</Button>
              </div>
            </Card>
          ))}
        </div>
          <button className="Booking-button">Confirm booking</button>
      </div>
      <div className="rightpane02">
        <div className="budgetcalculatorText">
          <p classNmae="calculator">Budget Calculator</p>
        </div>
        <div className="budgetCalculator">
          {[...Array(10)].map((_, index) => (
            <button key={index} className="budgetcalculatorButtons">Amount {index + 1}</button>
          ))}
        </div>
        <div className="totalamount">
          <button className="totalamountButton">Total Amount</button>
        </div>
      </div>
    </div>
  );
}
