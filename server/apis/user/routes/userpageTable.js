const express = require('express');
const router = express.Router();
const { getTodayRequests } = require('../controllers/userpageTableController');

router.get('/today-requests', getTodayRequests);

module.exports = router;
