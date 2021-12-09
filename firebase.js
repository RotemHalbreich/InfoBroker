// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-oC_Qt4WV-ZFzyZ0Ls_xcGDxWrHpORcY",
  authDomain: "infobroker-64412.firebaseapp.com",
  projectId: "infobroker-64412",
  storageBucket: "infobroker-64412.appspot.com",
  messagingSenderId: "10194176181",
  appId: "1:10194176181:web:e8285312bd48bad6dc96fc",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);