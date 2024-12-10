import { Stack } from 'expo-router';
import React from 'react';





const AuthLayout = () => {
  return (
        
    <Stack>
      <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/onboarding" options={{ headerShown: false }} />
    </Stack>
        
      
  );
};

export default AuthLayout;