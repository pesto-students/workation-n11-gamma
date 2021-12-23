var admin = require("firebase-admin");
var serviceAccount = require("../service_firebase.json");

// initialise firebase app creds
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// initialise database
const db = admin.firestore();

// creating the variables for database use
const fieldValue = admin.firestore.FieldValue;
const Users = db.collection("Users");
const cities = db.collection("cities");
const places = db.collection("places");
const hotelOwners = db.collection("owners");
const landingvideo = db.collection("landingVideos");
const bookings = db.collection("booking");

const dBase = {
  Users,
  cities,
  places,
  hotelOwners,
  landingvideo,
  bookings,
  fieldValue,
};

module.exports = dBase;
