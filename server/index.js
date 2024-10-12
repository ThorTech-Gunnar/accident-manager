import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { findUserByUsername, findUserById } from './data/users.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Login route
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);

  if (user && user.password === password) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { ...user, password: undefined } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Protected route example
app.get('/api/user', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = findUserById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ ...user, password: undefined });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

const startServer = (port) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      resolve(server);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use. Trying next port.`);
        reject(error);
      } else {
        console.error('An error occurred:', error);
        reject(error);
      }
    });
  });
};

const PORT = parseInt(process.env.PORT, 10) || 5000;
const MAX_PORT_ATTEMPTS = 10;

(async () => {
  for (let i = 0; i < MAX_PORT_ATTEMPTS; i++) {
    try {
      await startServer(PORT + i);
      break;
    } catch (error) {
      if (i === MAX_PORT_ATTEMPTS - 1) {
        console.error(`Unable to start server after ${MAX_PORT_ATTEMPTS} attempts.`);
        process.exit(1);
      }
    }
  }
})();
