import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';

interface LoadingProps {
  height?: string | number;
  dimension?: number;
  type?: 'dots' | 'loading'; // Type to specify the animation type
  style?: StyleProp<ViewStyle>; // Style prop for custom styles
}

const Loading = (props: LoadingProps) => {
  const containerHeight = props.height ?? '90%';
  const dimension = props.dimension ?? 80;

  return (
    <View
    //@ts-ignore
      style={{
        height: containerHeight,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ height: dimension, width: dimension }}>
        {props.type === 'dots' ? (
          <LottieView
            source={require('../lottie/dotsBlue.json')}
            autoPlay
            loop
          />
        ) : (
          <LottieView
            source={require('../lottie/loading.json')}
            autoPlay
            loop
          />
        )}
      </View>
    </View>
  );
};

interface LoadingDotsBlueProps {
  height?: string | number;
  dimension?: number;
  style?: StyleProp<ViewStyle>; // Style prop for custom styles
}

export const LoadingDotsBlue = (props: LoadingDotsBlueProps) => {
  const containerHeight = props.height ?? '90%';
  const dimension = props.dimension ?? 80;

  return (
    <View
      style={{
        height: containerHeight,
        alignItems: 'center',
        justifyContent: 'center',
        //@ts-ignore
        ...props.style, // Spread additional styles
      }}
    >
      <View style={{ height: dimension, width: dimension }}>
        <LottieView
          source={require("../lottie/dotsBlue.json")}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

export default Loading;
