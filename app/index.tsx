import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import OnboardingScreen from '@/components/OnboardingScreen'


export default function index() {
 
  return (
     <SafeAreaView style={{flex : 1}}>
      <OnboardingScreen/>
     </SafeAreaView>
  )
}
