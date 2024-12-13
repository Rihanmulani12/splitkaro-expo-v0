import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {Image, Modal, TouchableWithoutFeedback} from 'react-native';

import {Box, Text, W, H} from '../../constants/Theme';
import * as Animatable from 'react-native-animatable';

import {Button, OutlineButton} from '../../components/Restyle/Button';
  //import {navigate} from '../../RootNavigation';

type PropsType = {
  onCreateGroup: (par:any, analyticsTarget:string) => void;
};
const SignUpAddExpenseBottomSheet = forwardRef((props: PropsType, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    hideBottom: () => {
      setIsModalVisible(false);
    },
    showBottom: () => {
      if (isModalVisible) return;
      setIsModalVisible(true);
    },
  }));

  const createGroupHandler = () => {
    setIsModalVisible(false);
    let analyticsTarget = 'create a group clicked newUser';
    setTimeout(() => {
      props?.onCreateGroup(null, analyticsTarget);
    }, 500);
  };

  const onAddExpense = () => {
    setIsModalVisible(false);
    //.track('create an expense clicked new user');
    setTimeout(() => {
     console.log('Expense', {});
    }, 500);
  };

  const RenderContent = () => {
    return (
      <Animatable.View
        style={{
          bottom: 0,
          width: '100%',
          height: H / 2,
          overflow: 'hidden',
          alignItems: 'center',
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        animation={'fadeInUpBig'}
        duration={500}>
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          px="m"
          bg="primaryWhite"
          width="100%">
          <Image
            style={{height: 64, width: 64}}
            source={require('../../assets/SplitkaroLogo.png')}
          />
          <Text
            mt="m"
            mb="m"
            fontSize={24}
            lineHeight={30}
            textAlign="center"
            variant="semiBold"
            color="primaryBlue">
            Welcome to Splitkaro!
          </Text>
          {/* <SplitkaroLogo width={24} height={24} /> */}

          <Box mt="l" alignItems="center" width="100%">
            <OutlineButton
              bg="primaryBlue"
              borderColor={'primaryBlue'}
              textColor={'primaryBlue'}
              height={H * 0.054}
              style={{elevation: 0}}
              onPress={createGroupHandler}
              label={'Create a group'}
            />
            <Text
              my="m"
              fontSize={16}
              color="grey200"
              lineHeight={20}
              variant="semiBold">
              OR
            </Text>

            <Button
              bg="primaryBlue"
              borderRadius={24}
              height={H * 0.054}
              alignItems="center"
              flexDirection={'row'}
              onPress={onAddExpense}
              justifyContent="center"
              label="Create an expense"
            />
            <Text
              mt="m"
              fontSize={16}
              color="grey200"
              variant="medium"
              textAlign="center"
              lineHeight={20}>
              to get started with us!
            </Text>
          </Box>
        </Box>
      </Animatable.View>
    );
  };

  return (
    <>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <Box flex={1} style={{backgroundColor: 'rgba(0,0,0,.5)'}}>
            <RenderContent />
          </Box>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
});

export default SignUpAddExpenseBottomSheet;
