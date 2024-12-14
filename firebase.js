import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByrg8CJO-dFKehka4GfntNUmfa8OlJA6w", // From google-services.json
  authDomain: "splitkaro-expo-v0.firebaseapp.com",
  projectId: "splitkaro-expo-v0",
  storageBucket: "splitkaro-expo-v0.appspot.com",
  messagingSenderId: "954438919722", // From google-services.json
  appId: "1:954438919722:android:7a0d3a00357b91c0eec553", // From google-services.json
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export const setupRecaptcha = (containerId) => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    containerId,
    {
      size: "invisible",
      callback: () => {
        console.log("Recaptcha verified");
      },
    },
    auth
  );
};

export { auth, signInWithPhoneNumber }; 
