import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import Home from "./gohome";
import patientService from "../services/patientService";

const socket = io.connect("http://localhost:8000");

function PatientChat() {
  const query = new URLSearchParams(window.location.search);

  // Messages States
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState("");
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverId, setReceiverId] = useState(query.get("id"));
  const [room, setRoom] = useState(`${receiverId}-${senderId}`);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await patientService.getPatient();
        setSenderId(response.data._id);
        setSenderName(response.data.name);
        const receiverResponse = await patientService.getName(receiverId);
        setReceiverName(receiverResponse.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    const initializeChat = () => {
      setRoom(`${receiverId}-${senderId}`);
      socket.emit("join", receiverId, senderId);
    };

    const messageListener = (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    };

    fetchPatientData();
    initializeChat();

    // Attach the event listener only once
    socket.on("receive_message", messageListener);

    return () => {
      // Clean up the event listener and leave the room when the component unmounts
      socket.off("receive_message", messageListener);
      socket.emit("leave", room);
    };
  }, [socket, senderId, receiverId]);

  const sendMessage = () => {
    console.log("message sent");
    socket.emit("send_message", {
      receiverId,
      senderId,
      inputMessage,
      room,
    });
    setInputMessage("");
    setMessages((messages) => [
      ...messages,
      { senderId, senderName, receiverId, message: inputMessage },
    ]);
  };

  return (
    <div className="chat-app">
      <div className="receiver-info">
        <p>Chatting with: {receiverName}</p>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.senderId} className="message">
            <strong>{message.senderName}:</strong> {message.message}
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

export default PatientChat;
