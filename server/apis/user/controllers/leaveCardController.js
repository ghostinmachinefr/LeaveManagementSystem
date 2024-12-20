const LeaveRequest = require('../../../models/LeaveRequest');

const getLeaveStats = async (req, res) => {
    try {
        // Count all leaves by type from history table
        const leaveStats = await LeaveRequest.aggregate([
            {
                $match: {
                    cancel: { $ne: 1 } // Exclude cancelled leaves
                }
            },
            {
                $group: {
                    _id: '$type',
                    count: { $sum: 1 }
                }
            }
        ]);

        console.log('Retrieved leave stats:', leaveStats);

        // Initialize stats with total of 50 for each type
        const stats = {
            fullLeave: { totalLeaves: 50, usedLeaves: 0, remainingLeaves: 50 },
            halfLeave: { totalLeaves: 50, usedLeaves: 0, remainingLeaves: 50 },
            rhLeave: { totalLeaves: 50, usedLeaves: 0, remainingLeaves: 50 },
            compOff: { totalLeaves: 50, usedLeaves: 0, remainingLeaves: 50 }
        };

        // Update used leaves based on aggregation results
        leaveStats.forEach(stat => {
            console.log('Processing stat:', stat);
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
};

module.exports = {
    getLeaveStats
};
