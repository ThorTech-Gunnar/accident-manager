// app.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost/login_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User model with role
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'staff'], default: 'staff' }
});

const User = mongoose.model('User', UserSchema);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/login_system' }),
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Permission middleware
const checkRole = (roles) => (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  User.findById(req.session.userId)
    .then(user => {
      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    })
    .catch(err => res.status(500).json({ message: 'Error checking permissions', error: err.message }));
};

// Function to create test accounts
async function createTestAccounts() {
  const testAccounts = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'manager', password: 'manager123', role: 'manager' },
    { username: 'staff', password: 'staff123', role: 'staff' }
  ];

  for (const account of testAccounts) {
    try {
      const existingUser = await User.findOne({ username: account.username });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(account.password, 10);
        const user = new User({
          username: account.username,
          password: hashedPassword,
          role: account.role
        });
        await user.save();
        console.log(`Test account created: ${account.username} (${account.role})`);
      } else {
        console.log(`Test account already exists: ${account.username} (${account.role})`);
      }
    } catch (error) {
      console.error(`Error creating test account ${account.username}:`, error);
    }
  }
}

// Create test accounts when the app starts
createTestAccounts();

// Routes
app.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    req.session.userId = user._id;
    res.json({ message: 'Logged in successfully', role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out', error: err.message });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Protected routes with role-based access
app.get('/admin-dashboard', checkRole(['admin']), (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

app.get('/manager-dashboard', checkRole(['admin', 'manager']), (req, res) => {
  res.json({ message: 'Welcome to the manager dashboard' });
});

app.get('/staff-dashboard', checkRole(['admin', 'manager', 'staff']), (req, res) => {
  res.json({ message: 'Welcome to the staff dashboard' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});