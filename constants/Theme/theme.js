import {createTheme, createText, createBox} from '@shopify/restyle';

import {Pressable} from 'react-native';
import {cardVariants} from './Card';
import {textVariants} from './TextVariants';


export const palette = {
  primaryBlue: '#5563DA', // rgb(85, 99, 218)
  mediumBlue: '#5765DB',
  darkBlue: '#292B55',
  blue200: '#3E4063',
  plan:'#252448',
  primaryWhite: '#ffffff',
  primaryBlack: '#000000',
  grey100: '#4D4D4D',
  grey150: '#666666',
  grey200: '#999999',
  grey300: '#CCCCCC',
  grey400: '#E5E5E5',
  grey500: '#F6F6F6',
  yellow: '#FBB03B',
  lightYellow: '#FCE3C3',
  cream: '#FFF1DE',
  lightPink: '#F08082',
  primaryRed: '#FE6370',
  darkRed: '#EC3232',
  primaryGreen: '#70CF97',
  darkGreen: '#00AD3B',
  lightGreen: '#D4EFE8',
  green500: '#259F4E',
  green700: '#125027',
  green100: '#E9F5ED',
  lightBlue: '#707CE3',
  white: '#ffffff',
  alpha50:'rgba(255, 255, 255, 0.50)',
};

export const textColor = {
  textBlack: '#000000',
  textLightBlue: '#5576DB',
};

export const theme = createTheme({
  colors: {...palette, ...textColor},
  backgroundColor: {...palette},
  textVariants: {...textVariants},
  cardVariants: {...cardVariants},
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 64,
    1: 1,
    2: 2,
    4: 4,
    3: 3,
    5: 5,
    6: 6,
    8: 8,
    10: 10,
    12: 12,
    14: 14,
    15: 15,
    16: 16,
    18: 18,
    20: 20,
    24: 24,
    25: 25,
    30: 30,
    32: 32,
    40: 40,
    50: 50,
  },
  breakpoints: {
    phone: 0,
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: 768,
    largeTablet: 1024,
  },
  borderRadii: {
    s: 10,
    m: 20,
    l: 30,
    xl: 50,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    8: 8,
    10: 10,
    12: 12,
    14: 14,
    16: 16,
    24: 24,
    25: 25,
    30: 30,
    40: 40,
    50: 50,
  },
});

export const darkTheme = createTheme({
  ...theme,
  colors: {...palette},
});

// export type Theme = typeof theme;
export const Text = createText();
// it will use following props from theme => color, opacity, visible, typography, textShadow, spacing, textVariants

export const Box = createBox();
// it will use following props from theme=>  backgroundColor, opacity, visible, layout, spacing, border, shadow, position
export const BoxPressable = createBox(Pressable);
