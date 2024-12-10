const express = require('express');
const router = express.Router();

const {leavecontroller} = require("../controllers/leavecontroller.js")

// Route to get leaves by SAPID
router.get('/leave', leavecontroller.getLeavesBySAPID);


module.exports = router;