
const Route = require('express').Router()
const Users = require("../database/config"); 
const authorize = require("../auth_routes/authorize")

Route.post("/fromPlaceId",(req,res,next)=>{
    // booking request 
console.log(req.body.placeId);
console.log(req.body.checkInDate);
console.log(req.body.checkOutDate);
console.log(req.body.amount);
    // send response 
  res.status(200).send(
      {
          bookingId:"dsa94534basdsda", 
          bookingStatus:"Confirm", 
      }
  )

})




/**
             * Description: Sample for authorization working on both side,
             * Author: Rishabh Verma
             * Warning: Please dont remove the below code
             */
// Route.post("/register",authorize, (req,res,next)=>{
//     res.status(200).json({
//         isAvailable : true
//     })
// })

module.exports = Route