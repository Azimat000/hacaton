import { useState, useCallback, useEffect } from 'react';
import botService from '../services/botService';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addWelcomeMessage = useCallback(() => {
    const welcomeMessage = {
      text: 'Привет! Как я могу помочь вам сегодня?',
      sender: 'bot',
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, welcomeMessage]);
  }, []);

  // Эффект для добавления приветственного сообщения при первом рендере
  useEffect(() => {
    addWelcomeMessage();
  }, [addWelcomeMessage]);

  const sendMessage = useCallback(async (text) => {

    if (!text.trim()) return;

    const userMessage = {
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const botResponse = await botService.sendMessage(text);
      const botMessage = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorMessage = {
        text: 'Извините, я получил ошибку, попробуйте заново.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startNewChat = useCallback(() => {
    setMessages([]);
    addWelcomeMessage(); // Добавляем приветственное сообщение при начале нового чата
  }, [addWelcomeMessage]);

  return {
    messages,
    isLoading,
    sendMessage,
    startNewChat,
  };
};

export default useChat;