import React, {
    useCallback,
   
    useRef,
    useImperativeHandle,
    forwardRef,
    useEffect,
    useState,
    
  } from 'react';
  import {
    Box,
    Text,
    
    fonts,
    
    BoxPressable,
  } from '../Constants/Theme';
  import {
    View,
    StyleSheet,
    Image,
    BackHandler,
    Dimensions,
    Platform,
  

  } from 'react-native';
  import {FlatList} from 'react-native-gesture-handler';
  import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetModal
  } from '@gorhom/bottom-sheet';
  import {useNavigation} from '@react-navigation/native';
  import {analytics} from '../configs/analytics';
 
  import {useFocusEffect} from '@react-navigation/native';
  import { Flex} from '../components/Restyle';
  import Popover from 'react-native-popover-view';
 
  import getRemoteValues from '../functions/getRemoteValues';
  import {personalTypeGroupsAtom, useGroup, homePageNotPersonalGroupsAtom} from '../screens/atom/groupAtom';
  import {useAtom} from 'jotai';
  //import ReturnLogo from '../functions/returnLogo';
  import { RFValue} from 'react-native-responsive-fontsize';
  import { useSafeAreaInsets} from 'react-native-safe-area-context';
  import LottieView from 'lottie-react-native';

  import { descriptionAtom, amountAtom,expenseFetchAtom } from '../atom/expenseAtom';

  

