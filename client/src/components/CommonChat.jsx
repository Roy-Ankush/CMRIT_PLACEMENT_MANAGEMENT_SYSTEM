
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './CommonChat.css';
import { IoSend } from "react-icons/io5";

const socket = io('http://localhost:8000'); // Ensure this URL is correct

const CommonChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.emit('fetchMessages');
    socket.on('receiveMessages', (receivedMessages) => {
      if (Array.isArray(receivedMessages)) {
        setMessages(receivedMessages);
      } else {
        console.error('Expected an array of messages, but received:', receivedMessages);
      }
    });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  
    return () => {
      socket.off('receiveMessages');
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { text: message, sender: 'user' });
      setMessage('');
    }
  };

  return (
    <div className={`chat-space`}>
      <div className={`chat-box`}>
        {Array.isArray(messages) && messages.map((msg, index) => (
          <div
          key={index}
          className={`message ${msg.sender === 'user' ? 'user' : 'other'}`}
        >
          <div className={`message-header`}>
            <span className={`message-sender`}>{msg.sender}</span>
          </div>
          <div className={`message-text`}>{msg.text}&nbsp;&nbsp;<span className={`message-time`}>{new Date(msg.timestamp).toLocaleTimeString()}</span></div>
        </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className={`message-box-container`}>
        <input
          className={`message-box`}
          type="text"
          placeholder='Type your message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={`chat-send-button`} onClick={sendMessage}>
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default CommonChat;
