import firebase from "firebase/app";
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD1i0zwJt1CzFzZEvM0k4BEAyNV0I1kQpk",
  authDomain: "e-market-838a5.firebaseapp.com",
  projectId: "e-market-838a5",
  storageBucket: "e-market-838a5.appspot.com",
  messagingSenderId: "1045586949652",
  appId: "1:1045586949652:web:5b7b2028227607e1bf9901",
  measurementId: "G-7TG9KPHBMM"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const storageInstance = firebase.storage();

export { storageInstance as storage, app as default };
