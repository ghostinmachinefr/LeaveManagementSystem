const express = require('express');
const router = express.Router();
const LeaveRequest = require('../../../models/LeaveRequest');

// POST endpoint to create a new leave request
router.post('/request', async (req, res) => {
    try {
        const { type, startDate, endDate, reason } = req.body;
        
        // Get the latest request ID
        const latestRequest = await LeaveRequest.findOne().sort({ ID: -1 });
        const newID = latestRequest ? latestRequest.ID + 1 : 1;

        // Create new leave request
        const newRequest = new LeaveRequest({
            ID: newID,
            type: type,
            from: startDate,
            to: endDate,
            takenOn: new Date(),
            SAPID: "12345", // You can modify this based on your user authentication
            reason: reason,
            cancel: "0"
        });

        await newRequest.save();

        res.status(201).json({
            success: true,
            data: newRequest
        });
    } catch (error) {
        console.error('Error creating leave request:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Add this route to your leave.js router
router.put('/cancel/:id', async (req, res) => {
    try {
        const request = await LeaveRequest.findOneAndUpdate(
            { ID: req.params.id },
            { cancel: "1" },
            { new: true }
        );

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        res.json({
            success: true,
            data: request
        });
    } catch (error) {
        console.error('Error canceling leave request:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;