import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import Home from "./gohome";
import doctorService from "../services/doctorService";

const socket = io.connect("http://localhost:8000");

function DoctorChat() {
  const query = new URLSearchParams(window.location.search);

  // Messages States
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState("");
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverId, setReceiverId] = useState(query.get("id"));
  const [room, setRoom] = useState(`${senderId}-${receiverId}`);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await doctorService.getDoctor();
        setSenderId(response.data._id);
        setSenderName(response.data.name);
        // Fetch receiver name using receiverId
        const receiverResponse = await doctorService.getName(receiverId);
        setReceiverName(receiverResponse.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    const initializeChat = () => {
      setRoom(`${senderId}-${receiverId}`);
      socket.emit("join", senderId, receiverId);
    };

    const messageListener = (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    };

    fetchDoctorData();
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
    socket.emit("send_message", { senderId, receiverId, inputMessage, room });
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

export default DoctorChat;
