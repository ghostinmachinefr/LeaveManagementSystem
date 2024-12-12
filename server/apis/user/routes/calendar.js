const express = require('express');
const router = express.Router();
const Leave = require('../../../models/LeaveRequest'); // Adjust path as needed

router.get('/test', (req, res) => {
    res.json({ message: 'Calendar router is working' });
});

// Route to get leaves by date range
router.get('/filter-by-date', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        if (!startDate || !endDate) {
            return res.status(400).json({ 
                success: false, 
                message: 'Start date and end date are required' 
            });
        }

        console.log('Received dates:', { startDate, endDate }); // Debug log

        // Convert dates to ISO format for comparison
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        // Query the database for leaves within the date range
        const leaves = await Leave.find({
            $and: [
                { from: { $gte: start } },
                { to: { $lte: end } }
            ]
        }).sort({ from: -1 }); // Sort by date, newest first

        res.status(200).json({
            success: true,
            data: leaves
        });

    } catch (error) {
        console.error('Error in date filter:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

module.exports = router;
