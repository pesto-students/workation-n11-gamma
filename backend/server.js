const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authorize = require("./authorize.js")
// const decodeIDToken = require('./authenticateToken');
const mongoose = require('mongoose')

const bcrypt = require('bcrypt');
const modifyPassword = require("./modify_password.js")
const { v4: uuidv4 } = require('uuid');

const app = express();
dotenv.config();


const PORT = process.env.PORT;

const secret = process.env.COOKIE_SECRET;
const Users = require("./config"); 
const { doc } = require('./config');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());


const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true)
    },
}
app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname,'public')));
// app.use(authorize)
// app.use(decodeIDToken)

app.get('/authorize', function(req,res){
    // res.sendFile(path.join(__dirname,'public','index.html'));
    console.log("calling");
    res.send("Hello")
})


app.post("/v1/register",modifyPassword, async (req,res)=>{
    const {email,password} = req.body;
    const alreaydExists = await
          Users.where('email', '=', email).get();
    //  const data = await Users.doc('61afaaee046fb48202945475').get();
    if(alreaydExists._size){
         res.status(401).json({
             error: 'Email Already Present'
         })
    } else {
        await Users.doc(uuidv4()).set(req.body);
     res.status(200).send('Welcome to the Project!');   
    }
});


app.post('/v1/login', async(req,res)=>{
    
    const isCorrectPassword = function(password,thisPassword, callback) {
        bcrypt.compare(password, thisPassword, function(err, same) {
          if (err) {
            callback(err);
          } else {
            callback(err, same);
          }
        });
      }

    const {email,password} = req.body;
    const alreaydExists = await
           Users.where('email', '=', email).get();
    if(!alreaydExists._size){
         res.status(401).json({
             error: 'User do not exists !'
         })
    } else {
        const user = alreaydExists.docs.map((doc)=>{
            const userDetail = {
                data: doc.data(),
                id: doc.id
            }
            return userDetail;
        })[0];

        const savedPassword = user?.data?.password
        isCorrectPassword(password, savedPassword, (err, same) => {
                     if (err) {
                         res.status(500).json({
                             error: 'Internal server errror'
                         })
                     } else if (!same) {
                         res.status(403).json({
                             error: "Incorrect password"
                         })
                     } else {
                         const payload = { email, id: user?.id };
                         const token = jwt.sign(payload, secret , {
                                expiresIn: '1h'
                         });
                         const cookie = req.cookies.token
                         if (!cookie){
                             res.cookie('token', token, {httpOnly: true})
                         }
                        
                        res.status(201).send({
                            token,
                            id: user?.id
                        })
                     }
          } )

    }
})


app.get("/isAuth",async (req,res,next)=>{
    const req_token = req.cookies.token;
    let auth = false;
    console.log(req_token,"req_token");
    if (!req_token){
        return res.status(401).json({
            message:'Please login'
        })
    }

    try{
        if(!jwt.verify(req_token,process.env.COOKIE_SECRET)){
            throw 'toekn not valid'
        } else {
            auth = true
        }
    }
    catch(err){
        console.log(jwt.verify(req_token,process.env.COOKIE_SECRET));
        console.log('Invalid token');
        return res.status(401).json({
            message:'Invalide token'
        })
    }

    if(!auth){
        return res.status(403).json({
            'message': 'token verification failed'
        })
    } else {
        const data = jwt.verify(req_token, process.env.COOKIE_SECRET);
        console.log(data);
        const dbUser = await Users.doc(`${data.id}`).get();
        if (!dbUser.exists){
            return res.status(403).json({
                'message': 'token verification failed'
            })
        } else {
            const payload = { email: data?.email, id: data?.id };
            const token = jwt.sign(payload, secret , {
                   expiresIn: '1h'
            });

           res.status(201).send({
            token:req_token,
               id: data?.id,
               email:data?.email
           })

        }
    }
})


app.post("/logout",(req,res,next)=>{
    res.cookie('token',undefined)
    res.clearCookie('token')
    res.status(200).send({
        "logout":true
    })
})

app.post("/getSearchPlace",(req,res,next)=>{
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
            bedsAvailable: '2'
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
            bedsAvailable: '2'
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
            bedsAvailable: '2'
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
            bedsAvailable: '2'
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
            bedsAvailable: '2'
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
            bedsAvailable: '2'
        }
    ]
    })
    // res.cookie('token',undefined)
    // res.clearCookie('token')
    // res.status(200).send({
    //     "logout":true
    // })
})



app.post("/isPlaceAvailable", (req,res,next)=>{
    res.status(200).json({
        isAvailable : true
    })
    // res.status(200).json({
    //     isAvailable : false
    // })
    // res.cookie('token',undefined)
    // res.clearCookie('token')
    // res.status(200).send({
    //     "logout":true
    // })
})

app.get("/v1/verify-token",(req,res)=>{
    res.json({
        verify:"true"
    })
}) 


app.listen(PORT || 8080,(err)=>{
       console.log(`Running on PORT ${PORT}`);
})
