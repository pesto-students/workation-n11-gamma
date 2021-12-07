

var admin = require("firebase-admin");

var serviceAccount = require("./workation-a447f-firebase-adminsdk-5s32o-ba2d85fa98.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

let Users = db.collection('Users')

module.exports = Users