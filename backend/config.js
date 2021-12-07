// const { initializeApp } = require('firebase-admin/app');
// const { getFirestore }=  require("firebase-admin/firestore")
// const fa = require('firebase-admin')
// const serviceid = require("./workation-334417-cbb76a2423d5.json")
// const firebaseConfig = {
//   apiKey: "AIzaSyA53oeVpfFE5bAoBzFD3MIDjFZ-PLXfoHw",
//   authDomain: "workation-a447f.firebaseapp.com",
//   projectId: "workation-a447f",
//   storageBucket: "workation-a447f.appspot.com",
//   messagingSenderId: "402434159452",
//   appId: "1:402434159452:web:c424123e077ff423790799",
//   measurementId: "G-TTSJ3Y6VZL"
// };

// fa.initializeApp({
//     credential: fa.credential.cert(serviceid),
//     // databaseURL: 'https://phone-book-fe436.firebaseio.com',
//   });

// const db = fa.firestore(); 

// // initializeApp(firebaseConfig);
// // const db = getFirestore();
// const Users = db.collection('Users');




// module.exports = Users;


var admin = require("firebase-admin");

var serviceAccount = require("./workation-a447f-firebase-adminsdk-5s32o-ba2d85fa98.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

let Users = db.collection('Users')

module.exports = Users