import { findUserByUsername, addUser } from '../data/users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  console.log('Login attempt:', req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    console.log('Login failed: Missing username or password');
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = await findUserByUsername(username);
  console.log('User found:', user ? 'Yes' : 'No');

  if (!user) {
    console.log('Login failed: User not found');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log('Login failed: Incorrect password');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'fallback_secret_key',
    { expiresIn: '1d' }
  );

  console.log('Login successful for user:', user.username);
  res.json({
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    },
    token
  });
};

export const register = async (req, res) => {
  const { username, email, password, role, firstName, lastName } = req.body;

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hashedPassword, role, firstName, lastName };
    const user = await addUser(newUser);

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'fallback_secret_key', { expiresIn: '1d' });
    res.status(201).json({ user: { id: user.id, username, role: user.role, firstName, lastName }, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
