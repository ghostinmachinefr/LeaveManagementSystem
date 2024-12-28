const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

// History Routes
// GET /v1/history
// Displays all leave requests in the history page
router.get('/history', controllers.getHistoryData);

// Leave Card Routes
// GET /v1/leaveCard
// Shows statistics of different types of leaves
router.get('/leaveCard', controllers.getLeaveStats);

// Userpage Table Routes
// GET /v1/userpage/today-requests
// Shows today's leave requests in the user dashboard
router.get('/userpage/today-requests', controllers.getTodayRequests);

// Calendar Routes
// GET /v1/calendar/filter-by-date
// Filters leave requests by date range
router.get('/calendar/filter-by-date', controllers.filterByDate);

// Test route for calendar
router.get('/calendar/test', (req, res) => {
    res.json({ message: 'Calendar router is working' });
});

// Update these routes to match the frontend calls
router.get('/leaveCard/stats', controllers.getLeaveStats);  // Was previously '/leaveCard'
router.get('/userpage/today-requests', controllers.getTodayRequests);

// Add this route to handle leave submissions
router.post('/userpage/today-requests', controllers.submitLeaveRequest);

module.exports = router; 