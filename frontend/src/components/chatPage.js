import React, { useState, useEffect } from 'react';

function  ChatApp(){
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  useEffect(() => { 
        // Check if the socket connection is not already established
    // Fetch messages from the server or initialize with some default messages
    // For simplicity, we are using static messages here
    const initialMessages = [
      { id: 1, user: 'User1', text: 'Hello!' },
      { id: 2, user: 'User2', text: 'Hi there!' },
    ];

    setMessages(initialMessages);
  }, []);

  const sendMessage = (message) => {
    if (inputMessage.trim() === '') {
      // socket.emit('message', {
      //   text: message,
      //   name: localStorage.getItem('userName'),
      //   id: `${socket.id}${Math.random()}`,
      //   socketID: socket.id,
      // });
    }

    setInputMessage('');
      return;
    }

    // Create a new message object
    const newMessage = {
      id: messages.length + 1,
      user: 'CurrentUser', // You can replace this with the actual user information
      text: inputMessage,
    };

    // Update the state with the new message
    setMessages([...messages, newMessage]);

    // Clear the input field
    setInputMessage('');

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
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
