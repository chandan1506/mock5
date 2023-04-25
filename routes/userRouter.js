const express=require("express")
const userRouter = express.Router()
const Usermodel = require("../model/Usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

// --------------------register-----------//
userRouter.post("/register",async (req,res)=>{
      const {name,email,password} = req.body
    try {
        bcrypt.hash(password,5,async (err,secure_password)=>{
            if(err){
                console.log(err)
            }else{
                const user  = new Usermodel({name,email,password:secure_password})
                await user.save()
                res.status(201).send("User registered successfully")
            }
        })
    } catch (error) {
        console.log({"err":"something went wrong"})
    }
})

// -------------------login-------------//
userRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body
    try {
       const user = await Usermodel.find({email})
       if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(result){
                const token = jwt.sign({userID:user[0]._id},process.env.key)
                 res.status(201).send({"message":"login succefull","token":token})
            }else{
                res.send("ur credential is wrong")
            }
        })
       }else{
        res.send("ur credential is wrong")
       }
        
    } catch (error) {
        console.log({"err":"something wrong"})
    }
})





module.exports=userRouter