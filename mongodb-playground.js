/* global use, db */
// MongoDB Playground for Incident Management System
// This playground demonstrates operations related to user management and authentication

// Select the database to use.
use('incidentManagementDB');

// Create a unique index on the username field to ensure uniqueness
db.users.createIndex({ "username": 1 }, { unique: true });

// Insert sample users into the users collection
db.users.insertMany([
  {
    username: 'admin',
    password: 'admin123', // In a real application, this should be hashed
    email: 'admin@example.com',
    role: 'Admin',
    firstName: 'Admin',
    lastName: 'User',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: 'manager',
    password: 'manager123', // In a real application, this should be hashed
    email: 'manager@example.com',
    role: 'Manager',
    firstName: 'Manager',
    lastName: 'User',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: 'staff',
    password: 'staff123', // In a real application, this should be hashed
    email: 'staff@example.com',
    role: 'Staff',
    firstName: 'Staff',
    lastName: 'User',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Function to simulate user login
function login(username, password) {
  const user = db.users.findOne({ username: username, password: password });
  if (user) {
    console.log(`Login successful for user: ${username}`);
    return { success: true, user: { id: user._id, username: user.username, role: user.role } };
  } else {
    console.log(`Login failed for user: ${username}`);
    return { success: false, message: 'Invalid credentials' };
  }
}

// Test login function
console.log(login('admin', 'admin123'));
console.log(login('manager', 'manager123'));
console.log(login('staff', 'wrongpassword'));

// Query to find all users
const allUsers = db.users.find({}).toArray();
console.log('All users:', allUsers);

// Query to find users by role
const adminUsers = db.users.find({ role: 'Admin' }).toArray();
console.log('Admin users:', adminUsers);

// Update a user's information
db.users.updateOne(
  { username: 'staff' },
  { $set: { email: 'newstaff@example.com', updatedAt: new Date() } }
);

// Delete a user
db.users.deleteOne({ username: 'manager' });

// Count the number of users for each role
const usersByRole = db.users.aggregate([
  { $group: { _id: '$role', count: { $sum: 1 } } }
]).toArray();
console.log('Users by role:', usersByRole);
