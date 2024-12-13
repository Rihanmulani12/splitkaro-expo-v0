import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { useRouter } from "expo-router";

const Login = () => {

 
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const router = useRouter();

  
  const handleRequestOtp = () => {
    if (phoneNumber) {
      Alert.alert("OTP Requested", `OTP sent to ${phoneNumber}`);

      router.push("/(tabs)/home");
      
    } else {
      Alert.alert("Error", "Please enter a valid phone number.");
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

      
      <View style={{marginLeft : 10}} >
        <PhoneInput 
          ref={phoneInput}
          placeholder=""
          value={phoneNumber}
          defaultCode="IN" // Dummy default country code
        
          onChangeFormattedText={(text) => setPhoneNumber(text)} // Capture phone number
         
          containerStyle={styles.phoneInputContainer}
          textContainerStyle={{
           
            backgroundColor : "transparent",
          }}
          
      
        />
      </View>

      
      <Pressable style={styles.requestOtpButton} onPress={handleRequestOtp} >
       
        <View style={styles.requestOtpButtonTextContainer }>
          <Text style={styles.requestOtpText}>Request OTP</Text>
          
        </View>
      </Pressable>
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
   
    backgroundColor : "none",
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
