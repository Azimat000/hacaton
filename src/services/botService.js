import axios from 'axios';

const API_URL = 'https://your-bot-api-endpoint.com/api'; // Replace with your actual API endpoint

const botService = {
  sendMessage: async (message) => {
    try {
      const response = await axios.post(`${API_URL}/chat`, { message });
      return response.data.reply;
    } catch (error) {
      console.error('Error sending message to bot:', error);
      throw error;
    }
  },

  startNewConversation: async () => {
    try {
      const response = await axios.post(`${API_URL}/new-conversation`);
      return response.data.conversationId;
    } catch (error) {
      console.error('Error starting new conversation:', error);
      throw error;
    }
  },

  // You can add more methods here as needed, for example:
  getBotInfo: async () => {
    try {
      const response = await axios.get(`${API_URL}/bot-info`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bot info:', error);
      throw error;
    }
  },
};

export default botService;