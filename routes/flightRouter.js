const express=require("express")
const flightRouter = express.Router()
const Flightmodel = require("../model/Flighmodel")

// ---------------add flight----------//
flightRouter.post("/flights",async (req,res)=>{
    const payload = req.body

    try {
                const flight  = new Flightmodel(payload)
                await flight.save()
                res.status(201).send("flights added successfully")
    } catch (error) {
        console.log({"err":"something went wrong"})
        res.send("something went wrong")
    }

})

// ----------------get all flight-------------//
flightRouter.get("/flights",async (req,res)=>{
    try {
                const flight  = await Flightmodel.find()
                res.status(200).send(flight)
    } catch (error) {
        console.log({"err":"something went wrong"})
        res.send("something went wrong")
    }

})

//---------------get flight by id-------------//
flightRouter.get("/flights/:id",async (req,res)=>{
    const id=req.params.id

    try {
                const flight  = await Flightmodel.find({_id:id})
                res.status(200).send(flight)
    } catch (error) {
        console.log({"err":"something went wrong"})
        res.send("something went wrong")
    }

})

// ------------------update flight-------------//

flightRouter.patch("/flights/:id",async (req,res)=>{
    const id=req.params.id
    const payload= req.body

    try {
                await Flightmodel.findByIdAndUpdate({_id:id},payload)
                    res.status(204).send("flight data is updated")
               
    } catch (error) {
        console.log({"err":"something went wrong"})
        res.send("something went wrong")
    }
})

// -------------------delete flight--------------//

flightRouter.delete("/flights/:id",async (req,res)=>{
    const id=req.params.id

    try {
               await Flightmodel.findByIdAndDelete({_id:id})
                    res.status(202).send("flight data is deleted")
               
    } catch (error) {
        console.log({"err":"something went wrong"})
        res.send("something went wrong")
    }
})




module.exports=flightRouter