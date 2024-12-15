import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyByrg8CJO-dFKehka4GfntNUmfa8OlJA6w", // Store securely in production
  authDomain: "splitkaro-expo-v0.firebaseapp.com",
  projectId: "splitkaro-expo-v0",
  storageBucket: "splitkaro-expo-v0.appspot.com",
  messagingSenderId: "954438919722",
  appId: "1:954438919722:android:7a0d3a00357b91c0eec553",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Send OTP (without reCAPTCHA)
export const sendOTP = async (phoneNumber) => {
  const API_KEY = firebaseConfig.apiKey; // Use the key from config
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendVerificationCode?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber: `+${phoneNumber}`,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return data.sessionInfo; // Save this for verification
    } else {
      console.error("Error sending OTP:", data.error.message);
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.error("Unexpected error sending OTP:", error);
    throw error;
  }
};

// Verify OTP
export const verifyOTP = async (sessionInfo, verificationCode) => {
  const API_KEY = firebaseConfig.apiKey; // Use the key from config
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPhoneNumber?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionInfo,
        code: verificationCode,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return data.idToken; // Use this token for authenticated requests
    } else {
      console.error("Error verifying OTP:", data.error.message);
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.error("Unexpected error verifying OTP:", error);
    throw error;
  }
};
