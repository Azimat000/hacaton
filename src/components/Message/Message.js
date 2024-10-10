import React from 'react';
import './Message.css';

const Message = ({ message }) => {
  const { text, sender, timestamp } = message;

  const messageClass = sender === 'user' ? 'message-user' : 'message-bot';

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message ${messageClass}`}>
      <div className="message-content">
        <p className="message-text">{text}</p>
        <span className="message-timestamp">{formatTimestamp(timestamp)}</span>
      </div>
      <div className="message-sender">{sender === 'user' ? 'You' : 'Bot'}</div>
    </div>
  );
};

export default Message;