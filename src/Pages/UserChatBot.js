import React, { useState, useEffect } from "react";
import "./UserChatBot.css";

function UserChatBot() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Fetch chat history data when component mounts
    fetchChatHistory();
  }, []);

  const sendQuery = async () => {
    try {
      const res = await fetch("https://eventplanner.azurewebsites.net/api/main", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponse(data.response02);
      fetchChatHistory(); // Refresh chat history after sending query
    } catch (error) {
      console.error("Error sending query:", error);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const res = await fetch("https://eventplanner.azurewebsites.net/api/user_chat_history");
      const data = await res.json();
      setChatHistory(data.chat_history02);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    import ('./UserChatBot.css');
}, []);

  return (
    <div className="container">
      <div className="chatbot container">
        <p>Event Planner Chatbot</p>
        <div className="chat-history01">
          {chatHistory.map((message, index) => {
            return (
              <div key={index} className={"message-container"}>
                <span className="message">{message}</span>
                <p></p>
              </div>
            );
          })}
        </div>
        <div className="input-query">
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

export default UserChatBot;
