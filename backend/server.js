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


const app = express();
dotenv.config();


const PORT = process.env.PORT;

const secret = process.env.COOKIE_SECRET;
const Users = require("./config") 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));
// app.use(authorize)
// app.use(decodeIDToken)

app.get('/', function(req,res){
    // res.sendFile(path.join(__dirname,'public','index.html'));
    res.send("Hello")
})


app.post("/create", async(req,res)=>{
    const data = req.body;
    const uniqueId = new mongoose.mongo.ObjectId();
    // console.log(uniqueId,"uniqueId");
    await Users.doc(uniqueId.toString()).set(data);
    res.send({msg:"user added"})
})
app.listen(PORT || 8080,(err)=>{
    //    console.log(err,"error");
       console.log(`Running on PORT ${PORT}`);
})


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA53oeVpfFE5bAoBzFD3MIDjFZ-PLXfoHw",
//   authDomain: "workation-a447f.firebaseapp.com",
//   projectId: "workation-a447f",
//   storageBucket: "workation-a447f.appspot.com",
//   messagingSenderId: "402434159452",
//   appId: "1:402434159452:web:c424123e077ff423790799",
//   measurementId: "G-TTSJ3Y6VZL"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// npm install -g firebase-tools

// firebase login
// firebase init
// firebase deploy