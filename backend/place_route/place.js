
const Route = require('express').Router()
const Users = require("../database/config"); 
const authorize = require("../auth_routes/authorize")

Route.post("/getSearchPlace",(req,res,next)=>{
    res.status(200).send({  
        placeId: '123-123-123',
        placeName:req.body.city,
        placeDescription: 'Rishikesh is at the verge of tihri which can be ......',
        placeLocation:{
            lat:'34.23',
            lng:'23.34'
        },
        nomadsUpload: ['sdsds','sdsdsds','sdsdssdss'],
        hotelAvailable:[
            {
            name:"Pandit",
            id: '1'
        },
        {
            name:"sandit",
            id: '2'
        },
        {
            name:"Roma",
            id: '3'
        },
        {
            name:"OLX",     
            id: '4'
        },
        {
            name:"prem",
            id: '6'
        },
        {
            name:"rain",
            id: '5'
        }
    ]
    })

})


Route.post("/isPlaceAvailable", (req,res,next)=>{
    res.status(200).json({
        isAvailable : true
    })
})



Route.post("/searchonfilter", (req, res, next) => {
    // res.status(402).send({
    //     message:"No host found"
    // })
    res.status(200).send({
        placeId: '123-123-123',
        placeName:req.body.city,
        placeDescription: 'Rishikesh is at the verge of tihri which can be ......',
        placeLocation:{
            lat:'34.23',
            lng:'23.34'
        },
        nomadsUpload: ['sdsds','sdsdsds','sdsdssdss'],
        hotelAvailable:[
            {
            name:"Pandit",
            id: '1'
        },
        {
            name:"Roma",
            id: '3'
        },
        {
            name:"OLX",     
            id: '4'
        },
        {
            name:"prem",
            id: '6'
        },
        {
            name:"rain",
            id: '5'
        }
    ]
    })

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