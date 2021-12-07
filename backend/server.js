const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const cors = require('cors');

const bcrypt = require('bcrypt');


const app = express();
dotenv.config();


const PORT = process.env.PORT;

const secret = process.env.COOKIE_SECRET;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));


app.get('/', function(req,res){
    // res.sendFile(path.join(__dirname,'public','index.html'));
    res.send("Hello")
})

app.listen(PORT || 8080,(err)=>{
    //    console.log(err,"error");
       console.log(`Running on PORT ${PORT}`);
})