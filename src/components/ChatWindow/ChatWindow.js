import React, { useEffect, useRef } from 'react';
import Message from '../Message/Message';
import './ChatWindow.css';

const ChatWindow = ({ messages, isLoading, onNewChat }) => {

  const messagesEndRef = useRef(null);

  // Прокручиваем вниз при изменении сообщений
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Зависимость от messages

  return (
    <div className="chat-window">
      <div className="chat-controls">
        <button className="new-chat-button" onClick={onNewChat}>
          Начать новый чат
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {isLoading && <div className="loading-indicator">Bot is typing...</div>}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;