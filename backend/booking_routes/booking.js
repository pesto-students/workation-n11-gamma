
const Route = require('express').Router()
const Users = require("../database/config").Users; 
const authorize = require("../auth_routes/authorize")
const Route = require("express").Router();
const Cities = require("../database/config").cities;
const places = require("../database/config").places;
const owners = require("../database/config").hotelOwners;
const booking = require("../database/config").bookings;
const landingvideo = require("../database/config").landingvideo;
const authorize = require("../auth_routes/authorize");
const async = require("async");
var nodemailer = require("nodemailer");
require("dotenv").config();


const Route = require('express').Router()
// const Users = require("../database/config"); 
const authorize = require("../auth_routes/authorize")
import firebase from "firebase";
Route.post("/fromPlaceId",(req,res,next)=>{
    // booking request 
console.log(req.body.placeId);
console.log(req.body.checkInDate);
console.log(req.body.checkOutDate);
console.log(req.body.amount);
    // send response 

let bookingId;
const data = {
    ...req.body,
    uid: new Date().getTime(), 
    bookingtime: new Date().toUTCString()
  };
async.series(
    [
        async () => {
            const bookingConfirm = await booking.doc(data.uid).set(
               data
               
            );

            console.log(bookingConfirm);
            return;
            
        },
        async ()=>{
            const userBooking = await Users.doc(
                data.userId
            ).update({
                bookings:  firebase.firestore.FieldValue.arrayUnion(data.uid)
            });
        },
        
        async ()=>{
            const placeBooking = await place.doc(
                data.placeId
            ).update({
                bookings:  firebase.firestore.FieldValue.arrayUnion(data.uid)
            });
        },
        
    ],
    (err) => {
        if (err) {
          return res.status(402).send({ message: "error" });
        }

        res.status(200).send(data.uid);
  
      
      }
)
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