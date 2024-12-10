//const LeaveRequest = require('../../models/LeaveRequest');

const historyController = {
    // Get leave requests by SAPID
    getLeavesBySAPID: async (req, res) => {
        try {

            console.log("hello world sapid")
            const { sapid } = req.query;
           // const leaves = await LeaveRequest.find({ SAPID: sapid })
             //   .sort({ takenOn: -1 }); // Sort by latest first
            
            res.status(200).json({
                success: true,
                data: "This si the data "
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    // Get leave requests by date range

};

module.exports = {
    historyController
}