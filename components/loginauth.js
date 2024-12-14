import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { setupRecaptcha, auth } from '../firebase'; // Adjust path if needed
import { signInWithPhoneNumber } from "firebase/auth";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = () => {
    setupRecaptcha("recaptcha-container"); // Setup reCAPTCHA

    const appVerifier = window.recaptchaVerifier;
    
    // Send verification code to phone number
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then(confirmationResult => {
        setVerificationId(confirmationResult.verificationId);
        setMessage("Verification code sent!");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Error sending code: " + error.message);
      });
  };

  const handleVerifyCode = () => {
    // Verify the OTP code entered by the user
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    auth.signInWithCredential(credential)
      .then((userCredential) => {
        setMessage("User signed in successfully!");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Error verifying code: " + error.message);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Send Verification Code" onPress={handleSignIn} />
      
      {message && <Text>{message}</Text>}
      
      <TextInput
        placeholder="Enter verification code"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <Button title="Verify Code" onPress={handleVerifyCode} />
      
      <View id="recaptcha-container"></View> 
    </View>
  );
};

export default LoginScreen;
