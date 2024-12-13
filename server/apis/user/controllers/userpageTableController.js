const LeaveRequest = require('../../../models/LeaveRequest');

const getTodayRequests = async (req, res) => {
    try {
        // Get today's date at midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get tomorrow's date
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Find all requests made today
        const requests = await LeaveRequest.find({
            takenOn: {
                $gte: today,
                $lt: tomorrow
            }
        }).select('ID type from to takenOn');

        res.status(200).json({
            success: true,
            data: requests
        });
    } catch (error) {
        console.error('Error fetching today\'s requests:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching today\'s requests',
            error: error.message
        });
    }
};

module.exports = {
    getTodayRequests
};
