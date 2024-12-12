const express = require('express');
const router = express.Router();
const { getHistoryData } = require('../controllers/historyController');

// Remove the extra 'history' from the route path
router.get('/', getHistoryData);

module.exports = router;