var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bt1-firebase.firebaseio.com"
});

function initializeAppFunctions() {
    process.env.GCLOUD_PROJECT = 'firestorebeta1test2';
    // [START initialize_app_functions]
    const functions = require('firebase-functions');
  
    admin.initializeApp(functions.config().firebase);
  
    let db = admin.firestore();
  
    // [END initialize_app_functions]
    return db;
  }
  function demoInitialize(db) {
    // [START demo_initialize]
    // Fetch data from Firestore
    db.collection('cities').get()
      .then(documentSet => {
        // Print the ID and contents of each document
        documentSet.forEach(doc => {
          console.log(doc.id, ' => ', doc.data());
        });
      })
      .catch(err => {
        // Error fetching documents
        console.log('Error', err);
      });
    // [END demo_initialize]
  }
  function quickstartAddData(db) {
    // [START add_lovelace]
    let docRef = db.collection('users').doc('alovelace');
  
    let setAda = docRef.set({
      first: 'Ada',
      last: 'Lovelace',
      born: 1815
    });}