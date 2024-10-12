import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { authenticate } from './middleware/auth.js';
import os from 'os';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Instead of exiting, we'll retry the connection after a delay
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectToMongoDB, 5000);
  }
};

connectToMongoDB();

// Routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

// Protected route example
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

const PORT = process.env.PORT || 5000;
const MAX_PORT_ATTEMPTS = 10;

function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return '0.0.0.0';
}

const ipAddress = getIPAddress();

function startServer(port) {
  app.listen(port)
    .on('listening', () => {
      console.log(`Server running on http://${ipAddress}:${port}`);
      console.log(`Host IP address: ${ipAddress}`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE' && port < PORT + MAX_PORT_ATTEMPTS) {
        console.log(`Port ${port} is in use, trying ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error('Failed to start server:', err);
      }
    });
}

startServer(PORT);
