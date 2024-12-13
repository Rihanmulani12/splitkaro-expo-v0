import React, {useState, useEffect, useRef} from 'react';
import {Animated, Image} from 'react-native';

import {Center} from '../Restyle';
import {useNavigation} from '@react-navigation/native';
import {W, Box, Text, BoxPressable} from '../../Constants/Theme/index';
import Svg, {Stop, Defs, Rect, LinearGradient} from 'react-native-svg';



const CAROUSAL_DATA = [
  {
    id: 0,
    text1: 'INTRODUCING',
    text2: 'Shared Wallets for groups',
    text3: 'Easiest way to pool & pay with friends and family',
  },
  {
    id: 1,
    text1: 'WITH SHARED WALLETS',
    text2: 'Give spending power to everyone',
    text3: 'All involved can spend whenever they want, wherever they want.',
  },
  {
    id: 2,
    text1: 'USE SHARED WALLETS',
    text2: 'Quickest way to collect money',
    text3: 'Share link & pool money without an app download',
  },
  {
    id: 3,
    text1: 'WITH SHARED WALLETS',
    text2: 'Setup multiple pools absolutely free',
    text3:
      'Funds for a trip or flatmates, create different pools with zero fees',
  },
];

const SharedWalletEntry = ({visible}) => {
  const navigation = useNavigation();

  let W6 = W * 0.6;
  let containerHeight = 195;
  let flatListRef = useRef();

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const handleScroll = event => {};

  const [momentumEnd, setMomentumEnd] = useState();

  useEffect(() => {
    const noOfData = CAROUSAL_DATA.length;
    let scrolled = Math.round(scrollX?.__getValue() / W6);

    const loop = setInterval(() => {
      scrolled = scrolled + 1;
      if (scrolled < noOfData) {
        scrolled = scrolled;
      } else {
        scrolled = 0;
      }

      if (flatListRef?.current) {
        flatListRef?.current.scrollToOffset({
          animated: true,
          offset: scrolled * W6,
        });
      }
    }, 4000);

    return () => clearInterval(loop);
  }, [momentumEnd]);

  return (
    <BoxPressable my="l" mx="s" onPress={() => {
      analytics.track('Get early access clicked');
      navigation.navigate('EarlyRegisterScreen');
    }}>
      <Box>
        <Svg height={containerHeight} width="100%" position="absolute">
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0.7" y2="1">
              <Stop offset="0" stopColor="#4B55A0" stopOpacity="1" />
              <Stop offset="1" stopColor="#96A0FA" stopOpacity="1" />
            </LinearGradient>
          </Defs>

          <Rect
            x="8"
            y="8"
            width="96%"
            height={containerHeight - 10}
            strokeWidth="4"
            fill={'url(#grad)'}
            rx={12}
            ry={12}
            strokeLinecap="round"
          />
        </Svg>
        <Box flexDirection="row" alignItems="center" px="m">
          <Box
            width={W6}
            alignItems="flex-start">
            <Animated.FlatList
              horizontal
              pagingEnabled
              ref={flatListRef}
              scrollEventThrottle={16}
              data={CAROUSAL_DATA}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollBegin={() => setMomentumEnd(0)}
              onMomentumScrollEnd={() => setMomentumEnd(scrollX)}
              // contentContainerStyle={{paddingRight: W6}}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {
                  useNativeDriver: false,
                  listener: event => handleScroll(event),
                },
              )}
              renderItem={({item, index}) => {
                return (
                  <Box my="s" pl="m" pt="s" width={W6} alignItems="flex-start">
                    <Text
                      pt="s"
                      fontSize={11}
                      color="grey300"
                      variant="medium"
                      allowFontScaling={false}>
                      {item?.text1}
                    </Text>
                    <Text
                      pt="xs"
                      fontSize={20}
                      lineHeight={24}
                      variant="semiBold"
                      color="primaryWhite"
                      allowFontScaling={false}>
                      {item?.text2}
                    </Text>
                    <Text
                      pt="xs"
                      fontSize={12}
                      variant="medium"
                      color="grey500"
                      allowFontScaling={false}>
                      {item?.text3}
                    </Text>
                  </Box>
                );
              }}
            />

            <BoxPressable
              py="s"
              mt="s"
              px="m"
              mx="m"
              borderRadius="m"
              bg="primaryWhite"
              alignItems="center"
              onPress={() => {
                console.log('Get early access clicked');
                navigation.navigate('EarlyRegisterScreen');
              }}>
              <Text
                fontSize={12}
                textAlign="left"
                variant="medium"
                color="primaryBlue">
                Get early access
              </Text>
            </BoxPressable>
          </Box>
          <Center mt="xl" height={110} width={W * 0.3} mr="l" overflow="hidden">
            <Image
              source={require('../../assets/sharedWallet/shared_wallet_entry.png')}
              resizeMode="contain"
              style={{width: 100, height: 100}}
            />
          </Center>
        </Box>
      </Box>
    </BoxPressable>
  );
};

export default SharedWalletEntry;
