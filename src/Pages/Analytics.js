import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Import Chart.js
import axios from 'axios';
import "./Analytics.css";

function Analytics() {
  const [ratingData, setRatingData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [ratingChart, setRatingChart] = useState(null);
  const [eventChart, setEventChart] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Fetch analytics data based on logged-in service provider's email from local storage
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      fetchAnalyticsData(userEmail);
    }

    // Cleanup function
    return () => {
      if (ratingChart) ratingChart.destroy();
      if (eventChart) eventChart.destroy();
    };
  }, []);

  const fetchAnalyticsData = async (email) => {
    try {
      const response = await fetch(
        `https://eventplanner.azurewebsites.net/analytics?email=${email}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Analytics Data:", data);
        setRatingData(data.analytics_data.ratings);
        setEventData(data.analytics_data.events);
      } else {
        console.error("Failed to fetch analytics data");
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  useEffect(() => {
    if (ratingData) {
      if (ratingChart) ratingChart.destroy(); // Destroy existing chart instance
      renderRatingChart();
    }
    if (eventData) {
      if (eventChart) eventChart.destroy(); // Destroy existing chart instance
      renderEventChart();
    }
  }, [ratingData, eventData]);

  const renderRatingChart = () => {
    const ctx = document.getElementById("ratingChart");
    if (!ctx) return;
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(ratingData),
        datasets: [
          {
            label: "Average Rating",
            data: Object.values(ratingData),
            backgroundColor: "rgba(0, 206, 209, 0.6)",
            borderWidth: 1,
          },
        ],
      },
    });
    setRatingChart(chart);
  };



  const renderEventChart = () => {
    const ctx = document.getElementById("eventChart");
    if (!ctx) return;
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(eventData),
        datasets: [
          {
            label: "Number of Events",
            data: Object.values(eventData),
            backgroundColor: "rgba(148, 0, 211, 0.6)",
            borderWidth: 1,
          },
        ],
      },
    });
    setEventChart(chart);
  };


  useEffect(() => {
    // Fetch chat history data when component mounts
    fetchChatHistory();
  }, []);
  

  const handleFileUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      const response = await axios.post('https://eventplanner.azurewebsites.net/api/get_pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  

  

  const sendQuery = async () => {
    try {
      const res = await fetch("https://eventplanner.azurewebsites.net/api/process_query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponse(data.response);
      fetchChatHistory(); // Refresh chat history after sending query
    } catch (error) {
      console.error("Error sending query:", error);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const res = await fetch("https://eventplanner.azurewebsites.net/api/chat_history");
      const data = await res.json();
      setChatHistory(data.chat_history);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  return (
      <div className="container02">
        <div className="analytics-container">
          <div className="graph-box">
            <p>Rating Analytics</p>
            <canvas id="ratingChart"></canvas>
          </div>
          <div className="graph-box">
            <p>Number of Events Analytics</p>
            <canvas id="eventChart"></canvas>
          </div>
        </div>
        <div className="chatbot-container02">
          <p>Chatbot for your PDF File</p>
          <div className="file-upload02">
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <button className = "upload-button" onClick={handleFileUpload}>Upload</button>
          </div>     
          
          <div className="chat-history02">
            {chatHistory.map((message, index) => {
              return (
                <div key={index} className={"message-container"}>
                  <span className="message">{message}</span>
                  <p></p>
                </div>
              );
            })}
          </div>
          <div className="input-query02">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask your question"
            />
            <button onClick={sendQuery}>Send</button>
          </div>
        </div>
      </div>
  );
}

export default Analytics;