import { InfoIcon } from '../assets/Icons';
import { userCurrency } from '../helperFunctions/currencies';
import { AuthContext } from '../contexts/authContext';




  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  const AddExpenseBottomSheet = (props, ref) => {
    const bottomSheetRef = useRef(null);
    const navigation = useNavigation();
    const [maskVisible, setMaskVisible] = useState(false);
    const { state } = React.useContext(AuthContext);
    const userData = JSON.parse(state.userData);
    const country_code=userData.country_code;
    const reduceHeight = country_code=="+91"?0:100

    const handleSheetChanges = index => {
      if (index == -1 && maskVisible) {
        setMaskVisible(false);
      }
    }

    const [expenseFetchData, setFetchedExpenseData] = useAtom(expenseFetchAtom);
    const [descriptionFetched] = useAtom(descriptionAtom);
    const [amountFetched] = useAtom(amountAtom);

    const addType=props.addType?props.addType:"main"
    const sharedData=props?.sharedData

    const insets = useSafeAreaInsets();
    const bottominsets=insets.bottom;

    const [personalTypeGroups] = useAtom(personalTypeGroupsAtom);
    const [homeGroup] = useAtom(homePageNotPersonalGroupsAtom);
    // const initialHeight = 340;
    // const initialHeight = 370-reduceHeight; // suitable for 4 items
    // const initialHeight = 210;// suitable for 2 items
    const initialHeight = 250 // for 3 items
    const [height, setHeight] = useState(Platform.OS=="ios"?initialHeight+bottominsets+50:initialHeight);
    useImperativeHandle(ref, () => ({
      showBottom: () => {
        setMaskVisible(true);
        bottomSheetRef.current.present();
      },
      hideBottom: () => {
          bottomSheetRef.current.close();
          setMaskVisible(false);
      },
    }));
    const snapPoints = [0.1, height];
  
    //group data 
    const group_id = props.group_id;
    const group_name = props.group_name;
    const group_type = props.group_type;
    const userMap = props.userMap;
  
    let userList = props.groupUsers;
    let users = [];
    //phone key should be use instead of phoneNumber
    let usersForGroups=[]
  
    userList && Object.keys(userList).forEach(item => {
      users.push({ _id: item, first_name: userList[item].first_name, last_name: userList[item].last_name, phoneNumber: userList[item].phone })
      usersForGroups.push({ _id: item, first_name: userList[item].first_name, last_name: userList[item].last_name, phone: userList[item].phone })
    })
  



    const instant_group_visible = getRemoteValues(
      'instant_group_visible',
    ).asBoolean();
 
    const group_collection_visible=getRemoteValues('group_collection_visible').asBoolean();


    const instant_home_button_enabled = getRemoteValues(
      'instant_home_button_enabled',
    ).asBoolean();

    const feature_homesetup = getRemoteValues('feature_homesetup').asBoolean();
  
    useEffect(
      () =>
        navigation.addListener('beforeRemove', e => {
          if (maskVisible) {
            e.preventDefault();
            bottomSheetRef.current.close();
            setMaskVisible(false);
          }
        }),
      [navigation, maskVisible],
    );

  
    const renderBackdrop = useCallback(
      props => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={0}
          appearsOnIndex={1}
          snapPoints={snapPoints}
          pressBehavior={'close'}
          onMagicTap={() => {
              bottomSheetRef.current.close();
              setMaskVisible(false);
          }}
        />
      ),
      [],
    );
  
    const BottomSheetBackground = ({style}) => {
      return (
        <View
          style={[
            {
              backgroundColor: 'white',
              borderRadius: 33,
            },
            {...style},
          ]}
        />
      );
    };
  
    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          if (maskVisible) {
            setMaskVisible(false);
            bottomSheetRef.current.close();
            return true;
          } else {
            return false;
          }
        };
  
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }, [maskVisible]),
    );
  
    useEffect(()=>{
      let temp = Platform.OS=="ios"? height:height;
     
      if(!instant_home_button_enabled && haveGroupEntries() && temp == initialHeight ){
        temp = height;
        setHeight(temp);
      } else if(instant_home_button_enabled  && haveGroupEntries() && temp == initialHeight){
        temp = height+100;
        setHeight(temp);
      } else {
        temp = initialHeight;
      }

  

    },[homeGroup, personalTypeGroups]);
    
    const renderGroupItems = ({item}) => {
      return (
        <>
          <BoxPressable
            android_ripple={{color: '#666666', radius: 31}}
            key={item._id}
            style={{marginLeft: 10}}
            onPress={() => {
              analytics.track(`Add Expense ${group_type==='Personal'?'Personal':''} Group Click`);
              navigation.navigate('Expense', {
                group_id: item._id,
                group_name: item.group_name,
                presetUsers: item.users,
                isGroup: true,
                shortcut: true,
                group_type: item.group_type,
                origin: item.group_type == 'Home' ? 'groupHome' : 'group',
                onlineData:props.vendorData,
                paymentData:expenseFetchData?{
                  amount: amountFetched,
                  description: descriptionFetched,
                } :null
              });
              bottomSheetRef.current.close();
              setMaskVisible(false);
            }}>
            <Box style={{flexDirection: 'row', paddingHorizontal:5, paddingVertical:4}}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 60,
                  width: 60,
                  backgroundColor: 'white',
                  borderRadius:100
                }}>
                <ReturnLogo
                  type={item.group_type ? item.group_type : 'group'}
                  height={40}
                  width={40}
                />
                <Box style={{display: 'flex', flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: '#666666',
                      fontSize: RFValue(
                        Platform.OS == 'ios' ? 10 : 10,
                        windowHeight,
                      ),
                      fontFamily: 'Metropolis-Medium',
                    }}>
                    {item.group_name.length > 8 ? item.group_name.substring(0, 8) + ".." : item.group_name.substring(0, 8)}
                  </Text>
                </Box>
              </Box>
            </Box>
          </BoxPressable>
        </>
      );
    };

    const InstantTiles=()=>{
      return(
        <>
         {((instant_group_visible==true&& addType=="group")||(addType!="group"))
          && instant_home_button_enabled
          &&(
            <Box>
              {addType!="group"&&(
            <Box
              mt="15"
              style={{
                borderBottomColor: '#f6f6f6',
                borderBottomWidth: 1,
              }}></Box>)}
           
            <BoxPressable
              mt="15"
              onPress={() => {
                setTimeout(() => {
                  analytics.track("Add Expense Instant Click",{source:addType=="group"?"home":"group"})
                  navigation.navigate('Expense', {instant: true,onlineData:props.vendorData,
                    presetUsers: usersForGroups,origin:addType=="group"?"group":"home",
                    paymentData:expenseFetchData?{
                      amount: amountFetched,
                      description: descriptionFetched,
                    }:null
                });
                  bottomSheetRef.current.close();
                  setMaskVisible(false);
                }, 100);
              }}
              android_ripple={{color: '#49569e', radius: 150}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}>
              <Image
                source={require('../svg/new/addBill1.png')}
                style={{height: 40, width: 40, marginRight: 10}}
              />
              <View>
              <Flex mr='m'  >
                <Text fontFamily={fonts.mMedium} fontSize={14}>
                  Add a Priority Bill, outside groups
                </Text>
              </Flex>
             
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:"flex-start",}}>
              <Text fontFamily={fonts.mMedium} style={{color:"grey", textAlign:'left'}} fontSize={12}>
               {""} {addType=="group"?"Settled outside group     ":"Use it for priority settlement"}
              </Text>
              <Popover
                placement={'top'}
                offset={40}
                popoverStyle={{
                  backgroundColor: '#6270e9',
                  padding: 15,
                  borderRadius: 15,
                  width: 280,
                }}
                from={(sourceRef, showPopover) => (
                  <BoxPressable onPress={showPopover}>
                    <Text
                      style={{borderBottomColor: '#5563da', borderBottomWidth: 0.3, marginBottom:0.3}}
                      color="primaryBlue"
                      fontFamily={fonts.mMedium}
                      fontSize={11}
                      ml="10">
                      know more
                    </Text>
                  </BoxPressable>
                )}>

                <Box>
                  <Text
                    color="primaryWhite"
                    fontFamily={fonts.mMedium}
                    fontSize={11}>
                    Priority bills have a due date & automatic friendly reminders are sent for them.
                  </Text>
                </Box>
              </Popover>
              </View>
              </View>
            </BoxPressable>
            </Box>
            )}
        </>
      )
    }

    const haveGroupEntries = () => { 
      if( // if home group has data
        homeGroup.state == 'hasData' &&
        Array.isArray(homeGroup.data) &&
        homeGroup.data.length > 0
      ){
        return true;
      } else if( // if personal group has data
        personalTypeGroups.state == 'hasData' &&
        Array.isArray(personalTypeGroups.data) &&
        personalTypeGroups.data.length > 0
      ){
        return true;
      }
      return false;
    }

 
  
    return (
      
              <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={1}
        onChange={handleSheetChanges}
        handleComponent={null}
        backdropComponent={renderBackdrop}
        backgroundComponent={props => <BottomSheetBackground {...props} />}>
        <Box flex={1}  style={{flexDirection: 'column', paddingHorizontal: 30}}>
          {!!sharedData && (!descriptionFetched &&
            !amountFetched )?
           
            <Box bg='grey400' flex={1} style={{marginHorizontal: -30, borderTopRightRadius:30,borderTopLeftRadius:30}}><LottieView
              source={require('../lottie/scan.json')}
              autoPlay
              loop
              duration={3000}
            /></Box>
            :
            <Box style={{flexDirection: 'column', justifyContent: 'space-between'}}>
              
            {!!expenseFetchData?
              <Box mt='m' alignItems='center' >
                <Text fontFamily={fonts.mMedium} fontSize={12}>
                  {descriptionFetched}
                </Text>
                <Text  mt='xs' fontFamily={fonts.mMedium} fontSize={12} lineHeight={30} >
                {userCurrency(userData)}<Text fontFamily={fonts.mSemiBold} fontSize={30} lineHeight={36}>
                    {amountFetched}
                  </Text>
                </Text>
                <Box borderBottomWidth={1} borderColor='grey400' width={windowWidth} mt='s' />
              </Box>:
              null}
          
           
           {/* add a member */}
          {addType=="group"&&(
           <BoxPressable
              mt="15"
              onPress={() => {
                setTimeout(() => {
                  bottomSheetRef.current.close();
                  analytics.track('Add a member clicked');
                 props.showAddFriend();

              },100)
              }}
              android_ripple={{color: '#49569e', radius: 150}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <View style={{height:40,width:40,marginRight:12,backgroundColor:"#FFF1DE",borderRadius:25,alignItems:'center',justifyContent:'center'}}>
                <ReturnLogo height={28} width={28} style={{marginTop:2,marginLeft:-2}} type="addmember"></ReturnLogo>
                </View>
            
              <Text fontFamily={fonts.mMedium} fontSize={14}>
                 Add a member
              </Text>
             
            </BoxPressable>
                  )}

             {/* create a collection */}
             {addType=="group" && group_collection_visible&&(
             <Box>
             <Box
              mt="15"
              style={{
                borderBottomColor: '#f6f6f6',
                borderBottomWidth: 1,
              }}></Box>
             
             <BoxPressable
              mt="15"
              onPress={() => {
                setTimeout(() => {
                  analytics.track('Create a collection group clicked');
                  bottomSheetRef.current.close();
                  navigation.navigate('Expense', { group_id: group_id, group_name: group_name, presetUsers: usersForGroups, isGroup: true, isCollection: true, group_type: group_type,
                    origin: props.origin,
                    paymentData:expenseFetchData? {
                      amount: amountFetched,
                      description: descriptionFetched,
                    }:null
                  });
              },100)
              }}
              android_ripple={{color: '#49569e', radius: 150}}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <View style={{height:40,width:40,marginRight:10}}>
              <ReturnLogo height={40} width={40} type="collection"></ReturnLogo>
              </View>
              <Text fontFamily={fonts.mMedium} fontSize={14}>
                Create a collection
              </Text>
              <Popover
                placement={'bottom'}
                popoverStyle={{
                  backgroundColor: '#6270e9',
                  padding: 15,
                  borderRadius: 15,
                  width: 280,
                  alignItems:'center'
                }}
                from={(sourceRef, showPopover) => (
                  <BoxPressable onPress={showPopover}>
                    <Text
                      style={{borderBottomColor: '#5563da', borderBottomWidth: 0.3, marginBottom:0.3}}
                      color="primaryBlue"
                      fontFamily={fonts.mMedium}
                      fontSize={11}
                      ml="10">
                      know more
                    </Text>
                  </BoxPressable>
                )}>
                <Box>
                  <Text
                    color="primaryWhite"
                    fontFamily={fonts.mMedium}
                    fontSize={11}>
                  Add multiple expenses at once.
                  </Text>
                </Box>
              </Popover>
            </BoxPressable>
          
           </Box> )}

            {/* type 1 */}
           

            {/* type 2 */}
        
           
            {addType=="group"&&(
            <Box
              mt="15"
              style={{
                borderBottomColor: '#f6f6f6',
                borderBottomWidth: 1,
              }}></Box>)}
  
            {/* type 3 */}
            {addType=="group"&&(
                 <>
            <BoxPressable
              mt='15'
              android_ripple={{color: '#49569e', radius: 150}}
              onPress={() => {
                setTimeout(() => {
                  bottomSheetRef.current.close();
                  analytics.track(`Add expense ${group_type.toLowerCase()=== 'personal' ? 'Personal' : ''} Group Click`); // personal group
                  navigation.navigate('Expense', { group_id: group_id, group_name: group_name, presetUsers: usersForGroups, isGroup: true, group_type: group_type, origin: props.origin, 
                    paymentData: expenseFetchData?{
                    amount: amountFetched,
                    description: descriptionFetched,
                  } :null});
              },100)

              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../svg/new/addBill2.png')}
                style={{height: 40, width: 40, marginRight: 10}}
              />
              <Text fontFamily={fonts.mMedium} fontSize={14}>
                Add an expense 
              </Text>
            </BoxPressable>
            <Box
              mt="15"
              style={{
                borderBottomColor: '#f6f6f6',
                borderBottomWidth: 1,
              }}></Box>
              </>)}

               {/* Box 4 */}
            {addType!=="group"&&(
            <Box
              mt='15'
              style={{
                flexDirection: 'column',
              }}>
              <BoxPressable
                android_ripple={{color: '#49569e', radius: 150}}
                onPress={() => !haveGroupEntries()?(
                  props.showGroup(null, 'Add expense Create Group Click'),
                  bottomSheetRef.current.close(),
                  setMaskVisible(false)
                  )
                  : // show group creation
                  
                  {}
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Image
                  source={require('../svg/new/addBill3.png')}
                  style={{height: 40, width: 40, marginRight: 10}}
                />
                <Flex flex={1} mr={4}>
                  <Text variant='medium'>
                    {haveGroupEntries()?
                    'Add expense to recent groups':
                    'Create a new group'}
                  </Text>
                </Flex>
                <Popover
                  placement={'top'}
                  popoverStyle={{
                    backgroundColor: '#6270e9',
                    padding: 15,
                    borderRadius: 15,
                    width: 260,
                  }}
                  from={(sourceRef, showPopover) => (
                    <BoxPressable onPress={showPopover}>
                      <InfoIcon />
                    </BoxPressable>
                  )}>
                  <Box>
                    <Text
                      color="primaryWhite"
                      fontFamily={fonts.mMedium}
                      fontSize={11}>
                      {/* Split expenses shared among a group of flatmates or a travel
                      group. */}
                      Manage your groups' & personal expenses in one place
                    </Text>
                  </Box>
                </Popover>
              </BoxPressable>
              {homeGroup.state == 'hasData' &&
                Array.isArray(homeGroup.data) &&
                homeGroup.data.length > 0 && (
                  <Box ml="30" mt='12'>
                    <FlatList
                      nestedScrollEnabled={true}
                      keyboardShouldPersistTaps="handled"
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      maxToRenderPerBatch={5}
                      data={
                        [...homeGroup.data, ...personalTypeGroups.data].sort(
                          (a, b) => {
                            return (
                              new Date(b.updated_time).getTime() -
                              new Date(a.updated_time).getTime()
                            );
                          }
                        ).slice(0, 5)
                      }
                      renderItem={renderGroupItems}
                      keyExtractor={(key, index) => index}
                    />
                  </Box>
                )}
                <Box mt="m" borderBottomWidth={1} borderBottomColor='grey500' />
            </Box>)}
           {/* <PersonalTiles></PersonalTiles> */}

                 {/* Add expense group */}
                 {addType!="group"&&(
                 <>
            <BoxPressable
              mt='15'
              android_ripple={{color: '#49569e', radius: 150, }}
              onPress={() => {
                analytics.track('Add Expense Friend click');
                setTimeout(() => {
                  navigation.navigate('Expense',{onlineData:props.vendorData, paymentData:expenseFetchData?{
                    amount: amountFetched,
                    description: descriptionFetched,
                  }:null});
                  bottomSheetRef.current.close();
                  setMaskVisible(false);
                }, 100);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../svg/new/addBill2.png')}
                style={{height: 40, width: 40, marginRight: 10}}
              />
              <Text variant='medium'>
                Add an expense, outside groups
              </Text>
            </BoxPressable>
              </>)}
            {/* <Hide>
            {!sharedData?
              <PaymentAppFloatingSheet
                onClose={()=>{
                  bottomSheetRef.current.close();
                }}
              />
              :null
            }
            </Hide> */}

            <InstantTiles />
          </Box>}
        </Box>
      </BottomSheetModal>
    

    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });
  
  export default forwardRef(AddExpenseBottomSheet);