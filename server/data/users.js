import bcrypt from 'bcrypt';

let users = [
  {
    id: '1',
    username: 'admin',
    password: '$2b$10$X7GXjjGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGX', // hashed 'admin123'
    email: 'admin@example.com',
    role: 'Admin',
    firstName: 'Admin',
    lastName: 'User'
  },
  {
    id: '2',
    username: 'manager',
    password: '$2b$10$X7GXjjGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGX', // hashed 'manager123'
    email: 'manager@example.com',
    role: 'Manager',
    firstName: 'Manager',
    lastName: 'User'
  },
  {
    id: '3',
    username: 'staff',
    password: '$2b$10$X7GXjjGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGXGX', // hashed 'staff123'
    email: 'staff@example.com',
    role: 'Staff',
    firstName: 'Staff',
    lastName: 'User'
  }
];

export const findUserByUsername = async (username) => {
  return users.find(user => user.username === username);
};

export const findUserById = async (id) => {
  return users.find(user => user.id === id);
};

export const addUser = async (user) => {
  const newUser = { ...user, id: (users.length + 1).toString() };
  users.push(newUser);
  return newUser;
};
