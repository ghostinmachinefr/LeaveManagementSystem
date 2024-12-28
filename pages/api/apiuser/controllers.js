const LeaveRequest = require('../../../src/server/models/LeaveRequest');

const controllers = {
    // History Controller
    // Used in: /v1/history
    // Fetches all leave requests sorted by ID
    getHistoryData: async (req, res) => {
        try {
            const leaveRequests = await LeaveRequest.find({}).sort({ ID: 1 });
            
            if (!leaveRequests || leaveRequests.length === 0) {
                return res.status(404).json({ message: 'No leave requests found' });
            }

            const formattedData = leaveRequests.map(request => ({
                ID: request.ID,
                type: request.type,
                from: formatDate(request.from),
                to: formatDate(request.to),
                takenOn: formatDate(request.takenOn)
            }));

            res.json(formattedData);
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    // Leave Card Controller
    // Used in: /v1/leaveCard
    // Gets statistics for different types of leaves
    getLeaveStats: async (req, res) => {
        try {
            console.log('Processing getLeaveStats request');
            const leaveStats = await LeaveRequest.aggregate([
                {
                    $match: { cancel: { $ne: 1 } }
                },
                {
                    $group: {
                        _id: '$type',
                        count: { $sum: 1 }
                    }
                }
            ]);

            const stats = {
                fullLeave: { totalLeaves: 50, usedLeaves: 0, remainingLeaves: 50 },
                halfLeave: { totalLeaves: 50, usedLeaves: 0, remainingLeaves: 50 },
                rhLeave: { totalLeaves: 50, usedLeaves: 0, remainingLeaves: 50 },
                compOff: { totalLeaves: 50, usedLeaves: 0, remainingLeaves: 50 }
            };

            leaveStats.forEach(stat => {
                switch(stat._id) {
                    case 'Full Day':
                        stats.fullLeave.usedLeaves = stat.count;
                        stats.fullLeave.remainingLeaves = stats.fullLeave.totalLeaves - stat.count;
                        break;
                    case 'Half Day':
                        stats.halfLeave.usedLeaves = stat.count;
                        stats.halfLeave.remainingLeaves = stats.halfLeave.totalLeaves - stat.count;
                        break;
                    case 'RH':
                        stats.rhLeave.usedLeaves = stat.count;
                        stats.rhLeave.remainingLeaves = stats.rhLeave.totalLeaves - stat.count;
                        break;
                    case 'Compensatory Off':
                        stats.compOff.usedLeaves = stat.count;
                        stats.compOff.remainingLeaves = stats.compOff.totalLeaves - stat.count;
                        break;
                }
            });

            console.log('Sending response:', stats);
            res.json({ success: true, data: stats });
        } catch (error) {
            console.error('Error in getLeaveStats:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Error fetching leave statistics',
                error: error.message 
            });
        }
    },

    // Userpage Table Controller
    // Used in: /v1/userpage/today-requests
    // Gets all leave requests for the current day
    getTodayRequests: async (req, res) => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

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
            res.status(500).json({
                success: false,
                message: 'Error fetching today\'s requests',
                error: error.message
            });
        }
    },

    // Calendar Controller
    // Used in: /v1/calendar/filter-by-date
    // Filters leave requests by date range
    filterByDate: async (req, res) => {
        try {
            const { startDate, endDate } = req.query;
            
            if (!startDate || !endDate) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Start date and end date are required' 
                });
            }

            const start = new Date(startDate);
            const end = new Date(endDate);
            
            const leaves = await LeaveRequest.find({
                $and: [
                    { from: { $gte: start } },
                    { to: { $lte: end } }
                ]
            }).sort({ from: -1 });

            res.status(200).json({
                success: true,
                data: leaves
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    // Add new leave request
    submitLeaveRequest: async (req, res) => {
        try {
            const { type, startDate, endDate, reason } = req.body;
            
            const newLeaveRequest = new LeaveRequest({
                type,
                from: startDate,
                to: endDate,
                reason,
                takenOn: new Date(),
                cancel: "0"
            });

            await newLeaveRequest.save();

            res.status(200).json({
                success: true,
                message: 'Leave request submitted successfully'
            });
        } catch (error) {
            console.error('Error submitting leave request:', error);
            res.status(500).json({
                success: false,
                message: 'Error submitting leave request',
                error: error.message
            });
        }
    }
};

// Helper function for date formatting
function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

module.exports = controllers; 