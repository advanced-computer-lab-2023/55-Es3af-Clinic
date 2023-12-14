import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import Home from "./gohome";

function ChatApp() {
  //import page that i want to test

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const query = new URLSearchParams(window.location.search);
  console.log(window.location.href)
  console.log(query.get("id"))
  const [doctorId,setDoctorId] =useState( query.get("id")?.split("_")[0]);
  const[doctorName,setDoctorName] = useState(query.get("id")?.split("_")[1])
  const[type,setType] = useState(query.get("type"))
  useEffect(() => {
    // runs with each page refresh or state change
    const connectSocket = () => {
      const newSocket = socketIO.connect("http://localhost:8000");

      newSocket.on(`messageResponse`, (data) => {
        console.log("Received");
        try {
          data = JSON.parse(data);
          console.log(`Received data is ${JSON.stringify(data)}`);
          // if target user add msg
          // Target should be Id of Dr
          if (data.targetId === `65500f2a69d191d8ccbc8c88` || data.id === `65500f2a69d191d8ccbc8c88`) {
            setMessages((messages) => [
              ...messages,
              { text: data.text, user: data.user, id: data.id },
            ]);
          } else {
          }
          // else ignore
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });
      setSocket(newSocket);
      // Clean up the socket connection when the component unmounts

      // You can set the socket after it's connected
    };
    connectSocket();

    // Check if the socket connection is not already established
    // Fetch messages from the server or initialize with some default messages
    // For simplicity, we are using static messages here
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      console.log("Emitting");
      socket.emit(
        "message",
        JSON.stringify({
          text: inputMessage,
          // Signed in user Id
          id: `65514a2ae3cbd5a885715a57`,
          // Signed in user name
          user: type,
          targetId: doctorId,
        })
      );
    }

    setInputMessage("");
    return;
  };

  return (
    <div className="chat-app">
      <Home />
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => {
            e.preventDefault();
            setInputMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatApp;
