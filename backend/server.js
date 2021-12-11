// initialising variables
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv')
const cors = require('cors');
const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true)
    },
}
//
const app = express();

const authRoute = require("./auth_routes/auth")
const placeRoute = require("./place_route/place")
// dotenv config
dotenv.config();

//applying middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

// routes

app.use('/v1', authRoute);
app.use('/place', placeRoute)

const PORT = process.env.PORT;

app.listen(PORT || 8080,(err)=>{
       console.log(`Running on PORT ${PORT}`);
})
