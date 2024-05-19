const {initializeApp, cert} = require("firebase-admin/app");
export const {getFirestore, Timestamp, FieldValue} = require("firebase-admin/firestore");
export const {getDatabase, ServerValue} = require("firebase-admin/database");

const serviceAccount = require("./firebaseAdminPK.json");
// Initialize Firebase apps.
initializeApp({
    credential: cert(serviceAccount),
    databaseURL: "https://teamone-hackathon-2023-default-rtdb.asia-southeast1.firebasedatabase.app",
});

export const Firestore = getFirestore();
export const Database = getDatabase();
