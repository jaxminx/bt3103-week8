import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC4PWNeT4veMCLhCca8e-MKpzh8hPX25NM",
  authDomain: "bt3103-week-6-7bf2b.firebaseapp.com",
  projectId: "bt3103-week-6-7bf2b",
  storageBucket: "bt3103-week-6-7bf2b.appspot.com",
  messagingSenderId: "144256374641",
  appId: "1:144256374641:web:5ac0f77da24d331c7d08d0",
  measurementId: "G-QWZ98D7QPV",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
