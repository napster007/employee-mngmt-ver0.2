import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const app = firebase.initializeApp( {
    apiKey: "AIzaSyAniZKUV7VTnD7hJaLM9nEk7aGdrSU2UzM",
    authDomain: "employee-mngmt-8a027.firebaseapp.com",
    databaseURL: "https://employee-mngmt-8a027-default-rtdb.firebaseio.com",
    projectId: "employee-mngmt-8a027",
    storageBucket: "employee-mngmt-8a027.appspot.com",
    messagingSenderId: "814717174776",
    appId: "1:814717174776:web:f978c97d41bc71a7670c0d",
    measurementId: "G-9W6GJNJFVK"
  });


 export default app; 


  