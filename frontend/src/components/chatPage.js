import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";

function ChatApp() {
  //import page that i want to test
  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket,setSocket] = useState(null)
  useEffect(() => {
    const connectSocket = () => {
      const newSocket = socketIO.connect("http://localhost:8000");
  
      newSocket.on(`messageResponse`, (data) => {
        console.log("Received");
        try {
          data = JSON.parse(data);
          console.log(`Received data is ${JSON.stringify(data)}`);
          setMessages((messages) => [
            ...messages,
            { text: data.text, user: data.user ,id:data.id},
          ]);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });
      setSocket(newSocket);
      // Clean up the socket connection when the component unmounts
  
      // You can set the socket after it's connected
    };
    connectSocket()
    
    // Check if the socket connection is not already established
    // Fetch messages from the server or initialize with some default messages
    // For simplicity, we are using static messages here
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      console.log("Emitting")
      console.log({
        text: inputMessage,
        id: `{"Ali"}`,
        user:"Ali",
        targetId:"Hemeida"
      })
      socket.emit('message', JSON.stringify({
        text: inputMessage,
        id: `{"Ali"}`,
        user:"Ali",
        targetId:"Hemeida"
      }));
    }

    setInputMessage("");
    return;
  };


  return (
    <div className="chat-app">
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
          onChange={(e) => 
{            e.preventDefault()
            setInputMessage(e.target.value)
}          }
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatApp;
