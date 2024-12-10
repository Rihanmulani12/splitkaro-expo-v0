import React, { useEffect, useState, useContext, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
// import {GoogleSignin,GoogleSigninButton,statusCodes} from '@react-native-community/google-signin';
// import auth from '@react-native-firebase/auth';
//import { AuthContext } from "../contexts/authContext";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Loading from "../components/Loading";
import Counter from "../components/Functions/Counter";
import Alert from "../components/Alert";
//import {analytics} from "../configs/analytics"
import RNOtpVerify from "react-native-otp-entry";
//import {API} from "../configs/api";
import preloadImages from "../configs/preloadImages";
import { Box, Text as RsText } from "../constants/Theme/theme";
import { W } from "@/constants/Theme";
import OtpTextInput from "../components/otp";
import { Center } from "../components/Restyle/Center";
import { ErrorHandlingModal } from "./Restyle/ErrorHandlingModel";
import { Flex } from "./Restyle/Flex";

import PhoneInput from "react-native-phone-number-input";
import Toast from "react-native-toast-message";

import { loginApi, sendOtpApi } from "../helperfunctions/api";

import Log from "../helperfunctions/log";
import ReportBalanceModal from "../components/ReportBalanceModal";
import { getLocales} from "expo-localization";

import Svg, { Path } from "react-native-svg";

 
const getTimeZone = () => {
    const locales = getLocales();
    return locales[0].regionCode;
}

const Login = ({ navigation }) => {
  const alertRef = useRef();
  const popupRef = useRef();
  const phoneInput = useRef(null);
  const phoneErrorRef = useRef();
  const reportRef = useRef();
  const [enterMobileNumber, setEnterMobileNumber] = useState(true);
  const [enterOTP, setEnterOtp] = useState(false);

  const [mobileError, setMobileError] = useState(false);
  const [mobileErroText, setMobileErrorText] = useState("valid");
  const [mobile, onChangeMobile] = React.useState("");
  const [mobileNumberWithCountryCode, setMobileNumberWithCountryCode] =
    useState("");
  const [otp, onChangeOTP] = React.useState("");
  const [apiSending, setApiSending] = useState(false);
  const [apiSending2, setApiSending2] = useState(false);
  const [OTPError, setOTPError] = useState(false);
  const [countryName, setCountryName] = useState("India");
  // const [country_code, setCountry_code] = useState(countries?.find((country)=>country?.code=== getLocales()[0]?.countryCode)?.callingCode ??'91');
  const [country_code, setCountry_code] = useState(
    getTimeZone()?.toLowerCase().includes("asia") ? "91" : "1"
  );

  const internationalSupportText =
    "We're excited to announce that we're expanding international soon! Thank you for your interest! 😊";
  const isIndia = getTimeZone()?.toLowerCase().includes("asia");
  useEffect(() => {
    // GoogleSignin.configure({
    //     scopes: [], // what API you want to access on behalf of the user, default is email and profile
    //     webClientId:
    //         '472280464545-urcj7gldfejuusihi3q9ajdm9c518277.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    //     //offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //     //hostedDomain: '', // specifies a hosted domain restriction
    //     //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    //     forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    //     // accountName: '', // [Android] specifies an account name on the device that should be used
    //     // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    // });
    preloadImages();
  }, []);

  const { signIn } = React.useContext(AuthContext);

  // const callsignIn = async () => {
  //     try {
  //         await GoogleSignin.hasPlayServices();
  //         const userInfo = await GoogleSignin.signIn();
  //         signIn();
  //         console.log(userInfo);
  //         const {idToken,accessToken}=userInfo;
  //       //  console.log("access"+accessToken);
  //         const credential = auth.GoogleAuthProvider.credential(
  //             idToken,
  //             accessToken,
  //           );
  //           await auth().signInWithCredential(credential).then((response)=>{
  //               console.log(response);

  //           });
  //     } catch (error) {
  //         console.log('hi', error);
  //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //             // user cancelled the login flow
  //         } else if (error.code === statusCodes.IN_PROGRESS) {
  //             // operation (e.g. sign in) is in progress already
  //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //             // play services not available or outdated
  //         } else {
  //             // some other error happened
  //         }
  //     }
  // };

  const otpHandler = (message) => {
    try {
      let otp = "/(\d{6})/g.exec(message)[1]";
      if (otp) {
        onChangeOTP(otp);
        verifyOTP(otp);
      }
    } catch (err) {
      console.log("OTP Read error");
    }
  };

  const startListeningForOtp = () => {
    if (Platform.OS == "android") {
      try {
        RNOtpVerify.getOtp()
          .then((p) => RNOtpVerify.addListener(otpHandler))
          .catch((p) => console.log(p));
      } catch (err) {
        analytics.track("OTP Verify Error", { error: JSON.stringify(err) });
      }
    }
  };

  const sendOTP = async () => {
    try {
      const response = await sendOtpApi({
        data: {
          phone: mobile,
          country_code: "+" + country_code?.replace("+", ""),
        },
      });

      if (response?.data?.otp === "success") {
        setApiSending(false);
        setEnterMobileNumber(false);
        setEnterOtp(true);
        startListeningForOtp();
        if (Platform.OS == "android") {
          Keyboard.dismiss();
        }
        analytics.track("OTP Sent", {
          phone: mobileNumberWithCountryCode,
        });
      } else if (response?.data?.title) {
        // Unknown case to me put code as it was earlier
        setApiSending(false);
        // Log("error", response?.data)
      } else {
        setApiSending(false);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something went wrong. Please try again",
          bottomOffset: 100,
          position: "bottom",
        });
      }
    } catch (error) {
      setApiSending(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
        bottomOffset: 100,
        position: "bottom",
      });
    }
  };

  const verifyOTP = async (autoFetch = "") => {
    setVerifyOtpLoading(true);
    if (autoFetch == "" ? otp.length < 6 : autoFetch.length < 6) {
      setTimeout(() => {
        setVerifyOtpLoading(false);
      }, 1000);
      setOTPError(true);
    } else {
      if (OTPError == true) {
        setOTPError(false);
      }

      try {
        const response = await loginApi({
          data: {
            phone: mobile,
            country_code: "+" + country_code?.replace("+", ""),
            otp: autoFetch == "" ? otp : autoFetch,
          },
        });

        if (response?.data?.title) {
          showError();
          setVerifyOtpLoading(false);
        } else if (response?.data?.first_name === null) {
          analytics.track("OTP Success", {
            moveto: "signup",
          });
          navigation.navigate("SignUp", {
            mobile: mobile,
            token: response.data.token,
            invited_by: response.data.invited_by,
          });
        } else if (response?.data?.is_verified) {
          analytics.track("OTP Success", {
            moveto: "home",
          });
          if (Platform.OS == "android") {
            RNOtpVerify.removeListener();
          }
          signIn(JSON.stringify(response.data));
        } else {
          onChangeOTP("");
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Wrong OTP entered. Please try again.",
            bottomOffset: 100,
            position: "bottom",
          });
        }
      } catch (error) {
        setVerifyOtpLoading(false);
        Log("error", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something went wrong",
          bottomOffset: 100,
          position: "bottom",
        });
      }
    }
  };

  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);

  const showError = () => {
    alertRef.current.showAlert("Error in OTP");
  };

  const validatePhoneNumber = (param) => {
    setApiSending(true);
    analytics.track("Phone number validation click", {
      phone: mobile,
      country_code: country_code,
    });
    if (param == "phone") {
      const isValidPhone = phoneInput.current?.isValidNumber(mobile);

      // Regular expressions for Indian and US phone numbers (without country code)
      const indianPhoneRegex = /^[6-9]\d{9}$/;
      const usPhoneRegex = /^\d{10}$/;

      if (
        !isValidPhone ||
        !(indianPhoneRegex.test(mobile) || usPhoneRegex.test(mobile))
      ) {
        setTimeout(() => {
          setApiSending(false);
        }, 1000);
        setMobileError(true);
      } else {
        sendOTP(); // API CALL
        setEnterMobileNumber(false);
        setEnterOtp(true);
      }
    }
  };

  const showReport = () => {
    reportRef.current.showModal();
  };

  return (
    <KeyboardAvoidingView
      contentContainerStyle={{}}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      enabled
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 20,
          flexGrow: 1,
          backgroundColor: "white",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Alert type={"error"} alertHeader={"Error"} ref={alertRef}></Alert>
        <View style={{ marginVertical: 5 }}>
          {enterMobileNumber && (
            <View style={{ marginTop: 60 }}>
              <View style={{ width: W / 1.25, marginBottom: 0 }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 30,
                    fontFamily: "Metropolis-Bold",
                  }}
                >
                  Welcome to <Text style={{ color: "#5563DA" }}>Splitkaro</Text>
                  !
                </Text>
                <Text
                  style={{
                    color: "#CCCCCC",
                    fontSize: 18,
                    marginTop: 10,
                    fontFamily: "Metropolis-SemiBold",
                    marginBottom: 5,
                  }}
                >
                  Enter to witness a simplified group spending experience
                </Text>
                {/* , <Text style={{ color: '#6495ED' }}>Signup</Text> */}
                <Text
                  style={{
                    color: "black",
                    fontSize: 15,
                    marginTop: 10,
                    fontFamily: "Metropolis-SemiBold",
                    marginBottom: 5,
                    color: "red",
                  }}
                >
                  {mobileError ? "Enter a valid mobile number" : ""}{" "}
                </Text>
              </View>
              <Flex mt="s">
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={mobile}
                  value={mobile}
                  defaultCode={
                    getTimeZone()?.toLowerCase().includes("asia") ? "IN" : "US"
                    // getLocales()[0]?.countryCode
                  }
                  countryPickerProps={{
                    countryCodes: ["IN", "US"],
                  }}
                  placeholder="Enter your mobile no." // breaking in two line in some devices if using number
                  onChangeText={(text) => {
                    onChangeMobile(text);
                    setMobileError(false);
                  }}
                  onChangeFormattedText={(text) => {
                    // setFormattedValue(text);
                    setMobileNumberWithCountryCode(text);
                  }}
                  onChangeCountry={(country) => {
                    // Log('country', country)
                    setCountryName(country?.name);
                    setCountry_code(country?.callingCode[0]);
                    if (!(country?.name?.toLowerCase() == "india")) {
                      // phoneErrorRef?.current?.showModal(internationalSupportText);
                      analytics.track("International Code Selected", {
                        country: country?.name,
                      });
                    }
                  }}
                  layout="second"
                  autoFocus
                  codeTextStyle={{
                    fontFamily: "Metropolis-Medium",
                    fontSize: 15,
                    color: "black",
                  }}
                  containerStyle={{
                    flex: 1,
                    height: 50,
                    borderWidth: 2,
                    borderRadius: 25,
                    overflow: "hidden",
                    flexDirection: "row",
                    backgroundColor: "white",
                    borderColor: mobileError ? "#fe6370" : "darkgray",
                  }}
                  textContainerStyle={{
                    height: 50,
                    borderLeftWidth: 1,
                    borderLeftColor: "lightgray",
                    backgroundColor: "#f4f3f4",
                  }}
                  textInputProps={{
                    height: 50,
                    fontSize: 15,
                    color: "black",
                    // editable:  countryName.toLowerCase()=="india",
                    allowFontScaling: false,
                    fontFamily: "Metropolis-Medium",
                    placeholderTextColor: mobileError ? "#fe6370" : "darkgray",
                    multiline: false,
                    noOfLines: 1,
                  }}
                />
              </Flex>
              {!apiSending ? (
                <Pressable
                  onPress={() => {
                    validatePhoneNumber("phone");
                  }}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View style={{}}>
                    <View
                      style={{
                        marginTop: 20,
                        height: 50,
                        width: W / 1.2,
                        borderRadius: 25,
                        backgroundColor: "black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "Metropolis-SemiBold",
                        }}
                      >
                        {isIndia ? "Request OTP" : "Verify"}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {}}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View style={{}}>
                    <View
                      style={{
                        marginTop: 20,
                        height: 50,
                        width: W / 1.2,
                        borderRadius: 25,
                        backgroundColor: "black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Loading height={20} width={20} />
                    </View>
                  </View>
                </Pressable>
              )}
            </View>
          )}

          {enterOTP && (
            <View style={{ marginTop: 60 }}>
              <View style={{ marginRight: 20 }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 20,
                    fontFamily: "Metropolis-SemiBold",
                    flexWrap: "wrap",
                  }}
                >
                  Verify your mobile number
                </Text>
              </View>
              <View style={{ marginRight: 20 }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 14,
                    fontFamily: "Metropolis-Regular",
                    marginTop: 10,
                    flexWrap: "wrap",
                  }}
                >
                  {isIndia
                    ? "OTP has been sent to"
                    : "Verification code has been sent to"}{" "}
                  <Text style={{ color: "#5563DA" }}>{mobile}</Text> via sms.
                </Text>
              </View>

              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  marginTop: 10,
                  fontFamily: "Metropolis-SemiBold",
                  marginBottom: 5,
                }}
              >
                Enter{OTPError ? " correct " : " "}
                {isIndia ? "OTP" : "verification code"}
              </Text>

              {Platform.OS != "ios" ? (
                <OTPInputView
                  style={{ height: 80, paddinRight: 100 }}
                  pinCount={6}
                  code={otp}
                  onCodeChanged={(code) => {
                    onChangeOTP(code);
                  }}
                  codeInputFieldStyle={{
                    ...styles.underlineStyleBase,
                    borderColor: OTPError ? "#fe6370" : "black",
                  }}
                  codeInputHighlightStyle={{
                    ...styles.underlineStyleHighLighted,
                    borderColor: OTPError ? "#fe6370" : "black",
                  }}
                />
              ) : (
                <OtpTextInput onChangeOTP={onChangeOTP} OTPError={OTPError} />
              )}

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      paddingTop: 20,
                      fontFamily: "Metropolis-Regular",
                      fontSize: 13,
                    }}
                  >
                    Didn't receive the {isIndia ? "OTP" : "code"} ?{" "}
                  </Text>
                  <Counter
                    resendOTP={() => {
                      sendOTP();
                      onChangeOTP("");
                      startListeningForOtp();
                    }}
                  />
                </View>
              </View>

              {/* <Box  my={'l'}>
                  <RsText marginTop={'m'} color='grey300' variant="medium">
                    Still having trouble?
                  </RsText>
                  <RsText marginTop={'m'} variant="regular">
                    Login using
                    <RsText
                      variant="regular"
                      color={'primaryBlue'}
                      onPress={() => setIsOtpModalVisible(false)}>
                      {` ${'WhatsApp'}. `}
                    </RsText>
                    <WhatsappLogo width={12} height={12} />
                  </RsText>
                </Box> */}

              <View
                style={{ flexDirection: "row-reverse", marginHorizontal: 20 }}
              >
                {!apiSending2 ? (
                  <Pressable
                    onPress={() => {
                      verifyOTP();
                    }}
                  >
                    <Center
                      style={{
                        marginTop: 20,
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        backgroundColor: "black",
                      }}
                    >
                      <Arrow height={28} width={28} />
                      <Svg  height={28} width={28}>
                        <g>
                          <g xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M265.171,125.577l-80-80c-4.881-4.881-12.797-4.881-17.678,0c-4.882,4.882-4.882,12.796,0,17.678l58.661,58.661H12.5   c-6.903,0-12.5,5.597-12.5,12.5c0,6.902,5.597,12.5,12.5,12.5h213.654l-58.659,58.661c-4.882,4.882-4.882,12.796,0,17.678   c2.44,2.439,5.64,3.661,8.839,3.661s6.398-1.222,8.839-3.661l79.998-80C270.053,138.373,270.053,130.459,265.171,125.577z"
                              fill="#ffffff"
                              data-original="#000000"
                            />
                          </g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                          <g xmlns="http://www.w3.org/2000/svg"></g>
                        </g>{" "}
                      </Svg>
                    </Center>
                  </Pressable>
                ) : (
                  <Pressable onPress={() => {}}>
                    <Center
                      style={{
                        marginTop: 20,
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        backgroundColor: "black",
                      }}
                    >
                      <Loading height={22} width={22} />
                    </Center>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        </View>
        {isIndia ? (
          <Flex
            alignSelf="center"
            alignItems="center"
            justify="center"
            position="absolute"
            bottom={40}
          >
            <RsText variant={"medium"} fontSize={14} lineHeight={24}>
              Made with
            </RsText>
            
            <Svg
      width={14} // Corrected the width syntax
      height={14} // Corrected the height syntax
      fill="#FE6370"
      style={{ marginHorizontal: 4 }}
      viewBox="0 0 16 16"
    >
      <Path
        fillRule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
      />
    </Svg>

            
            <RsText variant={"medium"} fontSize={14} lineHeight={24}>
              in India
            </RsText>
          </Flex>
        ) : (
          <></>
        )}
      </ScrollView>

      <ErrorHandlingModal
        ref={phoneErrorRef}
        title="Service Unavailable"
        // onFeedbackPress={()=>{
        //     phoneErrorRef.current.hideModal();
        //     showReport()}}
        onFeedbackPress={null}
        onPress={() => phoneErrorRef.current.hideModal()}
        onClose={() => phoneErrorRef.current.hideModal()}
      />
      <ReportBalanceModal ref={reportRef} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  underlineStyleBase: {
    borderRadius: 5,
    height: 50,
    width: 40,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    fontSize: 20,
    fontFamily: "Metropolis-Medium",
    marginRight: 10,
    color: "black",
  },
  underlineStyleHighLighted: {
    borderColor: "black",
    fontSize: 20,
    fontFamily: "Metropolis-Medium",
    color: "black",
  },
});
export default Login;
