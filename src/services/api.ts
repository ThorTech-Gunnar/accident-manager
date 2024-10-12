import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials: { username: string; password: string }) =>
  api.post('/auth/login', credentials);

export const register = (userData: any) => api.post('/auth/register', userData);

export const getUsers = () => api.get('/users');
export const getUserById = (id: string) => api.get(`/users/${id}`);
export const updateUser = (id: string, userData: any) => api.put(`/users/${id}`, userData);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);

export const getCases = () => api.get('/cases');
export const getCaseById = (id: string) => api.get(`/cases/${id}`);
export const createCase = (caseData: any) => api.post('/cases', caseData);
export const updateCase = (id: string, caseData: any) => api.put(`/cases/${id}`, caseData);
export const deleteCase = (id: string) => api.delete(`/cases/${id}`);

export default api;