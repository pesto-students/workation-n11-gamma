var admin = require("firebase-admin");

var serviceAccount = require("./service_firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

let Users = db.collection('Users')

module.exports = Users