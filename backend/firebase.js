function initializeAppFunctions() {
    process.env.GCLOUD_PROJECT = 'bt1-firebase';
    // [START initialize_app_functions]
    const functions = require('firebase-functions');
  
    admin.initializeApp(functions.config().firebase);
  
    let db = admin.firestore();
  
    // [END initialize_app_functions]
    return db;
  }
  function quickstartAddData(db) {
    // [START add_lovelace]
    let docRef = db.collection('users').doc('alovelace');
  
    let setAda = docRef.set({
      first: 'Ada',
      last: 'Lovelace',
      born: 1815
    });
    // [END add_lovelace]
    function quickstartListen(db) {
        // [START quickstart_listen]
        db.collection('users').get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              console.log(doc.id, '=>', doc.data());
            });
          })
          .catch((err) => {
            console.log('Error getting documents', err);
          });
        // [END quickstart_listen]
      }