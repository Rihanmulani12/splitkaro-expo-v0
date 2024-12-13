import React, {useState, useEffect, useRef} from 'react';
import {Animated, Image} from 'react-native';

import {W, Box, Text, fonts, BoxPressable} from '../../Constants/Theme/index';
import HomeIcon from '../../assets/svg/HomeSetup/homeIconBig.svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import RightBlueArrow from '../../assets/svg/HomeSetup/rightBlueArrow.svg';
import {homeTypeGroupsAtom} from '../../screens/atom/groupAtom';
import {useAtom} from 'jotai';

import Added from '../../assets/svg/HomeSetup/added2.svg';
import AddButton from '../../assets/svg/HomeSetup/addButton.svg';

import {analytics} from '../../configs/analytics';
import Loading from '../../components/Loading';
import {updateHomeEntryView} from '../../atom/updateHomeEntryView';
import LottieView from 'lottie-react-native';
import getRemoteValues from '../Functions/getRemoteValues';
import {billPaymentListEnabled} from '../../Constants/Data/bbps';
import {getRecurringDataByGroupId} from '../../helperfunctions/Api';

const HomeSetupEntry = props => {
  const navigation = useNavigation();
  const [arrowIndex, setArrowIndex] = useState(0);
  const [homeTypeGroups] = useAtom(homeTypeGroupsAtom);
  const [setUpItems, _setUpItems] = useState(new Map());
  const [group_id, _group_id] = useState('');
  const [updateID, setUpdateID] = useAtom(updateHomeEntryView);

  let W6 = W * 0.6;
  let flatListRef = useRef();

  const home_vendors = getRemoteValues('home_vendors').asString();

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [title, setTitle] = useState('Home');

  const [utilityList, setUtilityList] = useState([
    ...billPaymentListEnabled(JSON.parse(home_vendors), setUpItems),
  ]);

  const reduceList = list => {
    let res = [];

    if (list.length >= 3) {
      res.push(list[0]);
      res.push(list[1]);
      res.push(list[2]);
    } else if (list.length >= 2) {
      res.push(list[0]);
      res.push(list[1]);
    } else {
      res.push(list[0]);
    }
    return res;
  };

  const UtilityListItem = ({name, imageSrc, type}) => {
    return (
      <Box alignItems={'center'} key={type} mr="m">
        <BoxPressable
          onPress={() => {
            navigation.navigate('HomeGroupScreen', {
              redirect: type,
              groupId: group_id,
              homeAnimation: true,
              utilityList: utilityList,
            });
            analytics.track('Your Home Bills Click', {
              type: type,
              groupId: group_id,
            });
          }}
          style={{flexDirection: 'row'}}>
          <Image source={imageSrc} style={{height: 40, width: 40}} />
          {setUpItems.has(type) ? (
            <Added marginLeft={-10} height={10} width={10} />
          ) : (
            <AddButton marginLeft={-15} height={20} width={20} />
          )}
        </BoxPressable>
        <Text
          variant={'medium'}
          fontSize={10}
          textAlign="center"
          pt="5"
          style={{color: 'rgba(73, 86, 158, 0.6)'}}>
          {name}
        </Text>
      </Box>
    );
  };

  const handleScroll = event => {};

  const [momentumEnd, setMomentumEnd] = useState();

  useEffect(() => {
    if (
      homeTypeGroups.state == 'hasData' &&
      homeTypeGroups?.data?.length >= 2
    ) {
      let dataLength = homeTypeGroups?.data?.length;
      let scrolled = Math.round(scrollX?.__getValue() / W6);
      let nextScroll = scrolled;
      if (scrolled >= dataLength) {
        nextScroll = 0;
      }
      setTitle(homeTypeGroups?.data[nextScroll]?.group_name);
      getRecurringData(homeTypeGroups?.data[nextScroll]?._id);
    }
  }, [momentumEnd]);

  const getRecurringData = async group_id => {
    _group_id(group_id);

    try {
    if(group_id!=undefined)
    {
      let res = await getRecurringDataByGroupId({id: group_id});
      if (res.status === 200) {
        let temp = new Map();
        res.data.forEach(el => {
          temp.set(el.type, el);
        });
        _setUpItems(temp);
        setUtilityList([
          ...billPaymentListEnabled(JSON.parse(home_vendors), temp),
        ]);
      } else {
        console.log(
          `error getting recurring expenses for home set up with status code`,
          res.status,
        );
      }
    }
      
    } catch (error) {
      console.log(`error getting recurring expenses for home set up`, error);
    }
  };
  if (updateID !== '') {
    if (group_id == updateID) {
      getRecurringData(group_id);
    }
    setUpdateID('');
  }

  useEffect(() => {
    resetFlatList();
  }, []);

  const resetFlatList = () => {
    if (homeTypeGroups.state == 'hasData' && homeTypeGroups.data.length>0) {
      setTitle(homeTypeGroups?.data[0]?.group_name);
      getRecurringData(homeTypeGroups?.data[0]?._id);
      flatListRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  const onArrowPressed = () => {
    let dataLength = homeTypeGroups?.data?.length;

    let scrolled = Math.round(scrollX?.__getValue() / W6);
    let nextScroll = scrolled + 1;
    if (scrolled >= dataLength) {
      nextScroll = 0;
    }
    flatListRef?.current.scrollToOffset({
      animated: true,
      offset: nextScroll * W6,
    });
    setTitle(homeTypeGroups?.data[nextScroll]?.group_name);
    getRecurringData(homeTypeGroups?.data[nextScroll]?._id);
  };

  return (
    <Box mt="l" mx="m">
      <Box
        style={{
          flex: 1,
          height: 120,
          elevation: 5,
          shadowRadius: 4,
          borderRadius: 20,
          shadowOpacity: 0.2,
          flexDirection: 'row',
          backgroundColor: '#D6DAFD',
          justifyContent: 'space-between',
          shadowOffset: {width: 0, height: 2},
          shadowColor: 'rgba(255,255,255,0.83)',
        }}>
        <BoxPressable
          width={W * 0.3}
          style={{marginTop: -30, marginLeft: 10}}
          onPress={() => {
            if (
              homeTypeGroups.state == 'hasData' &&
              homeTypeGroups?.data?.length != 0
            ) {
              navigation.navigate('HomeGroupScreen', {
                groupId: group_id,
                homeAnimation: true,
                utilityList: utilityList,
              });
            }
          }}>
          <Box alignItems={'center'}>
            <HomeIcon
              style={{
                marginTop:
                  homeTypeGroups.state == 'hasData' &&
                  homeTypeGroups?.data?.length > 0
                    ? 0
                    : 10,
              }}
            />
            <Text
              my={'xs'}
              variant={'bold'}
              numberOfLines={1}
              ellipsizeMode={'tail'}
              allowFontScaling={false}
              color="grey100"
              fontSize={12}>
              {title}
            </Text>
          </Box>
        </BoxPressable>

        {homeTypeGroups.state == 'hasData' &&
        homeTypeGroups?.data?.length == 0 ? (
          <>
            <BoxPressable
              style={{justifyContent: 'center', width: W6, paddingLeft: 5}}
              onPress={() => {
                props.showGroup(0);
                analytics.track('Setup your home banner click', {
                  groupId: group_id,
                });
              }}>
              <Text
                fontFamily={fonts.mRegular}
                fontSize={14}
                pb="5"
                style={{color: '#49569E', marginRight: 10}}>
                Setup your home and live rent-free!
              </Text>
              <Text
                fontFamily={fonts.mRegular}
                fontSize={11}
                lineHeight={11}
                style={{color: 'rgba(73, 86, 158, 0.6)', width: 180}}>
                Set regular spends with your flatmates once & let us take care
                of reminders and payments
              </Text>
            </BoxPressable>
          </>
        ) : (
          <>
            {homeTypeGroups.state == 'loading' ? (
              <Box style={{marginRight: 80}}>
                <Loading type={'dots'} />
              </Box>
            ) : homeTypeGroups.state == 'hasData' ? (
              <Box
                style={{
                  justifyContent: 'center',
                  width: W6,
                }}>
                {
                  <Animated.FlatList
                    horizontal
                    pagingEnabled
                    ref={flatListRef}
                    scrollEventThrottle={16}
                    data={homeTypeGroups?.data}
                    keyExtractor={item => item._id}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollBegin={() => setMomentumEnd(0)}
                    onMomentumScrollEnd={() => setMomentumEnd(scrollX)}
                    contentContainerStyle={{paddingRight: W6}}
                    onEndReached={() => resetFlatList()}
                    onScroll={Animated.event(
                      [{nativeEvent: {contentOffset: {x: scrollX}}}],
                      {
                        useNativeDriver: false,
                        listener: event => handleScroll(event),
                      },
                    )}
                    renderItem={({item, index}) => {
                      return (
                        <BoxPressable
                          onPress={() => {
                            navigation.navigate('HomeGroupScreen', {
                              groupId: item._id,
                              homeAnimation: true,
                              utilityList: utilityList,
                            });
                          }}>
                          <Box
                            my={'s'}
                            width={W6}
                            style={{
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              paddingLeft: 10,
                            }}>
                            <Text
                              py="8"
                              fontSize={13}
                              textAlign={'center'}
                              style={{color: '#49569E'}}
                              fontFamily={fonts.mSemiBold}>
                              {setUpItems.size > 0
                                ? 'Your Home Bills'
                                : 'Setup Your Home Bills'}
                            </Text>
                            <Box
                              alignItem="center"
                              flexDirection="row"
                              width={'80%'}>
                              {utilityList.slice(0, 3).map((utility, index) => {
                                return (
                                  <UtilityListItem
                                    key={utility.name}
                                    {...utility}
                                  />
                                );
                              })}
                            </Box>
                          </Box>
                        </BoxPressable>
                      );
                    }}
                  />
                }
              </Box>
            ) : (
              <></>
            )}
          </>
        )}
        <Box
          style={{
            height: 40,
            width: 40,
            position: 'absolute',
            right: -4.5,
            top: -13,
          }}>
          <LottieView source={require('../../lottie/new.json')} autoPlay loop />
        </Box>
        {homeTypeGroups.state == 'hasData' &&
        homeTypeGroups?.data?.length > 1 ? (
          <Box position="absolute" right={-10} top={50}>
            <RightBlueArrow onPress={onArrowPressed} />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default HomeSetupEntry;
