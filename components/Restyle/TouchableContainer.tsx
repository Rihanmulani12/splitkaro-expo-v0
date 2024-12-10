import {
  Pressable,
  SafeAreaView,
  PressableProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import React from 'react';
import {createBox} from '@shopify/restyle';

import PropTypes from 'prop-types';
const BaseButton : React.FC<BoxProps<BaseTheme> & PressableProps> =
createBox<BaseTheme, PressableProps>(Pressable);

export const TouchableContainer = ({
    bg = 'primaryWhite',
    children,
    onPress,
    ripple = true,
    ...props
  }:any) => {
    return (
      <BaseButton
        onPress={onPress}
        flexDirection="row"
        alignItems="center"
        backgroundColor={bg}
        android_ripple={ripple ? {color: '#FFF6EE', radius: 400} : undefined}
        {...props}>
        {children}
      </BaseButton>
    );
  };
  
  // TouchableContainer.propTypes = {
  //   bg: PropTypes.oneOf(Object.keys(palette)),
  //   textColor: PropTypes.oneOf(Object.keys(palette)),
  // };