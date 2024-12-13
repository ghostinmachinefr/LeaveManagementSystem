const LeaveRequest = require('../../../models/LeaveRequest');

const getHistoryData = async (req, res) => {
    try {
        // Add error handling for MongoDB connection
        const leaveRequests = await LeaveRequest.find({}).sort({ ID: 1 });
        
        if (!leaveRequests || leaveRequests.length === 0) {
            return res.status(404).json({ message: 'No leave requests found' });
        }

        // Format the data before sending
        const formattedData = leaveRequests.map(request => ({
            ID: request.ID,
            type: request.type,
            from: formatDate(request.from),
            to: formatDate(request.to),
            takenOn: formatDate(request.takenOn)
        }));

        console.log('Sending data:', formattedData); // Debug log
        res.json(formattedData);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Helper function to format dates
function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

module.exports = {
    getHistoryData
};