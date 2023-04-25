const express= require("express")
const app = express()
app.use(express.json())

// ----------dotenv-----//
require("dotenv").config()
const Port = process.env.port

// ------------connection----------//
const connection = require("./config/db")

// ------------routes---------//
const userRouter = require("./routes/userRouter")
app.use("/api",userRouter)
const flightRouter = require("./routes/flightRouter")
app.use("/api",flightRouter)


app.listen(Port,async ()=>{
    try {
        await connection
        console.log("DB is connected")
    } catch (error) {
        console.log({"err":"something is wrong"})
    }
    console.log(`server is running on ${Port}`)
})