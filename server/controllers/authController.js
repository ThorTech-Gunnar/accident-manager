import { findUserByUsername } from '../data/users.js';
import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  const { username, password } = req.body;

  const user = findUserByUsername(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1d' }
  );

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
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const user = new User({ username, email, password, role, firstName, lastName });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ user: { id: user._id, username, role: user.role, firstName, lastName }, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
