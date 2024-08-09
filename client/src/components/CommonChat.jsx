import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import styles from './CommonChat.module.css';
import { IoSend } from "react-icons/io5";
import { IoChatbubblesSharp } from "react-icons/io5";


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
    <>
    <div className={styles.chatContainer}>
     <div className={styles.chatTitle}>
          <IoChatbubblesSharp className={styles.chatIcon} />
          <h5>Chat</h5>
     </div>
    <div className={styles.chatSpace}>
    <div className={styles.chatBox}>
      {Array.isArray(messages) && messages.map((msg, index) => (
        <div
          key={index}
          className={`${styles.message} ${msg.sender === 'user' ? styles.user : styles.other}`}
        >
          <div className={styles.messageHeader}>
            <span className={styles.messageSender}>{msg.sender}</span>
          </div>
          <div className={styles.messageText}>
            {msg.text}
            &nbsp;&nbsp;
            <span className={styles.messageTime}>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
    <div className={styles.messageBoxContainer}>
      <input
        className={styles.messageBox}
        type="text"
        placeholder='Type your message...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={styles.chatSendButton} onClick={sendMessage}>
        <IoSend />
      </button>
    </div>
  </div>
  </div>
  </>
  );
};


export default CommonChat;