import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const OtpTextInput = ({ onChangeOTP, OTPError } : any) => {
  const [otp, setOTP] = useState('');

  const handleOTPChange = otp => {
    // Only allow digits and limit to 6 characters
    const sanitizedOTP = otp.replace(/[^0-9]/g, '').slice(0, 6);
    setOTP(sanitizedOTP);
    onChangeOTP(sanitizedOTP);
  };

  return (
    <TextInput
      style={[
        styles.textInput,
        OTPError ? styles.errorTextInput : null,
      ]}
      keyboardType="numeric"
      maxLength={6}
      value={otp}
      onChangeText={handleOTPChange}
      placeholder="Enter OTP"
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius:20,
    marginTop:10
  },
  errorTextInput: {
    borderColor: '#fe6370',
  },
});

export default OtpTextInput;