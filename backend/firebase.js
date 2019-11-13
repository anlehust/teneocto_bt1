// const admin = require('firebase-admin');

// function initFireStore() {
//     var serviceAccount = require('C:/Users/teneocto/Downloads/bt1-firebase-adminsdk.json');
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         databaseURL: 'https://bt1-firebase.firebaseio.com'
//     });
// }
// initFireStore();
// var db = admin.database();
// var ref = db.ref("server/saving-data/fireblog");
// var usersRef = ref.child("users");
// usersRef.set({
//   alanisawesome: {
//     date_of_birth: "June 23, 1912",
//     full_name: "Alan Turing"
//   },
//   gracehop: {
//     date_of_birth: "December 9, 1906",
//     full_name: "Grace Hopper"
//   }
// });
const admin = require('firebase-admin');

let serviceAccount = require('C:/Users/teneocto/Downloads/bt1-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
let docRef = db.collection('users').doc('alovelace');

let setAda = docRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});

let getDoc = docRef.get()
.then(doc => {
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }
})
.catch(err => {
  console.log('Error getting document', err);
});