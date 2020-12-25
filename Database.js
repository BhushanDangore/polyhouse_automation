import Firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAIoocGk9_QNo66yRizxPBZ5vPzU1UvtsU",
    authDomain: "polyhouseautomation-aa1ce.firebaseapp.com",
    databaseURL: "https://polyhouseautomation-aa1ce.firebaseio.com",
    projectId: "polyhouseautomation-aa1ce",
    storageBucket: "polyhouseautomation-aa1ce.appspot.com",
    messagingSenderId: "917867841937",
    appId: "1:917867841937:web:5f38565ea283c744473230",
    measurementId: "G-5H9TYEZKQC"
};

export const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();