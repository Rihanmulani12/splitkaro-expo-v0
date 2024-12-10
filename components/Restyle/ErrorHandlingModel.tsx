import React, { useState, useImperativeHandle } from "react";

import { Flex } from "../Restyle/Flex";
import RnModal from "react-native-modal";

import { Button, JoinButton, OutlineButton } from "../../components/Restyle/Button";
import { Box, Card, Text, W, palette, H } from "../../constants/Theme";

import Svg, { Path } from "react-native-svg";

export const ErrorHandlingModal = React.forwardRef(
  (
    {
      visible,
      onClose,
      onPress,
      title = "Error!",
      description = "Something went wrong. Please try again",
      buttonLabel = "Close",
      feedbackButtonLabel = "Help",
      onFeedbackPress = () => {},
    },
    ref
  ) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    useImperativeHandle(ref, () => ({
      hideModal: () => {
        setIsModalVisible(false);
      },
      showModal: (err) => {
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
        style={{ alignItems: "center" }}
        backdropTransitionInTiming={100}
        onBackdropPress={onPress}
        backdropTransitionOutTiming={200}
        useNativeDriverForBackdrop={true}
        hideModalContentWhileAnimating={true}
      >
        <Box
          p="l"
          width={W * 0.8}
          borderRadius={24}
          bg="primaryWhite"
          alignItems="center"
          onTouchEnd={onPress}
        >
          <Box position="absolute" top={16} right={16}>
            <Svg width={30} height={30} viewBox="0 0 13 13" fill="none">
              <rect
                x="-0.4"
                y="0.4"
                width="12.2"
                height="12.2"
                rx="6.1"
                transform="matrix(-1 0 0 1 12.2 0)"
                fill="#F6F6F6"
                stroke="white"
                stroke-width="0.8"
              />
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.90001 3.89989L9.10001 9.09989L3.90001 3.89989Z"
                fill="#F7F7F7"
              />
              <Path
                d="M3.90001 3.89989L9.10001 9.09989"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.10012 3.8999L3.90012 9.0999L9.10012 3.8999Z"
                fill="#F7F7F7"
              />
              <Path
                d="M9.10012 3.8999L3.90012 9.0999"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </Svg>
          </Box>
          <Text
            fontSize={18}
            lineHeight={20}
            variant="semiBold"
            pb={"m"}
            textAlign="center"
          >
            {title}
          </Text>

          <Text
            fontSize={15}
            lineHeight={18}
            color="primaryRed"
            textAlign="center"
            variant={"semiBold"}
          >
            {!!errMessage ? errMessage : description}
          </Text>
          <Flex mt="xl" justify="space-around" width="100%">
            {onFeedbackPress && (
              <OutlineButton
                mx="xs"
                width={"auto"}
                flex={1}
                height={H * 0.054}
                onPress={onFeedbackPress}
                style={{ elevation: 0 }}
              >
                <Svg width="658" height="702" viewBox="0 0 658 702" fill="none">
                  <Path
                    d="M328.537 0C204.829 0 104.537 100.292 104.537 224V298.667H97.068C43.6827 298.667 0 342.344 0 395.735V455.469C0 508.855 43.6773 552.537 97.068 552.537H171.735C183.464 552.537 194.136 541.866 194.136 530.136V321.069C194.136 309.34 183.464 298.668 171.735 298.668H149.333V224.001C149.333 124.335 228.869 44.8013 328.533 44.8013C428.2 44.8013 507.733 124.337 507.733 224.001V298.668H485.332C471.04 299.413 463.176 311.626 462.931 321.069V530.136C462.931 541.865 473.603 552.537 485.332 552.537H503.999C499.499 566.163 490.728 578.767 476.233 589.871C456.671 604.855 426.369 616.709 383.597 619.272C374.514 597.767 353.149 582.408 328.529 582.408C295.805 582.408 268.795 609.419 268.795 642.143C268.795 674.867 295.805 701.877 328.529 701.877C353.587 701.877 375.264 686.184 384.06 664.075C434.779 661.408 474.836 647.548 503.529 625.575C528.852 606.179 544.639 580.231 550.196 552.544H559.998C613.383 552.544 657.066 508.867 657.066 455.476V395.741C657.066 342.351 613.389 298.673 559.998 298.673H552.529V224.007C552.529 100.299 452.237 0.00666555 328.529 0.00666555L328.537 0Z"
                    fill="black"
                  />
                </Svg>
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
  }
);
