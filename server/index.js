require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const historyRouter = require("./apis/user/routes/history")
const leaveRouter = require("./apis/user/routes/leave")
const calanderRoutes = require("./apis/user/routes/calendar")
const userpageTableRoutes = require('./apis/user/routes/userpageTable');

const app = express()

app.use(cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept"],
    optionsSuccessStatus: 200
}))

app.get('/test', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

app.use(express.json())

// Verify the URI is loaded
console.log('MongoDB URI:', process.env.MONGODB_URI)

// Connect to MongoDB with proper error handling
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.get("/",(req,res)=>{
    console.log("hello world")
    res.send("hello world")
})

// Your existing routes
app.use("/v1/history",historyRouter)
app.use("/v1/leave",leaveRouter)
app.use('/v1/calendar', calanderRoutes);
app.use('/v1/userpage', userpageTableRoutes);

// Add this middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
