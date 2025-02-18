import axios from 'axios';

const authService = axios.create({
  baseURL: process.env.REACT_APP_AUTH_BASE_URL, // Base URL for Auth Service
  timeout: 5000, // Optional: Set a timeout
  headers: {
    'Content-Type': 'application/json', // Default headers
  },
});

export default authService;
