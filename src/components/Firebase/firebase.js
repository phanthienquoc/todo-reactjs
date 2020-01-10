import app from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyADRgt6j7DG8HaBSzpwyUf7u02TNVnFFzs",
  authDomain: "where-07012020.firebaseapp.com",
  databaseURL: "https://where-07012020.firebaseio.com",
  projectId: "where-07012020",
  storageBucket: "where-07012020.appspot.com",
  messagingSenderId: "636823559741",
  appId: "1:636823559741:web:d61f11b073a40f4adf1454",
  measurementId: "G-S944LRE078"
};

const Firebase = () => {
  app.initializeApp(firebaseConfig);
};
export default Firebase;
