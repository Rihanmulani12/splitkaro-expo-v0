import { View, Text } from 'react-native'
import React from 'react'
import OnboardingScreen from '@/components/OnboardingScreen'
import { SafeAreaView } from 'react-native-safe-area-context'

const login = () => {
  return (
     <>
     
      
     <SafeAreaView style={{ flex: 1 }}>
        <OnboardingScreen />
    </SafeAreaView>
      
     
     </>
  )
}

export default login