import React, {useState, useRef, useEffect, useImperativeHandle} from 'react';
import {
  View,
  Modal,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
} from 'react-native';

import {Center, Flex} from './Flex';
import RnModal from 'react-native-modal';
import {ThemeTextInput} from './TextInput';
import {Button, JoinButton, OutlineButton} from './Buttons';
import {useScratchCardAtom} from '../../atom/useScratchCard';
import {Box, Card, Text, W, palette, H} from '../../constants/Theme';
import {Cross} from '../../assets/icons/index';
import SupportSVG from '../../svg/bills/support.svg';
import SuccessSVG from '../../svg/restyle/success-tick.svg';
import {useNavigation} from '@react-navigation/native';
import {analytics} from '../../configs/analytics';
import LottieView from 'lottie-react-native';


import {useSubscription} from '../../hooks/useSubscription';
import {userCurrency} from '../../helperFunctions/currencies';
import {AuthContext} from '../../contexts/authContext';

export const ModalBottomPopUp = ({visible, onClose, style, children}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={true}
      visible={visible} // required
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{backgroundColor: 'rgba(0,0,0,.6)', ...style}}>
        {children}
      </KeyboardAvoidingView>
    </Modal>
  );
};

export const ModalPopUp = ({
  style,
  visible,
  onClose,
  children,
  onOverlayPress,
}) => {
  if (!visible) return null;
  return (
    <Modal
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={true}
      visible={visible} // required
    >
      <TouchableWithoutFeedback onPress={onOverlayPress ?? onClose}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,.6)',
            ...style,
          }}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export const ConfirmationModal = React.forwardRef(
  (
    {
      title,
      visible,
      onClose,
      description,
      onCancelPress,
      confirmLoading,
      onConfirmPress,
      cancelLabel = 'No',
      confirmLabel = 'Yes',
      onOverlayPress = () => {},
      ...rest
    },
    ref,
  ) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      hideModal: () => {
        setIsModalVisible(false);
      },
      showModal: () => {
        setIsModalVisible(true);
      },
    }));

    return (
      <RnModal
        statusBarTranslucent
        deviceHeight={1200}
        isVisible={visible || isModalVisible}
        animationIn="zoomIn"
        backdropOpacity={0.4}
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={200}
        onBackButtonPress={onClose}
        style={{alignItems: 'center'}}
        backdropTransitionInTiming={100}
        onBackdropPress={onOverlayPress}
        backdropTransitionOutTiming={200}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}
        {...rest}>
        <Box p="l" width={W * 0.8} borderRadius={10} bg="primaryWhite">
          {title && (
            <Text fontSize={18} lineHeight={20} variant={'semiBold'} pb={'m'}>
              {title}
            </Text>
          )}
          <Text lineHeight={18} fontSize={15} variant={'medium'}>
            {description}
          </Text>

          <Flex mt="xl" justify="space-around" width="100%">
            {onCancelPress && (
              <OutlineButton
                width={'45%'}
                height={H * 0.054}
                label={cancelLabel}
                onPress={onCancelPress}
                style={{elevation: 0}}
              />
            )}

            <Button
              height={H * 0.054}
              label={confirmLabel}
              onPress={onConfirmPress}
              isLoading={confirmLoading}
              px={onCancelPress ? 0 : 'xl'}
              width={onCancelPress ? '45%' : 'auto'}
            />
          </Flex>
        </Box>
      </RnModal>
    );
  },
);

