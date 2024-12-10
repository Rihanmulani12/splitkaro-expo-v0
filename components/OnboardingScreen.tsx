import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Pressable, Image, ScrollView, Dimensions } from 'react-native';

import { Screen } from '../components/Screen';
import { onboarding } from '../components/onboarding';
import { Box, H, palette, Text, W } from '../constants/Theme';
import { Button, OutlineButton } from '../components/Restyle/Button';
import SafeScreen from '../components/SafeScreen';
import { backgroundColor } from '@shopify/restyle';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Carousal = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [momentumEnd, setMomentumEnd] = useState();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  let position = Animated.divide(scrollX, W);

  let flatListRef = useRef();

  useEffect(() => {
    const noOfData = onboarding.length;
    let scrolled = Math.round(scrollX?.__getValue() / W);

    const loop = setInterval(() => {
      if (isPressed) return null;
      scrolled = scrolled + 1;
      if (scrolled < noOfData) {
        scrolled = scrolled;
      } else {
        scrolled = 0;
      }

      if (flatListRef?.current) {
        flatListRef?.current.scrollToOffset({
          animated: true,
          offset: scrolled * W,
        });
      }
    }, 5000);

    return () => clearInterval(loop);
  }, [isPressed, momentumEnd]);

  const Indicator = ({scrollX}) => {
    return (
      <View style={{flexDirection: 'row'}}>
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
                transform: [{scale: scale}],
              }}
            />
          );
        })}
      </View>
    );
  };

  const handleScroll = event => {};

  return (
    <Box alignItems="center" flex={1}>
      <Animated.FlatList
        pagingEnabled
        onMomentumScrollBegin={() => setMomentumEnd(0)}
        onMomentumScrollEnd={() => setMomentumEnd(scrollX)}
        data={onboarding}
        horizontal={true}
        ref={flatListRef}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false, listener: event => handleScroll(event)},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          return (
            <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}>
              <Box
                flex={1}
                width={W}
                marginBottom={20}
                alignItems="center"
                paddingHorizontal={20}>
                <Box
                  flex={6}
                  width={W * 0.8}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Animated.Image
                    source={item.photo}
                    resizeMode="contain"
                    style={{width: W * 0.9, height: H * 0.6}}
                  />
                </Box>

                <Box flex={2} justifyContent="flex-end">
                  <Text
                    fontSize={16}
                    lineHeight={18}
                    textAlign="center"
                    variant="semiBold">
                    {item.title}
                  </Text>
                  <Text marginTop={'m'} textAlign="center" variant="regular">
                    {item.description}
                  </Text>
                </Box>
              </Box>
            </Pressable>
          );
        }}
      />

      <Box flex={0.08}>
        <Indicator scrollX={scrollX} />
      </Box>
    </Box>
  );
};

const OnboardingScreen = ({navigation}) => {
  const [dataList, setDataList] = useState(onboarding);

  useEffect(() => {
    setDataList(onboarding);
  }, []);

  //_____________main return__________________//
  return (
    <SafeScreen>
    <Screen flex={1}  barStyle="dark-content" style={{backgroundColor : "white"}}>
      <Box flex={1}>
        <Box
          paddingTop={20}
          flexDirection="row"
          alignItems="center"
          justifyContent="center">
          <Image
            style={{height: 48, width: 48}}
            source={require("../assets/images/splash-icon.png")}
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
        justifyContent="space-between">
        <OutlineButton
          width={'48%'}
          label="Get Started"
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          width={'48%'}
          label="Login"
          onPress={() => navigation.navigate('Login')}
        />
      </Box>
    </Screen>
    </SafeScreen>
  );
};

export default OnboardingScreen;
