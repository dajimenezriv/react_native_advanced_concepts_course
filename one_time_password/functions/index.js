const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./create_user');
const requestOTP = require('./request_otp');
const verifyOTP = require('./verify_otp');

const serviceAccount = require('./service_account.json');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// we create a function that is always available in firebase functions
// with `firebase deploy` we create the functions

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://react-native-course-2797e-default-rtdb.firebaseio.com/',
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOTP = functions.https.onRequest(requestOTP);
exports.verifyOTP = functions.https.onRequest(verifyOTP);
