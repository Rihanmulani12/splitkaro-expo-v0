import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Pressable, Image, ScrollView, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Screen } from './Screen';
import { onboarding } from './onboarding';
import { Box, H, palette, Text, W } from '../constants/Theme';
import { Button } from './Restyle/Button';
import SafeScreen from './SafeScreen';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Carousal = () => {
  const [isPressed, setIsPressed] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef();

  useEffect(() => {
    const noOfData = onboarding.length;
    let scrolled = Math.round(scrollX.__getValue() / W);

    const loop = setInterval(() => {
      if (isPressed) return;
      scrolled = scrolled + 1;
      if (scrolled >= noOfData) scrolled = 0;

      if (flatListRef?.current) {
        flatListRef?.current.scrollToOffset({
          animated: true,
          offset: scrolled * W,
        });
      }
    }, 5000);

    return () => clearInterval(loop);
  }, [isPressed]);

  const Indicator = ({ scrollX }) => (
    <View style={{ flexDirection: 'row' }}>
      {onboarding.map((_, i) => {
        const inputRange = [(i - 1) * W, i * W, (i + 1) * W];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.6],
          extrapolate: 'clamp',
        });
        const color = scrollX.interpolate({
          inputRange,
          outputRange: [
            palette.grey300,
            palette.primaryBlue,
            palette.primaryBlue,
          ],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              width: 10,
              margin: 5,
              height: 10,
              borderRadius: 5,
              backgroundColor: color,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );

  return (
    <Box alignItems="center" flex={1}>
      <Animated.FlatList
        pagingEnabled
        data={onboarding}
        horizontal
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <Pressable
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
          >
            <Box
              flex={1}
              width={W}
              marginBottom={20}
              alignItems="center"
              paddingHorizontal={20}
            >
              <Box
                flex={6}
                width={W * 0.8}
                alignItems="center"
                justifyContent="center"
              >
                <Animated.Image
                  source={item.photo}
                  resizeMode="contain"
                  style={{ width: W * 0.9, height: H * 0.6 }}
                />
              </Box>
              <Box flex={2} justifyContent="flex-end">
                <Text
                  fontSize={16}
                  lineHeight={18}
                  textAlign="center"
                  variant="semiBold"
                >
                  {item.title}
                </Text>
                <Text marginTop="m" textAlign="center" variant="regular">
                  {item.description}
                </Text>
              </Box>
            </Box>
          </Pressable>
        )}
      />
      <Box flex={0.08}>
        <Indicator scrollX={scrollX} />
      </Box>
    </Box>
  );
};

const OnboardingScreen = () => {
 

  return (
    <SafeScreen>
      <Screen flex={1} barStyle="dark-content" style={{ backgroundColor: 'white' }}>
        <Box flex={1}>
          <Box
            paddingTop={20}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              style={{ height: 48, width: 48 }}
              source={require('../assets/images/splash-icon.png')}
            />
            <Text variant="header">splitkaro</Text>
          </Box>
          <Text textAlign="center" fontSize={16} lineHeight={18} variant="info">
            Transforming how people spend together
          </Text>
        </Box>

        <Box flex={6}>
          <Carousal />
        </Box>

        <Box
          flex={1}
          flexDirection="row"
          paddingHorizontal="l"
          justifyContent="space-between"
        >  
         <Link href="/login" asChild>
       <Button label="Get Started" 
         width={'48%'}
         title="Get started"
       >


       </Button>
      </Link>
       
       
      <Link href="/login" asChild>
       <Button label="Login" 
         width={'48%'}
         title="Login"
       >


       </Button>
      </Link>
  
        </Box>
      </Screen>
    </SafeScreen>
  );
};

export default OnboardingScreen;
