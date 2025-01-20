import './chatBot.css';
import React, { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { BiBot, BiUser } from 'react-icons/bi';
import { BsFillTelephoneFill, BsCameraVideoFill } from 'react-icons/bs';
import { FaRegClock } from 'react-icons/fa';
import { BsFillMicFill } from 'react-icons/bs';

function ChatBot() {
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  
  // Feedback form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');

  const getCurrentTime = () => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return {
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: now.toLocaleDateString(undefined, options),
    };
  };

  useEffect(() => {
    const messageArea = document.getElementById('messageArea');
    if (messageArea) messageArea.scrollTop = messageArea.scrollHeight;
  }, [chat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') {
      alert('Please enter a valid message');
      return;
    }

    const userMessage = { sender: 'user', msg: inputMessage };
    setChat((prevChat) => [...prevChat, userMessage]);
    setInputMessage('');
    setBotTyping(true);

    try {
      const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender: 'User', message: inputMessage }),
      });

      const data = await response.json();
      if (data && data.length > 0) {
        const botMessage = { sender: 'bot', msg: data[0].text };
        setChat((prevChat) => [...prevChat, botMessage]);
      }
    } catch (error) {
      console.error('Error communicating with the bot:', error);
    } finally {
      setBotTyping(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevVisible) => !prevVisible);
  };

  const toggleFeedback = () => {
    setFeedbackVisible((prevVisible) => !prevVisible);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Clear the feedback form after submission
    setName('');
    setEmail('');
    setQuery('');
    alert('Thank you for your feedback!');
    setFeedbackVisible(false);  // Close feedback form after submission
  };

  return (
    <div className="chatContainer">
      {/* Header */}
      <div className="chatHeader">
        <h1>PRESIDENCY UNIVERSITY</h1>
        <p>{getCurrentTime().date}</p>
        <p className="time">
          <FaRegClock /> {getCurrentTime().time}
        </p>
        {botTyping && <p className="typingIndicator">Bot is typing...</p>}
      </div>

      <div className="controls">
        <button className="dropdownToggle" onClick={toggleDropdown}>
          Quick Links
        </button>
        <button className="feedbackToggle" onClick={toggleFeedback}>
          Feedback Form
        </button>
      </div>

      {dropdownVisible && (
        <div className="dropdownContainer">
          <h3>Quick Links</h3>
          <div className="dropdown-content">
            <a href="https://presidencyuniversity.in/" target="_blank" rel="noopener noreferrer">
              About Presidency University
            </a>
            <a href="https://apply.presidencyuniversity.in/" target="_blank" rel="noopener noreferrer">
              About Admissions
            </a>
            <a
              href="https://presidencyuniversity.in/student-life/student-housing-facilities"
              target="_blank"
              rel="noopener noreferrer"
            >
              About Hostel Facilities
            </a>
            <div className="contact-info">
              <strong>Contact Us:</strong>
              <p>University Board Line: +91 080-23093500</p>
              <p>Admission Inquiries: +91 9022092222, +91 6366782344</p>
              <p>Admission Email: admission@presidencyuniversity.in</p>
              <p>
                Address: Itgalpura, Rajanukunte, Yelahanka, Bengaluru, Karnataka, Pin: 560119, India
              </p>
              <p>Email: iconinfo@presidencyuniversity.in</p>
            </div>
            <a
              href="https://presidencyuniversity.in/school/school-of-engineering"
              target="_blank"
              rel="noopener noreferrer"
            >
              School of Engineering
            </a>
            <a
              href="https://presidencyuniversity.in/school/school-of-management"
              target="_blank"
              rel="noopener noreferrer"
            >
              School of Management
            </a>
          </div>
        </div>
      )}

      {/* Chat Body */}
      <div className="chatBody" id="messageArea">
        {chat.map((message, index) => (
          <div key={index} className={message.sender === 'bot' ? 'msgAlignStart' : 'msgAlignEnd'}>
            {message.sender === 'bot' ? (
              <div className="msgBubble botMessage">
                <BiBot className="botIcon" />
                <span>{message.msg}</span>
              </div>
            ) : (
              <div className="msgBubble userMessage">
                <span>{message.msg}</span>
                <BiUser className="userIcon" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Feedback Form */}
      {feedbackVisible && (
        <div className="feedbackForm">
          <h3>Feedback Form</h3>
          <form onSubmit={handleFeedbackSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Query"
              rows="4"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {/* Footer */}
      <div className="chatFooter">
        <div className="footerIcons">
          <BsFillTelephoneFill className="footerIcon" title="Call" />
          <BsCameraVideoFill className="footerIcon" title="Video Call" />
          <BsFillMicFill className="footerIcon" title="Voice Assistant" />
        </div>
        <form onSubmit={handleSubmit} className="messageForm">
          <input
            type="text"
            className="messageInput"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button type="submit" className="sendButton">
            <IoMdSend />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBot;
