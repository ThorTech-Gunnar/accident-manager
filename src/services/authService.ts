import { LoginCredentials, AuthState, RegisterCredentials } from '../types';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Updated to match the server port

export const login = async (credentials: LoginCredentials): Promise<AuthState> => {
  try {
    console.log('Attempting login with credentials:', credentials);
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    console.log('Login response:', response.data);
    const { user, token } = response.data;
    setCurrentUser({ user, token });
    return { user, token };
  } catch (error) {
    console.error('Login error:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server response:', error.response.data);
      throw new Error(error.response.data.message || 'Invalid credentials');
    }
    throw new Error('An error occurred during login');
  }
};

export const register = async (credentials: RegisterCredentials): Promise<AuthState> => {
  try {
    console.log('Attempting registration with credentials:', credentials);
    const response = await axios.post(`${API_URL}/auth/register`, credentials);
    console.log('Registration response:', response.data);
    const { user, token } = response.data;
    setCurrentUser({ user, token });
    return { user, token };
  } catch (error) {
    console.error('Registration error:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server response:', error.response.data);
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('An error occurred during registration');
  }
};

export const logout = (): void => {
  localStorage.removeItem('authState');
};

export const getCurrentUser = (): AuthState | null => {
  const authState = localStorage.getItem('authState');
  return authState ? JSON.parse(authState) : null;
};

export const setCurrentUser = (authState: AuthState): void => {
  localStorage.setItem('authState', JSON.stringify(authState));
};
