
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import {initializeApp} from "firebase/app";



    const firebaseConfig = {

      apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
    
      };
      



 const fire = firebase.initializeApp(firebaseConfig);

export default fire;


