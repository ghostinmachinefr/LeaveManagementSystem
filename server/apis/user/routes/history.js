const express = require('express');
const router = express.Router();

const {historyController} = require("../controllers/historyContoller.js")

// Route to get leaves by SAPID
router.get('/sapid', historyController.getLeavesBySAPID);


module.exports = router;