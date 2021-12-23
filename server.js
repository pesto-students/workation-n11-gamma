/* eslint-disable no-undef */
// initialising variables
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const serveStatic = require("serve-static");

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
};

dotenv.config();

//applying middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
// eslint-disable-next-line no-undef
// app.use(express.static(path.join(__dirname, "public")));
app.use(serveStatic(__dirname+"/frontend/build"))
const placeRoute = require("./place_route/place");
const customerRoute = require("./auth_routes/customer_auth");
const uploadRoute = require("./upload/single_upload");
const paymentRoute = require("./PayRoute/payment");

// routes

app.use("/v1", customerRoute);
app.use("/place", placeRoute);
app.use("/upload", uploadRoute);
app.use("/payment", paymentRoute);
app.get('/*.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html')); //serving build folder
});
app.get('/*.js', function (req, res) {
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, 'frontend/build', `${req.path}.gz`)); //serving build folder
});
const PORT = process.env.PORT;

app.listen(PORT || 8080, () => {
  console.log(`Running on PORT ${PORT}`);
});
