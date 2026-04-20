import axios from 'axios';

// In production, the backend serves the frontend from the same origin. 
// We use the environment variable if provided, otherwise default to relative path '/api'
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const quizService = {
  async getCharacterMatch(payload) {
    try {
      const response = await axios.post(`${API_BASE_URL}/match`, payload);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};
