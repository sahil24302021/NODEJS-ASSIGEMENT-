const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../assignment10-35296-firebase-adminsdk-fbsvc-4d95382802.json");

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

console.log("Firebase connected successfully");

module.exports = db;