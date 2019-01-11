import firebase from 'firebase'

if (!firebase.apps.length) {
  var config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
  }
  firebase.initializeApp(config)
}

export default firebase
