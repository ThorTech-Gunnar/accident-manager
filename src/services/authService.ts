import { User, LoginCredentials, AuthState } from '../types';

// Simulated user data (replace with actual backend integration)
const users: User[] = [
  { id: '1', username: 'admin', email: 'admin@example.com', role: 'Admin', firstName: 'Admin', lastName: 'User' },
  { id: '2', username: 'manager', email: 'manager@example.com', role: 'Manager', firstName: 'Manager', lastName: 'User' },
  { id: '3', username: 'staff', email: 'staff@example.com', role: 'Staff', firstName: 'Staff', lastName: 'User' },
];

export const login = async (credentials: LoginCredentials): Promise<AuthState> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = users.find(u => u.username === credentials.username);
  if (user) {
    // In a real app, you'd verify the password here
    const token = btoa(JSON.stringify(user)); // This is not secure, just for demonstration
    return { user, token };
  }
  throw new Error('Invalid credentials');
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