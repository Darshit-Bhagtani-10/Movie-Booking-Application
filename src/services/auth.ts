import authService from '../api/authService';

// Register user
export const registerUser = async (userData: { email: string; password: string }) => {
  try {
    const response = await authService.post('/register', userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Registration failed');
  }
};

// Login user
export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await authService.post('/login', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};
