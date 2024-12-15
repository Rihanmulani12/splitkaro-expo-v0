import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert, TextInput } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { sendOTP, verifyOTP } from "../firebase.js";
import { useRouter } from "expo-router";

const Login = () => {
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionInfo, setSessionInfo] = useState(""); // To store session info after OTP is sent
  const [message, setMessage] = useState("");
  const router = useRouter();


  useEffect (()=>{
    if(message === "Login successful!"){
      router.push("/(tabs)/home");
    }
  }, [message , router])
  
  // For sending OTP
  const handleSendOTP = async () => {
    if (!phoneNumber) {
      Alert.alert("Please enter a valid phone number");
      return;
    }
  
    try {
      // Send OTP to the entered phone number
      const session = await sendOTP(phoneNumber);  
      setSessionInfo(session);  // Save session info to be used in OTP verification
      setMessage("OTP sent successfully!");
    } catch (error) {
      setMessage("Error sending OTP: " + error.message);
    }
  };
  
  // For verifying the OTP
  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert("Please enter the OTP");
      return;
    }
  
    try {
      // Verify the OTP entered by the user
      const idToken = await verifyOTP(sessionInfo, otp);
      setMessage("Login successful!"); // You can use this idToken to authenticate the user
      console.log("ID Token: ", idToken); // This is the auth token you can use to identify the user in your app
    } catch (error) {
      setMessage("Error verifying OTP: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeSection}>
        <Text style={styles.title}>
          Welcome to <Text style={styles.brandName}>Splitkaro</Text>!
        </Text>
        <Text style={styles.description}>
          Enter to witness a simplified group spending experience
        </Text>
      </View>

      {/* Phone input section */}
      <View style={{ marginLeft: 10 }}>
        <PhoneInput 
          ref={phoneInput}
          placeholder=""
          value={phoneNumber}
          defaultCode="IN" // Default country code
          onChangeFormattedText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          containerStyle={styles.phoneInputContainer}
          textContainerStyle={{
            backgroundColor: "transparent",
          }}
        />
      </View>

      {/* OTP Input and Verify button */}
      {sessionInfo && (
        <>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10 }}
          />
          <Pressable style={styles.requestOtpButton} onPress={handleVerifyOTP}>
            <View style={styles.requestOtpButtonTextContainer}>
              <Text style={styles.requestOtpText}>Verify OTP</Text>
            </View>
          </Pressable>
        </>
      )}

      {/* OTP Send button */}
      {!sessionInfo && (
        <Pressable style={styles.requestOtpButton} onPress={handleSendOTP}>
          <View style={styles.requestOtpButtonTextContainer}>
            <Text style={styles.requestOtpText}>Send OTP</Text>
          </View>
        </Pressable>
      )}

      {/* Message Display */}
      {message && <Text style={{ marginTop: 20, textAlign: 'center' }}>{message}</Text> }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  welcomeSection: {
    marginTop: 60,
    marginBottom: 30,
  },
  title: {
    color: "black",
    fontSize: 30,
    fontFamily: "Metropolis-Bold",
  },
  brandName: {
    color: "#5563DA",
  },
  description: {
    color: "#CCCCCC",
    fontSize: 18,
    marginTop: 10,
    fontFamily: "Metropolis-SemiBold",
  },
  phoneInputContainer: {
    backgroundColor: "none",
    borderWidth: 1,
    borderRadius: 20,
  },

  requestOtpButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  requestOtpButtonTextContainer: {
    height: 50,
    width: "80%",
    borderRadius: 25,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  requestOtpText: {
    color: "white",
    fontFamily: "Metropolis-SemiBold",
  },
});

export default Login;
