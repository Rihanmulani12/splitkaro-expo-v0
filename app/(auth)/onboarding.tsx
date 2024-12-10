
import React from 'react'
import OnboardingScreen from '@/components/OnboardingScreen'
import { View , Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Login from '@/components/Login'

const onboarding = () => {
  return (
    
    <SafeAreaView>
      <Login />

    </SafeAreaView>
    
  )
}

export default onboarding