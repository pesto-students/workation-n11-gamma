
const Route = require('express').Router()
const Users = require("../database/config"); 


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
            location:'dsdfsdfdf',
            availability: {
                from:'sdfdf',
                to:'dfddf'
            },
            minNumberOfDays: '7',
            amenities: ['asds','sdsdas','dsdsd','sdsdsa'],
            price: '23000',
            bedsAvailable: '2',
            id: '1'
        },
        {
            name:"Pandit",
            location:'dsdfsdfdf',
            availability: {
                from:'sdfdf',
                to:'dfddf'
            },
            minNumberOfDays: '7',
            amenities: ['asds','sdsdas','dsdsd','sdsdsa'],
            price: '23000',
            bedsAvailable: '2',
            id: '2'
        },
        {
            name:"Pandit",
            location:'dsdfsdfdf',
            availability: {
                from:'sdfdf',
                to:'dfddf'
            },
            minNumberOfDays: '7',
            amenities: ['asds','sdsdas','dsdsd','sdsdsa'],
            price: '23000',
            bedsAvailable: '2',
            id: '3'
        },
        {
            name:"Pandit",
            location:'dsdfsdfdf',
            availability: {
                from:'sdfdf',
                to:'dfddf'
            },
            minNumberOfDays: '7',
            amenities: ['asds','sdsdas','dsdsd','sdsdsa'],
            price: '23000',
            bedsAvailable: '2',
            id: '4'
        },
        {
            name:"Pandit",
            location:'dsdfsdfdf',
            availability: {
                from:'sdfdf',
                to:'dfddf'
            },
            minNumberOfDays: '7',
            amenities: ['asds','sdsdas','dsdsd','sdsdsa'],
            price: '23000',
            bedsAvailable: '2',
            id: '6'
        },
        {
            name:"Pandit",
            location:'dsdfsdfdf',
            availability: {
                from:'sdfdf',
                to:'dfddf'
            },
            minNumberOfDays: '7',
            amenities: ['asds','sdsdas','dsdsd','sdsdsa'],
            price: '23000',
            bedsAvailable: '2',
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

module.exports = Route