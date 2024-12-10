const express =require("express")
const mongoose =require("mongoose")
const dotenv =require("dotenv")
const historyRouter = require("./apis/user/routes/history")
const leaveRouter = require("./apis/user/routes/leave")
dotenv.config()

const app = express()

app.get("/",(req,res)=>{
    console.log("hello world")
    res.send("hello world")
})

app.use("/v1/history",historyRouter)
app.use("/v1/leave",leaveRouter)

app.listen(4000, () => {
    console.log('Server is running on port 3000')
})