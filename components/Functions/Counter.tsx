import React, { useEffect, useState} from 'react';
// import { AuthContext } from "../contexts/authContext"
import { Text, View, Pressable, Platform } from "react-native";
import RNOtpVerify from 'react-native-otp-entry';
//import {analytics} from "../configs/analytics"

const Counter = (props : any) => {

    const [counter, setCounter] = useState(45);

    useEffect(() => {
        const timer =  setTimeout(() => {
            if (counter > 0) {
                setCounter(counter - 1)

            }
        }, 1000)

        return () => clearTimeout(timer)
    })
    
    useEffect(()=>{
        if(counter == 0){
            if(Platform.OS=="android")
            {  
                try {
                     //@ts-ignore
                    RNOtpVerify.removeListener();
                } catch (err) {
                    //('OTP Verify Error', { error: JSON.stringify(err) })
                }
            }
           
        }
    },[counter])
    return (
        <>
            {counter != 0 ? (
                <Text allowFontScaling={false} style={{ paddingTop: 20, paddingLeft: 5, color: "#5563DA", fontFamily: "Metropolis-Regular", fontSize: 13 }}>Resend in {counter} sec </Text>
            ) : (
                <Pressable onPress={() => { setCounter(45); props.resendOTP() }}>
                    <Text allowFontScaling={false} style={{ paddingTop: 20, paddingLeft: 5, color: "#5563DA", fontFamily: "Metropolis-Regular", fontSize: 13, textDecorationLine: 'underline' }}>Click to resend </Text>
                </Pressable>
            )}

        </>
    );





}

export default Counter;