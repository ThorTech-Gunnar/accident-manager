import { LoginCredentials, AuthState } from '../types';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Replace with your actual API URL

export const login = async (credentials: LoginCredentials): Promise<AuthState> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    const { user, token } = response.data;
    return { user, token };
  } catch (error) {
    throw new Error('Invalid credentials');
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
