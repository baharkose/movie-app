import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBLzZTGDW6MEZkxao6St6ReZbd1vNX34nc",
  authDomain: "movieapp-433c5.firebaseapp.com",
  projectId: "movieapp-433c5",
  storageBucket: "movieapp-433c5.appspot.com",
  messagingSenderId: "943525086643",
  appId: "1:943525086643:web:e2fd6450832c4b675477c6",
  measurementId: "G-39B6P1D3E2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