export const AddFieldModal = React.forwardRef(
  (
    {
      value,
      title,
      visible,
      onClose,
      setValue,
      fieldText,
      placeholder,
      description,
      onCancelPress,
      confirmLoading,
      onConfirmPress,
      hasError = false,
      cancelLabel = 'No',
      confirmLabel = 'Yes',
      onOverlayPress = () => {},
    },
    ref,
  ) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      hideModal: () => {
        setIsModalVisible(false);
      },
      showModal: () => {
        setIsModalVisible(true);
      },
    }));

    return (
      <RnModal
        isVisible={visible || isModalVisible}
        animationIn="zoomIn"
        backdropOpacity={0.4}
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={200}
        onBackButtonPress={onClose}
        style={{alignItems: 'center'}}
        backdropTransitionInTiming={100}
        onBackdropPress={onOverlayPress}
        backdropTransitionOutTiming={200}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}>
        <Box p="l" width={W * 0.8} borderRadius={10} bg="primaryWhite">
          {title && (
            <Text fontSize={18} lineHeight={20} variant={'semiBold'} pb={'m'}>
              {title}
            </Text>
          )}
          {description && (
            <Text lineHeight={18} fontSize={15} variant={'semiBold'}>
              {description}
            </Text>
          )}
          <ThemeTextInput
            value={value}
            hasError={hasError}
            fieldText={fieldText}
            placeholder={placeholder}
            onChangeText={text => setValue(text)}
          />
          <Flex mt="xl" justify="space-around" width="100%">
            {onCancelPress && (
              <OutlineButton
                width={'45%'}
                height={H * 0.054}
                label={cancelLabel}
                onPress={onCancelPress}
                style={{elevation: 0}}
              />
            )}

            <Button
              height={H * 0.054}
              label={confirmLabel}
              onPress={onConfirmPress}
              isLoading={confirmLoading}
              px={onCancelPress ? 0 : 'xl'}
              width={onCancelPress ? '45%' : 'auto'}
            />
          </Flex>
        </Box>
      </RnModal>
    );
  },
);

export const ScratchCardCongratulationsModal = React.forwardRef(
  ({visible, onClose, onPress}, ref) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [scratchCards, updateScratchCards] = useScratchCardAtom();

    useImperativeHandle(ref, () => ({
      hideModal: () => {
        setIsModalVisible(false);
      },
      showModal: () => {
        setIsModalVisible(true);
      },
    }));

    useEffect(() => {
      updateScratchCards();
    }, []);

    return (
      <RnModal
        isVisible={visible || isModalVisible}
        animationIn="zoomIn"
        backdropOpacity={0.4}
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={200}
        onBackButtonPress={onClose}
        style={{alignItems: 'center'}}
        backdropTransitionInTiming={100}
        onBackdropPress={onPress}
        backdropTransitionOutTiming={200}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}>
        <Box
          p="l"
          width={W * 0.8}
          borderRadius={24}
          bg="primaryWhite"
          onTouchEnd={onPress}>
          <Box alignItems="center" py="m">
            <Image
              style={{height: 100, width: 100}}
              source={require('../../assets/award_image.png')}
            />
          </Box>
          <Box position="absolute" top={16} right={16}>
            <Cross width={30} height={30} />
          </Box>
          <Text
            fontSize={18}
            lineHeight={20}
            variant={'semiBold'}
            pb={'m'}
            textAlign="center">
            Congratulations!
          </Text>

          <Text
            fontSize={15}
            lineHeight={18}
            color="grey100"
            textAlign="center"
            variant={'semiBold'}>
            You{' '}
            <Text
              lineHeight={18}
              fontSize={15}
              variant={'medium'}
              color="grey100">
              have won a{' '}
              <Text
                lineHeight={18}
                fontSize={15}
                variant={'medium'}
                style={{color: '#A437FB'}}>
                scratch card{' '}
              </Text>
              for signing up using a referral code.
            </Text>
          </Text>
        </Box>
      </RnModal>
    );
  },
);

export const FullScreenModal = ({
  style,
  animationType = 'fade',
  visible,
  onClose,
  children,
}) => {
  if (!visible) return null;
  return (
    <Modal
      transparent={true}
      animationType={animationType}
      onRequestClose={onClose}
      statusBarTranslucent={true}
      visible={visible} // required
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          ...style,
        }}>
        {children}
      </View>
    </Modal>
  );
};

