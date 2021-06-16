
import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyA_VklAUBcYPxPS7P4MOYqbY_0mjlEQp00",
  authDomain: "barter-app-2-dec9d.firebaseapp.com",
  projectId: "barter-app-2-dec9d",
  storageBucket: "barter-app-2-dec9d.appspot.com",
  messagingSenderId: "350539556296",
  appId: "1:350539556296:web:c41638853d291c8adfccfd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore()