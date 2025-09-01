// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJdEs3dn31LR1B3jKhDQQ7YmTg5zE-GP0",
  authDomain: "ped-quest.firebaseapp.com",
  databaseURL: "https://ped-quest-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ped-quest",
  storageBucket: "ped-quest.appspot.com",
  messagingSenderId: "823953022257",
  appId: "1:823953022257:web:8c6bb16790035f18932410",
  measurementId: "G-4MWJDSQWDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app