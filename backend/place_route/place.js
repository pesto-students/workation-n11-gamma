
const Route = require('express').Router()
const Cities = require("../database/config").cities; 
const places = require("../database/config").places; 
const owners = require("../database/config").hotelOwners; 
const authorize = require("../auth_routes/authorize");
const async = require('async');

Route.post("/getSearchPlace", (req, res, next) => {
    // console.log(req.body);
    let finalResult;
    let hotelsList = [];
    let cityResult = [];
    let hotels=[];
    
    async.series([
        async (cb) => {
            const ownersInCity = await owners.where('city', '==', req.body.city).get();
            if (ownersInCity._size) {
                await ownersInCity.forEach(async (doc) => {
                    const internalAddition = { ...doc.data(), id: doc.id }
                    hotelsList = [...hotelsList,internalAddition]
                });
                return 
            } else {
               return  }
        },
        async (cb) => {
            const cityDetails = await Cities.where('name', '==', req.body.city).get();
             if (cityDetails._size === 1) {
                 await cityDetails.forEach(async (doc) => {
                     const internalAddition = { ...doc.data(), id: doc.id }
                    cityResult = [...cityResult,internalAddition]
                });
                return 
            } else {
               return  }
         },
    ], (err, result) => {
        if (err) {
           return res.status(402).send({message:"error"})
        }
        
        if (cityResult?.length) {
            if (hotelsList?.length) {
                 cityResult[0].hotelsList = [...hotelsList]
            }
            else {
                cityResult[0].hotelsList = []
            }
            res.status(200).send(cityResult)
        } else {
            res.status(403).send({
                'message': 'no data found'
            })
        } 
    })

    // res.status(200).send([])
    // res.status(200).send({
    //     placeId: '123-123-123',
    //     placeName:req.body.city,
    //     placeDescription: 'Rishikesh is at the verge of tihri which can be ......',
    //     placeLocation:{
    //         lat:'34.23',
    //         lng:'23.34'
    //     },
    //     nomadsUpload: ['sdsds','sdsdsds','sdsdssdss'],
    //     hotelAvailable:[
    //         {
    //         name:"Pandit",
    //         id: '1'
    //     },
    //     {
    //         name:"sandit",
    //         id: '2'
    //     },
    //     {
    //         name:"Roma",
    //         id: '3'
    //     },
    //     {
    //         name:"OLX",     
    //         id: '4'
    //     },
    //     {
    //         name:"prem",
    //         id: '6'
    //     },
    //     {
    //         name:"rain",
    //         id: '5'
    //     }
    // ]
    // })

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
    console.log(req.body);
    // res.status(200).send({
    //     placeId: '123-123-123',
    //     placeName:req.body.subarea,
    //     placeDescription: 'Rishikesh is at the verge of tihri which can be ......',
    //     placeLocation:{
    //         lat:'34.23',
    //         lng:'23.34'
    //     },
    //     nomadsUpload: ['sdsds','sdsdsds','sdsdssdss'],
    //     hotelAvailable:[
    //         {
    //         name:"Pandit",
    //         id: '1'
    //     },
    //     {
    //         name:"Roma",
    //         id: '3'
    //     },
    //     {
    //         name:"OLX",     
    //         id: '4'
    //     },
    //     {
    //         name:"prem",
    //         id: '6'
    //     },
    //     {
    //         name:"rain",
    //         id: '5'
    //     }
    // ]
    // })
    req.body.city = 'Delhi'
    let finalResult;
    let hotelsList = [];
    let cityResult = [];
    let hotels=[];
    
    async.series([
        async (cb) => {
            const ownersInCity = await owners.where('city', '==', req.body.city).get();
            if (ownersInCity._size) {
                await ownersInCity.forEach(async (doc) => {
                    const internalAddition = { ...doc.data(), id: doc.id }
                    hotelsList = [...hotelsList,internalAddition]
                });
                return 
            } else {
               return  }
        },
        async (cb) => {
            const cityDetails = await Cities.where('name', '==', req.body.city).get();
             if (cityDetails._size === 1) {
                 await cityDetails.forEach(async (doc) => {
                     const internalAddition = { ...doc.data(), id: doc.id }
                    cityResult = [...cityResult,internalAddition]
                });
                return 
            } else {
               return  }
         },
    ], (err, result) => {
        if (err) {
           return res.status(402).send({message:"error"})
        }
        
        if (cityResult?.length) {
            if (hotelsList?.length) {
                cityResult[0].hotelsList = [...hotelsList]
                cityResult[0].hotelsList.length = 1;
            }
            else {
                cityResult[0].hotelsList = []
            }
            res.status(200).send(cityResult)
        } else {
            res.status(403).send({
                'message': 'no data found'
            })
        } 
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