export const ErrorHandlingModal = React.forwardRef(
  (
    {
      visible,
      onClose,
      onPress,
      title = 'Error!',
      description = 'Something went wrong. Please try again',
      buttonLabel = 'Close',
      feedbackButtonLabel = 'Help',
      onFeedbackPress = () => {},
    },
    ref,
  ) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    useImperativeHandle(ref, () => ({
      hideModal: () => {
        setIsModalVisible(false);
      },
      showModal: err => {
        setIsModalVisible(true);
        setErrMessage(err);
      },
    }));

    return (
      <RnModal
        isVisible={visible || isModalVisible}
        animationIn="zoomIn"
        backdropOpacity={0.4}
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={200}
        onBackButtonPress={onClose}
        style={{alignItems: 'center'}}
        backdropTransitionInTiming={100}
        onBackdropPress={onPress}
        backdropTransitionOutTiming={200}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}>
        <Box
          p="l"
          width={W * 0.8}
          borderRadius={24}
          bg="primaryWhite"
          alignItems="center"
          onTouchEnd={onPress}>
          <Box position="absolute" top={16} right={16}>
            <Cross width={30} height={30} />
          </Box>
          <Text
            fontSize={18}
            lineHeight={20}
            variant="semiBold"
            pb={'m'}
            textAlign="center">
            {title}
          </Text>

          <Text
            fontSize={15}
            lineHeight={18}
            color="primaryRed"
            textAlign="center"
            variant={'semiBold'}>
            {!!errMessage ? errMessage : description}
          </Text>
          <Flex mt="xl" justify="space-around" width="100%">
            {onFeedbackPress && (
              <OutlineButton
                mx="xs"
                width={'auto'}
                flex={1}
                height={H * 0.054}
                onPress={onFeedbackPress}
                style={{elevation: 0}}>
                <SupportSVG width={16} height={16} marginRight={4} />
                <Text variant="bold">{feedbackButtonLabel}</Text>
              </OutlineButton>
            )}
            <Button
              mx="xs"
              flex={1}
              width="auto"
              maxWidth="55%"
              height={H * 0.054}
              label={buttonLabel}
              onPress={onClose}
            />
          </Flex>
        </Box>
      </RnModal>
    );
  },
);

export const AddPersonalCategoryModal = React.forwardRef(
  (
    {
      value,
      title,
      visible,
      onClose,
      setValue,
      description,
      onCancelPress,
      confirmLoading,
      onConfirmPress,
      cancelLabel = 'No',
      confirmLabel = 'Yes',
      onOverlayPress = () => {},
    },
    ref,
  ) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      hideModal: () => {
        setIsModalVisible(false);
      },
      showModal: () => {
        setIsModalVisible(true);
      },
    }));

    return (
      <RnModal
        isVisible={visible || isModalVisible}
        animationIn="zoomIn"
        backdropOpacity={0.4}
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={200}
        onBackButtonPress={onClose}
        style={{alignItems: 'center'}}
        backdropTransitionInTiming={100}
        onBackdropPress={onOverlayPress}
        backdropTransitionOutTiming={200}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}>
        <Box p="l" width={W * 0.8} borderRadius={10} bg="primaryWhite">
          {title && (
            <Text fontSize={18} lineHeight={20} variant={'semiBold'} pb={'m'}>
              {title}
            </Text>
          )}
          <Text lineHeight={18} fontSize={15} variant={'semiBold'}>
            {description}
          </Text>
          <ThemeTextInput
            fieldText="Category name"
            placeholder="Enter a name for category"
            value={value}
            onChangeText={text => setValue(text)}
          />
          <Flex mt="xl" justify="space-around" width="100%">
            {onCancelPress && (
              <OutlineButton
                width={'45%'}
                height={H * 0.054}
                label={cancelLabel}
                onPress={onCancelPress}
                style={{elevation: 0}}
              />
            )}

            <Button
              height={H * 0.054}
              label={confirmLabel}
              onPress={onConfirmPress}
              isLoading={confirmLoading}
              px={onCancelPress ? 0 : 'xl'}
              width={onCancelPress ? '45%' : 'auto'}
            />
          </Flex>
        </Box>
      </RnModal>
    );
  },
);

