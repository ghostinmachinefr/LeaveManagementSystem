const express = require('express');
const router = express.Router();
const { getLeaveStats } = require('../controllers/leaveCardController');

router.get('/stats', async (req, res) => {
    try {
        await getLeaveStats(req, res);
    } catch (error) {
        console.error('Route Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

module.exports = router;
