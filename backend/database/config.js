var admin = require("firebase-admin");

var serviceAccount = require("../service_firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let db = admin.firestore();
const fieldValue = admin.firestore.FieldValue;
let Users = db.collection("Users");
let cities = db.collection("cities");
let places = db.collection("places");
let hotelOwners = db.collection("owners");
let landingvideo = db.collection("landingVideos");
let bookings = db.collection("booking");

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