export const ImageViewerModal = React.forwardRef(
  ({visible, onClose, onPress, children}, ref) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      hideModal: () => setIsModalVisible(false),
      showModal: () => setIsModalVisible(true),
    }));

    return (
      <RnModal
        isVisible={visible || isModalVisible}
        animationIn="slideInUp"
        backdropOpacity={0.4}
        animationOut="slideOutDown"
        animationInTiming={100}
        animationOutTiming={200}
        onBackButtonPress={onClose}
        style={{alignItems: 'center'}}
        backdropTransitionInTiming={100}
        onBackdropPress={onPress}
        backdropTransitionOutTiming={200}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}>
        <SafeAreaView style={{flex: 1}}>
          <Box p="l" width={W} height={H} borderRadius={24} bg="primaryWhite">
            {children}
          </Box>
        </SafeAreaView>
      </RnModal>
    );
  },
);

export const AlertModal = React.forwardRef(
  (
    {
      type = 'info', //'info', 'success', 'warning', 'error'
      title,
      visible,
      onClose,
      onPress,
      buttonLabel = 'Okay',
      onSupportPress,
      leftButtonLabel,
      rightButtonLabel,
      hasSupportButton,
      onLeftButtonPress,
      onRightButtonPress,
      supportButtonLabel = 'Help',
      leftButtonComponent,
      rightButtonComponent,
    },
    ref,
  ) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState(type);

    useImperativeHandle(ref, () => ({
      hideModal: () => {
        setIsModalVisible(false);
      },
      showModal: arg => {
        setIsModalVisible(true);
        setMessage(arg?.message);
        setAlertType(arg?.type);
      },
    }));

    const returnColor = () => {
      switch (alertType) {
        case 'info':
        case 'warning':
          return 'yellow';
        case 'success':
          return 'green500';
        case 'error':
          return 'primaryRed';
        default:
          return 'primaryBlack';
      }
    };

    return (
      <RnModal
        isVisible={visible || isModalVisible}
        animationIn="zoomIn"
        backdropOpacity={0.4}
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={200}
        onBackButtonPress={onClose}
        style={{alignItems: 'center'}}
        backdropTransitionInTiming={100}
        onBackdropPress={onPress}
        backdropTransitionOutTiming={200}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}>
        <Box
          p="l"
          width={W * 0.8}
          borderRadius={24}
          bg="primaryWhite"
          alignItems="center"
          onTouchEnd={onPress}>
          <Box position="absolute" top={16} right={16}>
            <Cross width={30} height={30} />
          </Box>
          <Text
            fontSize={16}
            lineHeight={18}
            variant="semiBold"
            pb={'m'}
            textAlign="center"
            textTransform="capitalize">
            {title ?? alertType}
          </Text>

          <Text
            fontSize={14}
            lineHeight={18}
            color={returnColor()}
            textAlign="center"
            variant={'semiBold'}>
            {message}
          </Text>
          <Flex mt="xl" justify="space-around" width="100%">
            {(hasSupportButton || onLeftButtonPress) && (
              <OutlineButton
                mx="xs"
                width={'auto'}
                flex={1}
                height={H * 0.054}
                onPress={() =>
                  onSupportPress ? onSupportPress() : onLeftButtonPress()
                }
                style={{elevation: 0}}
                label={leftButtonLabel}>
                {leftButtonComponent}
                {hasSupportButton && (
                  <>
                    <SupportSVG width={16} height={16} marginRight={4} />
                    <Text variant="bold">{supportButtonLabel}</Text>
                  </>
                )}
              </OutlineButton>
            )}
            <Button
              mx="xs"
              flex={1}
              width="auto"
              maxWidth="55%"
              height={H * 0.054}
              label={rightButtonLabel ?? buttonLabel}
              onPress={() => (onPress ? onPress() : onRightButtonPress())}>
              {rightButtonComponent}
            </Button>
          </Flex>
        </Box>
      </RnModal>
    );
  },
);

export const SuccessModal = React.forwardRef(
  ({title, visible, onClose, onPress}, ref) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      hideModal: () => setIsModalVisible(false),
      showModal: () => setIsModalVisible(true),
    }));

    return (
      <RnModal
        isVisible={visible || isModalVisible}
        animationIn="zoomIn"
        backdropOpacity={0.4}
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={200}
        onBackButtonPress={onClose}
        style={{alignItems: 'center'}}
        backdropTransitionInTiming={100}
        onBackdropPress={onPress}
        backdropTransitionOutTiming={200}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}>
        <Box
          p="l"
          width={W * 0.8}
          borderRadius={24}
          bg="primaryWhite"
          alignItems="center">
          <Box position="absolute" top={16} right={16}>
            <Cross onPress={onPress} width={30} height={30} />
          </Box>
          <Text
            fontSize={16}
            lineHeight={18}
            variant="semiBold"
            pb={'m'}
            color="green500"
            textAlign="center"
            textTransform="capitalize">
            {title}
          </Text>

          <SuccessSVG />
        </Box>
      </RnModal>
    );
  },
);

