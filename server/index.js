const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const historyRouter = require("./apis/user/routes/history")
const leaveRouter = require("./apis/user/routes/leave")
dotenv.config()

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

// Connect to MongoDB with proper error handling
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get("/",(req,res)=>{
    console.log("hello world")
    res.send("hello world")
})

// Your existing routes
app.use("/v1/history",historyRouter)
app.use("/v1/leave",leaveRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
    // Connect to MongoDB after server starts
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('MongoDB connection error:', err));
});