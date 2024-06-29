import React from "react";
import './css/FPC.css'
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import Navbar from '../../components/Navbar_fpc'
const ChatPage = () => {
  const { chatId } = useParams();
  const chats = [
    {
      id: 1,
      topic: "General",
      title: "KYC VALIDATION'2025",
      description: "Regarding KYC Validation for 2025 batch.",
      user: "@anti21is",
      date: "2 days ago",
    },
    {
      id: 2,
      topic: "Training-Java",
      title: "P4 JAVA RETEST'2025",
      description: "P4 Java retest has been scheduled on 26th June 2024.",
      user: "@anti21is",
      date: "2 days ago",
    },
    {
      id: 3,
      topic: "Training-Python",
      title: "P4 PYTHON RETEST'2025",
      description: "P4 Python retest has been scheduled on 28th June 2024.",
      user: "@anti21is",
      date: "2 days ago",
    },
    {
      id: 4,
      topic: "Training-Python",
      title: "P4 PYTHON RETEST'2025",
      description: "P4 Python retest has been scheduled on 28th June 2024.",
      user: "@anti21is",
      date: "2 days ago",
    },
  ];

  const chat = chats.find((chat) => chat.id === parseInt(chatId));
  if (!chat) {
    return <p>Chat not found</p>;
  }
  return (
    <>
    {/* <Navbar/> */}
      {/* <div className="chat-box">
        <div key={chat.id}>
          <div className="chat-topic">{chat.topic}</div>
          <div className="chat-details">
            <p>
              <FaUserCircle className="icon" /> {chat.user}
            </p>
            <h5>{chat.title}</h5>
            <p>{chat.description}</p>
          </div>
          <div className="chat-date">{chat.date}</div>
        </div>
        <div className="chat-window">Hello everyone this chat is regarding {chat.title}</div>
      </div> */}
      <div className={`chat-box`}>
        <div className={`chat-details-container`}>
          <div key={chat.id}>
            <div className={`chat-topic`}>{chat.topic}</div>
            <div className={`chat-details`}>
              <p>
                <FaUserCircle className={`icon`} /> {chat.user}
              </p>
              <h5>{chat.title}</h5>
              <p>{chat.description}</p>
            </div>
          </div>
        </div>
        <div className={`chat-window`}>
          <p>
            <FaUserCircle className={`icon`} /> {chat.user}
            <br /> &nbsp;&nbsp; Hello everyone this chat is regarding{" "}
            {chat.title}
          </p>
        </div>
        <div className={`input-container`}>
          <input type="text" placeholder="Type your message here.." />
          <IoMdSend className={`send-icon`} />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