export const PremiumControlModal = React.forwardRef(
  (
    {
      title,
      visible,
      onClose,
      description,
      source,
      buttonLabel = 'Join Splitkaro Premium',
      onOverlayPress = () => {},
    },
    ref,
  ) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState(description);
    const navigation = useNavigation();
    useImperativeHandle(ref, () => ({
      hideModal: () => {
        setIsModalVisible(false);
      },
      showModal: () => {
        setIsModalVisible(true);
      },
      setMessage: msg => {
        setMessage(msg);
      },
    }));

    const hide = () => setIsModalVisible(false);

    return (
      <RnModal
        isVisible={visible || isModalVisible}
        animationIn="zoomIn"
        backdropOpacity={0.4}
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={200}
        onBackButtonPress={onClose}
        style={{alignItems: 'center'}}
        backdropTransitionInTiming={100}
        onBackdropPress={onOverlayPress}
        backdropTransitionOutTiming={200}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}>
        <Box p="l" width={W * 0.8} borderRadius={10} bg="primaryWhite">
          {title && (
            <Text fontSize={18} lineHeight={20} variant={'semiBold'} pb={'m'}>
              {title}
            </Text>
          )}
          <Text lineHeight={18} fontSize={15} variant={'regular'}>
            {message}
          </Text>

          <Flex width="100%">
            <JoinButton
              label={buttonLabel}
              onPress={() => {
                hide();
                setTimeout(() => {
                  navigation.navigate('PremiumScreen', {hasPlanShown: true});
                  analytics.track('Join Premium Membership clicked', {
                    from: source,
                  });
                }, 300);
              }}
            />
          </Flex>
        </Box>
      </RnModal>
    );
  },
);

export const PremiumControlUpiScanModal = React.forwardRef(
  (
    {
      title,
      visible,
      onClose,
      description,
      source,
      callback = () => {},
      amountFetched,
      expenseFetchData,
      descriptionFetched,
      onOverlayPress = () => {},
    },
    ref,
  ) => {
    const {
      isUserSubscribed,
      subscriptionEndDate,
      checkUserAlreadySubscribed: checkSubscription,
    } = useSubscription();

    const {state} = React.useContext(AuthContext);
    const userData = JSON.parse(state.userData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState(description);
    const [buttonLabel, setButtonLabel] = useState('Go Premium');

    const navigation = useNavigation();
    useImperativeHandle(ref, () => ({
      hideModal: () => {
        setIsModalVisible(false);
      },
      showModal: () => {
        setIsModalVisible(true);
      },
      setMessage: msg => {
        setMessage(msg);
      },
      setButtonText: label => {
        setButtonLabel(label);
      },
    }));

    const hide = () => setIsModalVisible(false);

    return (
      <RnModal
        statusBarTranslucent
        deviceHeight={1200}
        isVisible={visible || isModalVisible}
        animationIn="zoomIn"
        backdropOpacity={0.4}
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={200}
        onBackButtonPress={onClose}
        style={{alignItems: 'center'}}
        backdropTransitionInTiming={100}
        onBackdropPress={onOverlayPress}
        backdropTransitionOutTiming={200}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}>
        <Box p="l" width={W * 0.8} borderRadius={10} bg="grey400">
          {title && (
            <Text
              textAlign="center"
              fontSize={18}
              lineHeight={20}
              variant={'semiBold'}
              pb={'m'}>
              {title}
            </Text>
          )}

          {expenseFetchData ? (
            <Box
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Box mt="m" alignItems="center">
                <Text variant="medium" fontSize={12}>
                  {descriptionFetched}
                </Text>
                <Text mt="xs" variant="medium" fontSize={12} lineHeight={30}>
                  {userCurrency(userData)}{' '}
                  <Text variant="semiBold" fontSize={30} lineHeight={36}>
                    {amountFetched}
                  </Text>
                </Text>
              </Box>
            </Box>
          ) : isUserSubscribed ? (
            <Box alignItems="center">
              <LottieView
                source={require('../../lottie/scan.json')}
                autoPlay
                loop
                duration={2000}
                style={{height: 250, width: '100%'}}
              />
            </Box>
          ) : null}

          <Text
            mt="l"
            textAlign="center"
            lineHeight={18}
            fontSize={15}
            variant={'regular'}>
            {message}
          </Text>

          <Flex width="100%">
            <JoinButton
              mt={'m'}
              label={buttonLabel}
              onPress={() => {
                hide();
                callback();
                setTimeout(() => {
                  navigation.navigate('PremiumScreen', {hasPlanShown: true});
                  analytics.track('Join Premium Membership clicked', {
                    from: source,
                    buttonText: buttonLabel,
                  });
                }, 300);
              }}
            />
          </Flex>
        </Box>
      </RnModal>
    );
  },
);

