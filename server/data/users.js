export const users = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    email: 'admin@example.com',
    role: 'Admin',
    firstName: 'Admin',
    lastName: 'User'
  },
  {
    id: '2',
    username: 'manager',
    password: 'manager123',
    email: 'manager@example.com',
    role: 'Manager',
    firstName: 'Manager',
    lastName: 'User'
  },
  {
    id: '3',
    username: 'staff',
    password: 'staff123',
    email: 'staff@example.com',
    role: 'Staff',
    firstName: 'Staff',
    lastName: 'User'
  }
];

export const findUserByUsername = (username) => {
  return users.find(user => user.username === username);
};

export const findUserById = (id) => {
  return users.find(user => user.id === id);
};
