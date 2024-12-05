require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');

const Employee = require('./models/Employee');
const LeaveRequest = require('./models/LeaveRequest');

// Secure MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to read JSONL file
const readJSONL = (filePath) => {
  const fileContents = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
  return fileContents.trim().split('\n').map(line => JSON.parse(line));
};

// Import Employees
const importEmployees = async () => {
  try {
    // Clear existing data
    await Employee.deleteMany({});
    
    // Read JSONL file
    const employeeData = readJSONL('./database/employee.jsonl');
    
    // Transform data to match mongoose schema
    const employees = employeeData.map(emp => ({
      SAPID: emp.SAPID,
      name: emp.name,
      password: emp.password, // Note: In production, you'd hash this
      role: emp.role,
      fullday: emp.fullday,
      halfday: emp.halfday,
      rh: emp.rh,
      compOff: emp.compOff
    }));
    
    // Insert data
    await Employee.insertMany(employees);
    console.log('Employees imported successfully');
  } catch (error) {
    console.error('Error importing employees:', error);
  }
};

// Import Leave Requests
const importLeaveRequests = async () => {
  try {
    // Clear existing data
    await LeaveRequest.deleteMany({});
    
    // Read JSONL file
    const requestData = readJSONL('./database/request.jsonl');
    
    // Transform data
    const requests = requestData.map(req => ({
      ID: req.ID,
      type: req.type,
      from: new Date(req.from),
      to: new Date(req.to),
      takenOn: new Date(req.takenOn),
      SAPID: req.SAPID,
      reason: req.reason,
      cancel: req.cancel
    }));
    
    // Insert data
    await LeaveRequest.insertMany(requests);
    console.log('Leave Requests imported successfully');
  } catch (error) {
    console.error('Error importing leave requests:', error);
  }
};

// Run import
const runImport = async () => {
  try {
    await importEmployees();
    await importLeaveRequests();
    console.log('Import completed successfully');
  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Add error handling for MongoDB connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB successfully');
  runImport();
});