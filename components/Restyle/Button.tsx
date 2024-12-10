import React from 'react';
import {Pressable, PressableProps} from 'react-native';
import {Text, palette, H, W, Box} from '../../constants/Theme';
import {BackIcon } from '../../assets/icons/index';
import Loading from '../../components/Loading';
import {useNavigation} from '@react-navigation/native';

import {BaseTheme, BoxProps, createBox} from '@shopify/restyle';

export const RestyleButton: React.FC<BoxProps<BaseTheme> & PressableProps> =
  createBox<BaseTheme, PressableProps>(Pressable);

  interface ButtonProps extends BoxProps<BaseTheme>, PressableProps {
    label: string;
    disabled?: boolean;
    isLoading?: boolean;
    shadow?: boolean;
    height?: number;
    bg?: string;
    textColor?: string;
    onPress?: () => void;
    children?: React.ReactNode;
    variant?: 'bold' | 'semiBold' | 'medium';
  }
export const Button:React.FC<ButtonProps> = ({
  label,
  disabled = false,
  isLoading,
  variant = 'bold',
  width = W * 0.8,
  height = H * 0.064,
  bg = 'primaryBlack',
  textColor = 'grey500',
  onPress = () => console.warn('On Button Press'),
  children,
  ...rest
}) => {
  return (
    <RestyleButton
      width={width}
      elevation={5}
      height={height}
      // disabled={disabled}
      shadowRadius={15}
      flexDirection="row"
      alignItems="center"
      shadowOpacity={0.2}
      shadowColor={'grey200'}
      backgroundColor={disabled ? 'grey200' : bg}
      justifyContent="center"
      borderRadius={30} // 'l'
      shadowOffset={{width: 0, height: 2}}
      onPress={() => (disabled || isLoading ? null : onPress())}
      android_ripple={
        disabled
          ? {color: 'transparent', radius: 400}
          : {color: '#FFF6EE', radius: 400}
      }
      {...rest}>
      {isLoading ? (
        <Loading type={'dots'} height={2} width={2} />
      ) : (
        <Text variant={variant} color={textColor} allowFontScaling={false}>
          {label}
        </Text>
      )}
      {children}
    </RestyleButton>
  );
};

interface OutlineButtonProps extends BoxProps<BaseTheme>, PressableProps {
  label: string;
  disabled?: boolean;
  isLoading?: boolean;
  shadow?: boolean;
  height?: number;
  bg?: string;
  textColor?: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

export const OutlineButton: React.FC<OutlineButtonProps> = ({
  //also add BoxProps and PressableProps
  label,
  disabled,
  isLoading,
  shadow = true,
  width = W * 0.8,
  height = H * 0.064,
  bg = 'primaryBlack',
  textColor = 'primaryBlack',
  onPress = () => console.warn('On Button Press'),
  children,
  ...props
}) => {
  return (
    <RestyleButton
      elevation={shadow ? 5 : 0}
      width={width}
      height={height}
      borderWidth={2}
      shadowRadius={shadow ? 15 : 0}
      shadowOpacity={shadow ? 0.2 : 0}
      flexDirection="row"
      alignItems="center"
      shadowColor={'primaryBlack'}
      justifyContent="center"
      borderRadius={30} // 'l'
      shadowOffset={{width: 0, height: 2}}
      backgroundColor={'primaryWhite'}
      onPress={disabled || isLoading ? null : onPress}
      android_ripple={disabled ? {} : {color: '#FFF6EE', radius: 400}}
      {...props}>
      {isLoading ? (
        <Loading type={'dots'} height={2} width={2} />
      ) : (
        <Text variant="bold" color={textColor}>
          {label}
        </Text>
      )}
      {children}
    </RestyleButton>
  );
};

export const ThinOutlineButton = ({
  label,
  borderColor = 'primaryBlue',
  disabled,
  isLoading,
  height = H * 0.045,
  textColor = 'primaryBlue',
  onPress = () => console.warn('On Button Press'),
  ...props
} : any) => {
  return (
    <RestyleButton
      borderWidth={1}
      height={height}
      shadowOpacity={0.2}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      borderRadius={30} // 'l'
      borderColor={borderColor}
      onPress={disabled || isLoading ? null : onPress}
      android_ripple={disabled ? {} : {color: '#FFF6EE', radius: 400}}
      {...props}>
      {isLoading ? (
        <Loading type={'dots'} height={2} width={2} />
      ) : (
        <Text allowFontScaling={false} variant="medium" color={textColor}>
          {label}
        </Text>
      )}
    </RestyleButton>
  );
};

export const IconButton = ({
  label,
  height = H * 0.064,
  textColor = 'primaryBlack',
  onPress = () => console.warn('On Button Press'),
  LeftIcon,
  ...props
} : any) => {
  return (
    <RestyleButton
      height={height}
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      backgroundColor={'primaryWhite'}
      onPress={onPress}
      android_ripple={{color: '#FFF6EE', radius: 300}}
      {...props}>
      {LeftIcon ? (
        <Box mx="s">
          <LeftIcon />
        </Box>
      ) : null}
      <Text variant="semiBold" fontSize={15} color={textColor}>
        {label}
      </Text>
    </RestyleButton>
  );
};

export const HeaderWithBackButton = ({title, onBackPress, ...rest} : any) => {
  const navigation = useNavigation();
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      paddingVertical={'s'}
      {...rest}>
      <BackIcon
        width={28}
        height={28}
        marginHorizontal={10}
        onPress={() => (onBackPress ? onBackPress() : navigation.goBack())}
      />

      <Text
        fontSize={18}
        lineHeight={24}
        variant={'semiBold'}
        paddingVertical={10}
        color={'primaryBlack'}>
        {title}
      </Text>
    </Box>
  );
};

export const Header = ({title, onBackPress, rightElement = null, ...rest} : any) => {
  const navigation = useNavigation();
  return (
    <Box
      px="m"
      bg="primaryWhite"
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      {...rest}>
      <Box flexDirection="row" alignItems="center">
        <BackIcon
          width={28}
          height={28}
          marginRight={8}
          onPress={() => (onBackPress ? onBackPress() : navigation.goBack())}
        />

        <Text
          fontSize={18}
          lineHeight={24}
          variant={'semiBold'}
          paddingVertical={10}
          color={'primaryBlack'}>
          {title}
        </Text>
      </Box>
      {rightElement}
    </Box>
  );
};

export const JoinButton = ({
  onPress = () => {},
  label = 'Join Splitkaro Premium',
  ...rest
}) => {
  return (
    <RestyleButton
      mx="m"
      mt="xl"
      flex={1}
      height={56}
      position="relative"
      onPress={onPress}
      {...rest}>
      <Box height={56} width="100%" bg="yellow" style={{borderRadius: 12}} />
      <Box
        bg="plan"
        borderRadius={10} // "s"
        position="absolute"
        alignItems="center"
        justifyContent="center"
        style={{marginTop: -4, marginLeft: -4}}
        height={56}
        width="100%">
        <Text variant="semiBold" color="yellow">
          {label}
        </Text>
      </Box>
    </RestyleButton>
  );
};
