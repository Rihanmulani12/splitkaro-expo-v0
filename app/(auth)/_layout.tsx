import { Stack  } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const AuthLayout = () => {
    return (
    
      <Stack  screenOptions={{ headerShown: false}}>
        <Stack.Screen name='login'   />
        <Stack.Screen name='loginOtp'  />
        
  
        <StatusBar backgroundColor='#161622' style="light" />
        </Stack>
     
      
    )
  }

export default AuthLayout;