export const AdminControlModal = React.forwardRef(
  ({title, visible, onClose, description, onOverlayPress = () => {}}, ref) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState(description);

    useImperativeHandle(ref, () => ({
      hideModal: () => {
        setIsModalVisible(false);
      },
      showModal: () => {
        setIsModalVisible(true);
      },
      setMessage: msg => {
        setMessage(msg);
        analytics.track('Admin Control Modal shown', {reason: msg});
      },
    }));

    const hide = () => setIsModalVisible(false);

    return (
      <RnModal
        isVisible={visible || isModalVisible}
        animationIn="zoomIn"
        backdropOpacity={0.4}
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={200}
        onBackButtonPress={onClose}
        style={{alignItems: 'center'}}
        backdropTransitionInTiming={100}
        onBackdropPress={onOverlayPress}
        backdropTransitionOutTiming={200}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}>
        <Box p="l" width={W * 0.8} borderRadius={10} bg="primaryWhite">
          {title && (
            <Text fontSize={18} lineHeight={20} variant={'semiBold'} pb={'m'}>
              {title}
            </Text>
          )}
          <Text lineHeight={18} fontSize={15} variant={'regular'}>
            {message}
          </Text>

          <Flex width="100%" alignItems="center" justify="center" mt="m">
            <OutlineButton
              width={'45%'}
              height={H * 0.054}
              label={'Okay'}
              onPress={() => hide()}
              style={{elevation: 0}}
            />
          </Flex>
        </Box>
      </RnModal>
    );
  },
);

export const ExpenseCreatorControlModal = React.forwardRef(
  ({title, visible, onClose, description, onOverlayPress = () => {}}, ref) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState(description);

    useImperativeHandle(ref, () => ({
      hideModal: () => {
        setIsModalVisible(false);
      },
      showModal: () => {
        setIsModalVisible(true);
      },
      setMessage: msg => {
        setMessage(msg);
        // analytics.track('Expense Creator Control Modal shown', {reason: msg});
      },
    }));

    const hide = () => setIsModalVisible(false);

    return (
      <RnModal
        isVisible={visible || isModalVisible}
        animationIn="zoomIn"
        backdropOpacity={0.4}
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={200}
        onBackButtonPress={onClose}
        style={{alignItems: 'center'}}
        backdropTransitionInTiming={100}
        onBackdropPress={onOverlayPress}
        backdropTransitionOutTiming={200}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}>
        <Box p="l" width={W * 0.8} borderRadius={10} bg="primaryWhite">
          {title && (
            <Text fontSize={18} lineHeight={20} variant={'semiBold'} pb={'m'}>
              {title}
            </Text>
          )}
          <Text lineHeight={18} fontSize={15} variant={'regular'}>
            {message}
          </Text>

          <Flex width="100%" alignItems="center" justify="center" mt="m">
            <OutlineButton
              width={'45%'}
              height={H * 0.054}
              label={'Okay'}
              onPress={() => hide()}
              style={{elevation: 0}}
            />
          </Flex>
        </Box>
      </RnModal>
    );
  },
);
