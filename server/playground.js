import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(process.env.DATABASE_NAME);
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectToDatabase();

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a test user (for demonstration purposes)
app.post('/create-test-user', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    const result = await db.collection('users').insertOne({ username: 'testuser', password: hashedPassword });
    res.json({ message: 'Test user created', userId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Playground server running on http://localhost:${PORT}`);
});
