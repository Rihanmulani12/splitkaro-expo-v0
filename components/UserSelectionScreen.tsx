import React from 'react';
import { Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Box, Text, H, W } from '@/constants/Theme';
import { Screen } from './Screen';
import { Center } from './Restyle/Center';
import { Button } from './Restyle/Button';
import UserSelectionCard from './UserSelectionCard'; // Import refactored component

const dummyData = [
  {
    id: '1',
    title: 'Split Bills',
    photo: require('@/assets/icons/onboarding/onboarding1.png'),
  },
  {
    id: '2',
    title: 'Track Expenses',
    photo: require('@/assets/icons/onboarding/onboarding2.png'),
  },
  
];

const UserSelectionScreen = ({ navigation }: any) => {
  return (
    <Screen alignItems="center" py="l">
      <Box alignItems="center" mt="l">
        <Text color="primaryBlack" variant="screenHeader">
          What brings you to Splitkaro?
        </Text>
      </Box>

      <Box
        px="m"
        pt="l"
        flex={8}
        flexWrap="wrap"
        alignItems="center"
        flexDirection="row"
        justifyContent="space-around"
      >
        {dummyData.map((item) => (
          <UserSelectionCard
            key={item.id}
            item={item}
            onPress={() => console.log(`${item.title} Selected`)}
          />
        ))}
      </Box>

      <Center flex={2}>
        <Pressable onPress={() => console.log('Continue Button Clicked')}>
          <Animatable.View animation="fadeInUpBig" duration={800}>
            <Button marginTop="l" label="Continue" />
          </Animatable.View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('home')}>
          <Text variant="regular" marginTop="m">
            Skip
          </Text>
        </Pressable>
      </Center>
    </Screen>
  );
};

export default UserSelectionScreen;
