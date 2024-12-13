import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="login"
          
        />
        
      </Stack>

      <StatusBar style="auto" />
    </>
  );
};

export default AuthLayout;
