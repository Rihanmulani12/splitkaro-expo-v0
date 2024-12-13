import React, {useEffect, useState} from 'react';
import {TextInput, Pressable, Platform} from 'react-native';

import {color, createBox} from '@shopify/restyle';



import Svg , {Path} from 'react-native-svg';

const BaseButton = createBox(Pressable);
export const TextInputBox = createBox(TextInput);

export const RestyleTextInput = ({
  value,
  color = palette.grey100,
  onBlur,
  onFocus,
  hasError,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocusHandle = () => setIsFocused(true);
  const onBlurHandle = () => setIsFocused(false);
  return (
    <TextInputBox
      width={'100%'}
      value={value}
      style={{color}}
      paddingVertical={Platform.OS ? 'm' : null}
      onBlur={(onBlur, onBlurHandle)}
      onFocus={(onFocus, onFocusHandle)}
      placeholderTextColor={palette.grey300}
      fontFamily={value ? font.mSemiBold : font.mMedium}
      borderBottomWidth={isFocused || hasError ? 1.5 : 1}
      borderColor={
        isFocused ? 'primaryBlue' : hasError ? 'primaryRed' : 'grey100'
      }
      {...rest}
    />
  );
};

export const ThemeTextInput = ({
  mt,
  onBlur,
  onFocus,
  hasError,
  fieldText,
  ...rest
}) => {
  return (
    <Box mt={mt ?? 's'} justifyContent="space-between">
      {fieldText && <Text variant="fieldText">{fieldText}</Text>}
      <RestyleTextInput
        onBlur={onBlur}
        onFocus={onFocus}
        hasError={hasError}
        {...rest}
      />
    </Box>
  );
};

export const SearchInput = ({
  mt,
  onBlur,
  height = H * 0.064,
  onFocus,
  hasError,
  fieldText,
  leftIcon,
  ...rest
}) => {
  return (
    <Box
      height={height}
      mt={mt ?? 's'}
      borderWidth={1}
      borderRadius={30}
      alignItems="center"
      overflow="hidden"
      flexDirection="row">
      {leftIcon}
      <TextInputBox
        onBlur={onBlur}
        onFocus={onFocus}
        hasError={hasError}
        {...rest}
      />
    </Box>
  );
};

export const DropDownInput = ({
  fieldText,
  onPress,
  hasError,
  value,
  ...rest
}) => {
  return (
    <Box
      marginTop={'s'}
      height={W * 0.2}
      overflow={'hidden'}
      justifyContent={'center'}>
      {fieldText && <Text variant="fieldText">{fieldText}</Text>}

      <Pressable onPress={onPress}>
        <BaseButton
          onPress={onPress}
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between">
          {/* <RestyleTextInput paddingHorizontal={'m'} editable={false} {...rest} /> */}
          <Box
            justifyContent={'center'}
            paddingHorizontal={'m'}
            height={50}
            borderBottomWidth={2}
            borderColor={'grey200'}
            flex={1}>
            <Text fontFamily={font.mBold} style={{color: palette.grey300}}>
              {value.length > 0 ? value : 'Select Name'}
            </Text>
          </Box>
          <Svg  style={{ position: 'absolute' , right: 16 , height: 10 , width: 10}} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M0.893939 0L0 0.915167L5 6L10 0.910026L9.10606 0L5 4.17995L0.893939 0Z" fill="black" fill-opacity="0.54"/>
</Svg>
          <ChevronDown position="absolute" right={16} height={16} width={16} />
        </BaseButton>
      </Pressable>
    </Box>
  );
};

export const CheckBox = ({isSelected, onSelect}) => {
  return (
    <BoxPressable onPress={onSelect}>
      {isSelected ? (
        
        <Svg style={{marginRight: 10}} height={'20'} width={'20'}  viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="1" width="15" height="15" rx="2.5" fill="#5563DA" stroke="#5563DA"/>
        <Path d="M12.5 5.5L6.5 12L4 8.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
      ) : (
        <Box
          style={{
            width: 20,
            height: 20,
            borderWidth: 2,
            borderRadius: 5,
            marginRight: 10,
            alignItems: 'center',
            borderColor: '#5563DA',
            justifyContent: 'center',
          }}
        />
      )}
    </BoxPressable>
  );
};
