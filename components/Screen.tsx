
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Box,  W, palette} from '../constants/Theme';
export const Screen = ({
    children,
    width = W,
    translucent = true,
    bg = 'primaryWhite',
    bgColor = 'transparent',
    barStyle = 'dark-content',
    ...rest
  }:any) => {
    return (
      <Box
        bg={bg}
        width={width}
        flex={1}
        // paddingTop={'32'}
        {...rest}>
        {/* <TransparentStatusBar
          // translucent={translucent}
          barStyle={barStyle}
          bgColor={bgColor}
        /> */}
        <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
      </Box>
    );
  };
  