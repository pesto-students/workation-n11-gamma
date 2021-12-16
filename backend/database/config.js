var admin = require("firebase-admin");

var serviceAccount = require("../service_firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

let Users = db.collection('Users')
let cities = db.collection('cities')
let places = db.collection('places')
let hotelOwners = db.collection('owners')

const dBase = {
  Users, cities, places, hotelOwners
}
module.exports = dBase;