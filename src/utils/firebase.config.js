// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvO5-vdLaozVDblh341PsNlDfESGaSbP8",
  authDomain: "arcademania-159a6.firebaseapp.com",
  projectId: "arcademania-159a6",
  storageBucket: "arcademania-159a6.appspot.com",
  messagingSenderId: "724045480997",
  appId: "1:724045480997:web:952c9a8b4717c8412dabcc",
  measurementId: "G-2WCWRGYBZN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
