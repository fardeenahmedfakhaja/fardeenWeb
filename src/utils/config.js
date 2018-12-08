import firebase from "firebase";
import 'firebase/storage';
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyADyA6izNHs3XwNWvH-YAl7T9KjJTKVQjg",
    authDomain: "rentalapplicatin.firebaseapp.com",
    databaseURL: "https://rentalapplicatin.firebaseio.com",
    projectId: "rentalapplicatin",
    storageBucket: "rentalapplicatin.appspot.com",
    messagingSenderId: "944716909452"
};
const fire =firebase.initializeApp(config);
export default fire;