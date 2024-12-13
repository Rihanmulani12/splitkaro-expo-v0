import { View, Text } from 'react-native'
import React from 'react'

const home = () => {
  return (
    <View style={{flex:1 , backgroundColor : "white"} }>
      <Text>home</Text>
    </View>
  )
}

export default home

// import React, { useEffect, useState, useRef, useContext } from 'react';
// import { Alert,StyleSheet, Platform, View, Text, Button, Pressable,Animated, Image, Dimensions, RefreshControl, ScrollView,Linking} from 'react-native';
// // import { AuthContext } from "./contexts/authContext";
// import Plus from "../../assets/svg/general/plus2.svg"


// //import { registerToken } from "./functions/registerToken";

// import CreateGroup from "../../components/createGroup";
// import RecentGroups from "../../components/recentGroup";
// import RecentInstant from "../../components/RecentInstant"

// import DisplayCards from "../../components/displayCards";
// import HomeBalance from "../../components/homebalance";
// import { useIsFocused } from '@react-navigation/native';
// import { useAtom } from 'jotai';
// //import { descriptionAtom, amountAtom,expenseFetchAtom,expenseFetchProcessAtom } from './atom/expenseAtom';


// import Modal from 'react-native-modal';

// //import codePush from "react-native-code-push";

// import Profile from "../../assets/svg/new/profile.svg";
// import Wallet from "../../assets/svg/general/walletwhite.svg";
// //import {analytics} from "./configs/analytics"
// //import {MarkedActsContext} from "./contexts/markedActsContext";
// //import AsyncStorage from '@react-native-async-storage/async-storage';
// //import { WalletContext } from './contexts/walletContext';
// import getRemoteValues from "../../components/Functions/getRemoteValues";
// // import { getBuildNumber,getVersion} from 'react-native-device-info';

// import * as Application from 'expo-application';
// // import compareVersions from 'compare-versions';

//  //import useIsInternet from './hooks/useIsInternet';
// import Toast from 'react-native-toast-message';
// //import ShareMenu from 'react-native-share-menu'; // iOS implementation left  https://github.com/meedan/react-native-share-menu

// import {NewBanner }from '../../components/home/newBanner';
// import {  PremiumControlUpiScanModal, ScratchCardCongratulationsModal } from '../../components/Restyle/Modals';
// import { HomeSetupEntry } from '../../components/Homesetup/HomeSetupEntry';

// import EventEntry from '../../components/experiences/EventEntry';
// import AddExpenseBottomSheet from '../../components/AddExpenseBottomSheet';
// //import {ToggleTabContext} from './contexts/toggleTabContext';
// import PlusButton from '@/components/reuseableComponents/PlusButton';
// import SharedWalletEntry from '@/components/SharedWallet/SharedWalletEntry';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// //import { BannerAd, BannerAdSize,TestIds } from 'react-native-google-mobile-ads';
// import { useSubscription } from '@/hooks/useSubscription';
// import moment from 'moment';
// import { palette } from '@/constants/Theme';
// import { PermissionsAndroid } from 'react-native';
// //import { PremiumScreen } from './screens/Premium';

// //import { addExpenseFocusedAtom } from './atom/addExpenseFocusedAtom';

// import ActivityButton from '@/components/home/activitybutton';
// import SafeScreen from '@/components/SafeScreen';
// // import Hide from '@/components/reuseableComponents/'
// import {SignUpAddExpenseBottomSheet} from '@/components/home/SignUpAddExpenseBottomSheet';
// // import { usePurposeAtom } from './atom/userProfile';
// // import { useSplitkaroCashAtom } from './atom/useScratchCard';


// const appVersion = Application.nativeApplicationVersion;

// // Get the build number of the app
// const appBuildNumber = Application.nativeBuildVersion;

// const wait = (timeout) => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// }

// const Home = ({ navigation, route}) => {
 
  
//   inAppNotificationStart();
//   const toRefresh=useIsBackgroundedForLong();
//   const windowWidth = Dimensions.get('window').width;
//   const [sharedData, setSharedData] = useState(null);
//   const menuRef = useRef(null);
//   const firstTimeUserRef = useRef();
//   const [showMenu, setShowMenu] = useState(true);
//   const {toggleTab} = useContext(ToggleTabContext);
//   const insets = useSafeAreaInsets();
//   const bottominsets=insets.bottom;
//   const [descriptionFetched,setDescription] = useAtom(descriptionAtom);
//   const [amountFetched,setAmount] = useAtom(amountAtom);
//   const [expenseFetchData,setFetchedExpenseData] = useAtom(expenseFetchAtom);
//   const [expenseFetchProcess,setExpenseFetchProcess] = useAtom(expenseFetchProcessAtom);
//   const adUnitId = __DEV__? TestIds.BANNER : 'ca-app-pub-2974790936901607/2722521515';
//   const [splitkaroCash, updateSplitkaroCash] = useSplitkaroCashAtom();

//   const handleShare = React.useCallback(data => {
//     if (!data) return null;
//     if(data!=null)
//     {
//       if(Platform.OS=="ios")
//       {if(data && data.data!=null)
//         {
//           setSharedData(data.data[0]);
//         }
        
//       }else{
//         setSharedData(data);
//       }
     
//     }
    
     

//   }, []);

//   // useEffect(() => {
//   //   ShareMenu.getInitialShare(handleShare); // if app is launched from share modal
//   //   const listener = ShareMenu.addNewShareListener(handleShare); // Subscribe // if app is already running

//   //   return () => listener.remove(); // Unsubscribe
//   // }, []);

//   const [userPurpose, setUserPurpose] = usePurposeAtom();
//   // added for refer and earn
//   useEffect(() => {
//     if (
//       userPurpose?.data?.isOpenFirstTime &&
//       (userPurpose?.data?.id === 2)
//     ) {
//       showGroup();
//       setUserPurpose({isOpenFirstTime:false});
//     } else if ( userPurpose?.data?.isOpenFirstTime && userPurpose?.data?.id === 1) {
//        setTimeout(()=>{navigation.navigate("Groups")},500) 
//         setUserPurpose({isOpenFirstTime:false});
//     } else if (userPurpose?.data?.isOpenFirstTime && userPurpose?.data?.id === 5 && userData?.invited_by) {
//       scratchCardRef.current.showModal();
//       setUserPurpose({id: 0, isOpenFirstTime:false});
//     }
//   }, [userPurpose]);

//   useEffect(() => {

//     const getSharedData = async () => {

//       if (sharedData && sharedData.data && sharedData.data.length != 0) {
//         // Log('sharedData', sharedData);
//         setAmount(0);
//         setDescription('');
//         // console.log(sharedData);
//         // const result = await TextRecognition.recognize(sharedData.data);
//         // console.log(JSON.stringify(result));
//         // alert(result.text);

       
       
//         if(sharedData.mimeType.split("image").length>1)
//         {
         
//           setExpenseFetchProcess(true);
//         const convertImageToBase64 = async () => {
//           try {
//             const imagePath = sharedData.data;
            
//             // Fetch the image as a Blob
//             function uriToBlob(uri) {
//               return new Promise((resolve, reject) => {
//                 const xhr = new XMLHttpRequest();
            
//                 // If successful -> return with blob
//                 xhr.onload = function () {
//                   resolve(xhr.response);
//                 };
            
//                 // reject on error
//                 xhr.onerror = function () {
//                   reject(new Error('uriToBlob failed'));
//                 };
            
//                 // Set the response type to 'blob' - this means the server's response 
//                 // will be accessed as a binary object
//                 xhr.responseType = 'blob';
            
//                 // Initialize the request. The third argument set to 'true' denotes 
//                 // that the request is asynchronous
//                 xhr.open('GET', uri, true);
            
//                 // Send the request. The 'null' argument means that no body content is given for the request
//                 xhr.send(null);
//               });
//             };
//             if(expenseFetchData==true) {
//               // if already fetched expense data then reset the state so we can show lottie animation
//               setFetchedExpenseData(false);
//               setAmount(0);
//               setDescription('');
//             }
//             // navigation.navigate("Expense",{sharedData:true})
//          if(addExpenseFocused==true)
//          {

//          }else{
//           navigation.navigate("Home")
       
//           if(isUserSubscribed || !isPremiumForPaymentAppShareEnabled){
//             // continue to fetch expense data
//             setTimeout(() => {
//               menuRef.current.showBottom();
//             }, 500);
//           } else {
//             premiumRef?.current?.showModal();
//             premiumRef?.current?.setMessage(
//               "Splitting from UPI apps is only available for premium users."
//               );
//             // return;
//           }
//          }
            
//             const blob = await uriToBlob(imagePath)
        
//             // Read the Blob as base64 using FileReader
//             const reader = new FileReader();
//             reader.onloadend = () => {
//               // Base64 image data
//               const base64Image = reader.result;
//               //console.log(base64Image.split("base64,")[1]);

//               var myHeaders = new Headers();
//               myHeaders.append("Authorization", "bearer $(gcloud auth print-identity-token)");
//               myHeaders.append("Content-Type", "application/json");

//               var raw = JSON.stringify({
//                 "image": base64Image.split("base64,")[1]
//               });

//               var requestOptions = {
//                 method: 'POST',
//                 headers: myHeaders,
//                 body: raw,
//                 redirect: 'follow'
//               };

//               fetch("https://us-central1-splitkaro-new.cloudfunctions.net/extractTextFromImage", requestOptions)
//                 .then(response => response.json())
//                 .then(result => {
//                   if(!result){
//                     setFetchedExpenseData(true);
//                     setExpenseFetchProcess(false);

//                     console.log('error scanning ', result)
//                     return;
//                   }
//                   // alert(JSON.stringify(result));
//                   // console.log(JSON.stringify(result));
//                   // Log("result",JSON.stringify(result)) 
//                   try {
//                     // var generatedContent = result.generatedContent;
//                     // var name= generatedContent.replace(/```\n?/g, '').split("merchant_name\":")[1].split("\n")[0].trim().replace(/[^a-zA-Z\s]/g, '')
//                     // var amount=generatedContent.replace(/```\n?/g, '').split("amount\":")[1].split("\n")[0].trim().replace(/[^a-zA-Z0-9\s]/g, '')
//                     let name = result?.data?.expense_name;
//                     let amount = result?.data?.amount.replace(/[^\d.-]/g, '');

//                       setDescription(name);
//                       setAmount(amount);
//                       setFetchedExpenseData(true);
//                       setExpenseFetchProcess(false);

                     

//                   } catch (e) {
//                     // Handle error
//                     setFetchedExpenseData(true);
//                     setExpenseFetchProcess(false);

//                     console.log('error scanning ', e)
//                   }
//                 })
//                 .catch(error => console.log('error1', error));

//               // Now you can use the base64Image in your React Native component
//             };
//             reader.readAsDataURL(blob);
//           } catch (error) {
//             console.error('Error converting image to base64:', error);
//             setFetchedExpenseData(true);
//             setExpenseFetchProcess(false);
//           }
//         };
        
//         // Call the function to convert the image to base64

//         convertImageToBase64();
//         }else if(sharedData.mimeType.split("csv").length>1){
//             navigation.navigate('ImportCsvScreen', { sharedData: sharedData,});
//         }else{
//           alert("File type not supported")
//         }
      

//       }



//     }
//     getSharedData();
    
//   }, [sharedData])
   
//   const askForReview = getRemoteValues("askForReview").asBoolean();
//   const event_show=getRemoteValues("event_show_new").asBoolean();
//   const event_position=getRemoteValues("event_position").asNumber();
//   const show_campaign=getRemoteValues("show_campaign").asBoolean();
//   const dynamic_banner=getRemoteValues("dynamic_banner").asString();
//   const premium_banner=getRemoteValues("premium_banner").asString();
//   const premium_banner_obj=JSON.parse(premium_banner);
//   const shared_wallet_enable = getRemoteValues('shared_wallet_enable',).asBoolean();
//   const [alreadyRegisteredForSharedWallet, setAlreadyRegisteredForSharedWallet ] = useState(true)
//   const ads_home=getRemoteValues("ads_home").asBoolean();
//   const isPremiumForPaymentAppShareEnabled = getRemoteValues("isPremiumForPaymentAppShareEnabled")
//   .asBoolean();


//   const [addExpenseFocused,setAddExpenseFocused]= useAtom(addExpenseFocusedAtom);
  

//   // notification permission for android 13
//   const checkApplicationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//        let res= await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//         );
//         // console.log('PermissionsAndroid', res)
//       } catch (error) {
//         console.log('error notif', error)
//       }
//     }
//   };

//   useEffect(() => {
//     checkApplicationPermission()
//   }, [])
  
// const isFocused = useIsFocused();
   
//  const groupAlert = useRef();
//   const recentGroup = useRef();
//   const InstantRef = useRef();
//   const BalanceRef = useRef();
//   const scratchCardRef =useRef();
//   const premiumRef = useRef();
//   const ActivityRef = useRef();

//   const [activities, setActivities] = useState(0);
//   const [lastFetchedTime, setLastFetchedTime] = useState('');
//   let activityFont = (activities>99)?9:11;
//   const {getActs} = useContext(MarkedActsContext);
//   const checkForUpdate = () => {
//     codePush.sync({
//       updateDialog: true,
//       installMode: codePush.InstallMode.ON_NEXT_RESUME
//     });
//   }

//   const {isUserSubscribed, subscriptionEndDate,
//     checkUserAlreadySubscribed : checkSubscription}  = useSubscription();


//   useEffect(() => {

//     if( subscriptionEndDate==='' ){
//       checkSubscription(userId);
//     } else if(isUserSubscribed && moment(subscriptionEndDate, 'DD-MMM-YY').isBefore(moment()) ) {
//       checkSubscription(userId);
//     } else {
//       // No need any action
//     }
//   }, [subscriptionEndDate])
  

//   // useEffect(() => {

//   //     fetchGroup();
//   //   },[fetchGroup]);
//   const signInWithFirebaseCheck=getRemoteValues("signInWithFirebaseCheck").asBoolean();

//   const { state , signInToFirebase} = React.useContext(AuthContext);
//   const userData = JSON.parse(state.userData);
//   const userToken = userData && userData.token;
//   const firstTime=state.firstTime;
//   const userId = userData && userData.user_id;
    
//   const toUpdate= getRemoteValues("update").asString();
//   const payment_enabled=getRemoteValues("payment_prod").asString();
//   const banner_config= getRemoteValues("new_home_banner").asString();
//   const banner_config_obj=JSON.parse(banner_config)
//   // Logger('banner_config',JSON.parse(banner_config))
//   const feature_homesetup = getRemoteValues("feature_homesetup").asBoolean();

//   const premium_enabled_new_string= getRemoteValues("premium_enabled_new").asString();
//   const premium_enabled_new= JSON.parse(premium_enabled_new_string);
//   const premium_enabled = premium_enabled_new[userData?.country_code];

//   useEffect(() => {
//     if (!!firstTime ) {
//       firstTimeUserRef.current.showBottom();
//     }
//   }, [firstTime]);

//   useEffect(() => {
//     // temporary fix for user not getting chat feature due to firestore rules 21/03/2024
//     if(signInWithFirebaseCheck==true)
//     {
//       signInToFirebase()
//     }
//   }, []);
 
//   useEffect(()=>{
//    // updateCodePushVersion(userId)
//   },[])

//   useEffect(() => {
//     splitkaroCash?.state !== 'loading' && updateSplitkaroCash();
//   }, [splitkaroCash?.state])

//   let update =false;
//   let message ="We have added a lot of new features and fixed some bugs to make your experience as smooth as possible";
//   let mandatoryUpdate=false;
//   try{
//      var updateStatus =JSON.parse(toUpdate).update;
    
//     if(updateStatus==true)
//     {
//       if(Platform.OS=="android")
//       {
//         var currentBuildVersion=appBuildNumber;
     
//         var buildVersion=JSON.parse(toUpdate).android;
//         if(parseInt(currentBuildVersion)<=parseInt(buildVersion)){
//           update=true;
//         }
//       }else{
//         var currentBuildVersion=appBuildNumber;
//         var currentAppVersion=appVersion;
     

//         appVersionBelowUpdate=JSON.parse(toUpdate).ios;
       
//         var updateStatus=compareVersions(appVersionBelowUpdate,currentAppVersion)

//         if(updateStatus==0 || updateStatus==1)
//         {
//           update=true;
//          }
       
//       }

//       message=JSON.parse(toUpdate).message;
//       mandatoryUpdate=JSON.parse(toUpdate).mandatory;
       
//     }
    
//   }catch(error)
//   {
//     console.log('error ', error);
//   }
  
  
//   const [isInternet,toUpdateOnInternet]=useIsInternet();

//   const { updateBalance, fetchBalance, setCount } = useContext(WalletContext)
 
  

//   const [refreshing, setRefreshing] = React.useState(false);
//   const onRefresh = React.useCallback(() => {
//     refetchBalance()
//     refetchInstant();
//     refetchGroups();
//     setRefreshing(true);
//     refetchActivityCount();
//     wait(1000).then(() => setRefreshing(false));
//     Toast.hide();
//   }, []);

//   useEffect(() => {
//     if (toUpdateOnInternet == true && isInternet==true) {
//      onRefresh();
//     }
//     if(isInternet==true)
//     {
//       Toast.hide();
//     }
//   }, [toUpdateOnInternet,isInternet])



//   useEffect(() => {

//     const unsubscribe = navigation.addListener('focus', async () => {
     
//       setCount();
//       checkRegisteredForSharedWallet();
//     });
//     return unsubscribe;
//   }, [navigation, route]);

  

//   useEffect(() => {
//    analytics.screen('Home')
//     registerToken(userToken);
    
//     if(payment_enabled==true||payment_enabled=="true"||returnAllowedUsersStatus(userId))
//     {
//       // updateBalance(); // wallet disabled 
      
//     }
    
//   }, [])

//   useEffect(()=>{
   
//     async function fetchData(){
//       setSettingModal(true)
//       await fetchBalance();
//     }
  
//     fetchData();
 
//   },[])

//   const checkRegisteredForSharedWallet = async () => {
//     try {
//      let  isRegistered = await AsyncStorage.getItem(`@registeredForSharedWallet`);
//      setAlreadyRegisteredForSharedWallet(isRegistered);
//     } catch (error) {
//       console.log(`error`, error);
//     }
//   };



  
//   const windowHeight = Dimensions.get('window').height;
//   const [settingModal, setSettingModal] = useState(false);


//   const { signOut } = React.useContext(AuthContext);



//   const refetchGroups = () => {
//     recentGroup.current.refetchGroups();
//   }

//   const refetchInstant = () => {
//     InstantRef.current.refetchInstant();
//   }

//   const refetchBalance = () => {
//     BalanceRef.current.refetchBalance();
//   }

//   const refetchActivityCount = () => {
//     // ActivityRef.current.fetchActivityCount();
//   }


//   const showGroup = (par = null, analyticsTarget) => {
//     if(par !== null){
//       groupAlert.current.showAlert(par);  
//     }else{
//       groupAlert.current.showAlert();
//     }
//     // analytics.track('Home Create Group Click');
//     if(!!analyticsTarget){
//       analytics.track(analyticsTarget);
//     } else {
//       analytics.track('Add expense Create Group Click');
//     }

    
//   }
//   const scrollY = useRef(new Animated.Value(0)).current;

//   const scrollHandler = Animated.event(
//     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//     { useNativeDriver: true }
//   );

//   const marginTopStyle = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [-90, -240],
//     extrapolate: 'clamp',
//   });

//   const marginTopStyle2 = scrollY.interpolate({
//     inputRange: [0, 300],
//     outputRange: [-67.5, -117.5],
//     extrapolate: 'clamp',
//   });

//   const marginTop = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [-30, -120],
//     extrapolate: 'clamp'
//   });

//   const translateY = scrollY.interpolate({
//     inputRange: [0, 220],
//     outputRange: [0, -32],
//     extrapolate: 'clamp',
//   });

//   const rotateX = scrollY.interpolate({
//     inputRange: [0, 230],
//     outputRange: ['0deg', '100deg'],
//     extrapolate: 'clamp',
//   });

//   const opacity = scrollY.interpolate({
//     inputRange: [160, Platform.OS === 'ios' ? 200 : 210],
//     outputRange: [1, 0],
//     extrapolate: 'clamp',
//   });

//   const rotateStyle = {
//     transform: [
//       { perspective: 1000 },
//       { translateY },
//       { translateY: -50 },
//       { rotateX },
//       { translateY: 50 },
//     ],
//     opacity,
//   };
  

//   return (
//     <>  
//       <SafeScreen color={"#707CE3"}>
//         <View style={{ paddingTop: 0, backgroundColor: "#707CE3", flex: 1 }}>

//           <View style={{ height: Platform.OS === 'ios' ? 200 : 200, paddingTop: 10, backgroundColor: "#707CE3" }}>

//             <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>

//               {/* to enable only on Diwali */}
//               {/* {Platform.OS=="android"&&(
//       <View style={{position:"absolute", height:250,width: 400,right:-40 }}>
//                 <LottieView
//                   source={require('./lottie/fireworks.json')}
//                   autoPlay
//                   loop
//                   duration={3000}
//                 />
//               </View>)}
//               <View style={{ position: "absolute", height: 320, width: 320,top:-20 }}>
//                 <LottieView
//                   source={require('./lottie/lamps.json')}
//                   autoPlay
//                   loop
//                   duration={3000}
//                 />
//               </View> */}

//               <View style={{ alignItems: "center" }}>
//                 <Pressable android_ripple={{ color: "#FFF6EE", radius: 20 }} style={{ height: 40, width: 40 }} onPress={() => { navigation.navigate("Account") }}>

//                   <View style={{
//                     height: 40, width: 40, backgroundColor: "rgba(193, 193, 193, 0.21)", borderRadius: 30, justifyContent: "center", alignItems: "center",
//                     borderWidth: isUserSubscribed && premium_enabled ? 2 : 0, borderColor: palette.yellow
//                   }}>
//                     <Profile width={35} height={35} />

//                   </View>
//                 </Pressable>
//                 <Text style={{ fontFamily: "Metropolis-Bold", color: "#E5E5E5", fontSize: 12, marginTop: 3 }}>Account</Text>
//               </View>

//               <View>

//               </View>

//               {update == true&& (
//                 <Modal statusBarTranslucent onBackButtonPress={() => { if (!mandatoryUpdate) { setSettingModal(false) } }} isVisible={settingModal} backdropOpacity={0.4} backdropTransitionInTiming={100} backdropTransitionOutTiming={500} onBackdropPress={() => { if (!mandatoryUpdate) { setSettingModal(false) } }} animationIn="bounceInUp" animationInTiming={500} animationOut="bounceOutDown" style={{ alignItems: "center" }}>
//                   <View style={{position:"absolute", paddingHorizontal: 25, paddingVertical: 30, marginTop: 190, height: windowHeight/2,bottom:0, width: windowWidth, borderRadius: 10, backgroundColor: "white" }}>
//                     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
//                       <Text style={{ fontFamily: "Metropolis-SemiBold", marginBottom: 20 }}>Time To Update!</Text>
//                       <Text style={{ textAlign: "center", fontFamily: "Metropolis-Medium", marginBottom: 20 }}>{message}</Text>

//                       <Pressable android_ripple={{ color: "#FFF6EE", radius: 400 }} onPress={() => {
//                         if (Platform.OS == "android") {

//                           Linking.openURL("https://play.google.com/store/apps/details?id=com.bsquare.splitkaro")
//                         } else {
//                           Linking.openURL("https://apps.apple.com/in/app/splitkaro/id1573115695")
//                         }

//                       }}
//                         style={{
//                           alignItems: "center", justifyContent: "center", paddingVertical: 15, backgroundColor: "#000000", marginBottom: Platform.OS == "android" ? 10 : 10,
//                           marginHorizontal: 20, borderRadius: 38,
//                         }}>
//                         <View style={{ height: 22, width: 200 }}>
//                           <Text style={{ color: "white", fontSize: 17, alignSelf: "center", fontFamily: "Metropolis-SemiBold" }}>Update Now</Text>
//                         </View>
//                       </Pressable>
//                     </View>
//                   </View>
//                 </Modal>)}

//               <View style={{ flexDirection: "row" }}>
//                 {(payment_enabled == true || payment_enabled == "true" || returnAllowedUsersStatus(userId)) && (
//                   <View style={{ alignItems: "center" }}>
//                     <Pressable android_ripple={{ color: "#FFF6EE", radius: 20 }} style={{ height: 40, width: 40 }} onPress={() => { analytics.track("Home Wallet Click"); navigation.navigate("wallet") }}>
//                       <View style={{ height: 40, width: 40, backgroundColor: "rgba(193, 193, 193, 0.21)", borderRadius: 30, justifyContent: "center", alignItems: "center" }}>
//                         <Wallet type="wallet"></Wallet>
//                         <View style={{ position: "absolute", height: 40, width: 40, right: 28, bottom: 10 }}>
//                           {/* <LottieView
//                         source={require('./lottie/new.json')}
//                         autoPlay
//                         loop
//                       /> */}

//                         </View>

//                       </View>
//                     </Pressable>
//                     <Text style={{ fontFamily: "Metropolis-Bold", color: "#E5E5E5", fontSize: 12, marginTop: Platform.OS == "ios" ? 5 : 3 }}>Wallet</Text>
//                   </View>
//                 )}

//                 <ActivityButton ref={ActivityRef}></ActivityButton>
//               </View>

//             </View>
//        </View> 
//           <Animated.View style={{marginTop:-37.5,zIndex:3,...rotateStyle}}>
//           <HomeBalance type={"home"} ref={BalanceRef} />
//           </Animated.View>            
//           <Animated.View style={[{height: 120, 
//     borderTopLeftRadius: 20, 
//     borderTopRightRadius: 20,
//      backgroundColor: "#5765DB",zIndex:0},{ transform: [{ translateY:marginTopStyle2 }] }]}>

//           </Animated.View>
//         {/* to enbale only on Diwali */}
//           {/* <View style={{ position: "absolute", height: 75, width: 75, top: 180, left: -12 }}>
//             <LottieView
//               source={require('./lottie/hanging-lamp.json')}
//               autoPlay
//               loop
//               duration={3000}
//             />
//           </View>
//           <View style={{ position: "absolute", height: 75, width: 75, top: 180, right: -12 }}>
//             <LottieView
//               source={require('./lottie/hanging-lamp.json')}
//               autoPlay
//               loop
//               duration={3000}
//             />
//           </View> */}
//           <Animated.View style={[{overflow: 'hidden',borderWidht:2, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "white" },{ transform: [{ translateY:marginTopStyle }] }]}>

//             <Animated.ScrollView  onScroll={scrollHandler}
//         scrollEventThrottle={16} refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//               />}  contentContainerStyle={{ paddingBottom: 100}} keyboardShouldPersistTaps="handled" >
//             {(event_show==true && event_position==1)?
//            <View style={{flexDirection:"column",borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
// <ExperiencesEntry visible={true} refreshing={refreshing} navigation={navigation} />
// <EventEntry visible={true} refreshing={refreshing} navigation={navigation} />
// </View>:(<></>)}

// {ads_home?(
// <BannerAd 
//       unitId={adUnitId}
//       size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
//       requestOptions={{
//         requestNonPersonalizedAdsOnly: true,
//         keywords: ['travel', 'vacation', 'destination']
//       }}
//       adBackgroundColor="transparent"
//     />):(<></>)}

//              {show_campaign?(<NewBanner type={"campaign"} borderRadius={10} imageUrl={"https://firebasestorage.googleapis.com/v0/b/splitkaro-new.appspot.com/o/rent_banner1.png?alt=media&token=4ad098e3-dcf5-4cec-a5e8-c174a4e86918"} />):(
//               null
//              )}

//             {isUserSubscribed && premium_enabled && premium_banner_obj?.toshow ?
//               (<NewBanner type={"campaign"} borderRadius={10} imageAspectRatio={premium_banner_obj?.aspect_ratio} imageUrl={premium_banner_obj?.url} redirect={premium_banner_obj?.redirect} />
//               ):
//                 JSON.parse(dynamic_banner)?.toshow==true && !premium_enabled  ?(<NewBanner type={"campaign"} borderRadius={10} imageAspectRatio={JSON.parse(dynamic_banner)?.aspect_ratio} imageUrl={JSON.parse(dynamic_banner)?.url} redirect={JSON.parse(dynamic_banner)?.redirect} />):(
//               null
//              )}

  
//               {shared_wallet_enable && !alreadyRegisteredForSharedWallet?<SharedWalletEntry  userData={userData}/>: null}

//               {feature_homesetup==true?(
//                 <HomeSetupEntry showGroup = {showGroup}/>):(<></>)}

//                 {(event_show==true && event_position==2)?<View style={{flexDirection:"column"}}>
// <ExperiencesEntry visible={true} refreshing={refreshing} navigation={navigation} />
// <EventEntry visible={true} refreshing={refreshing} navigation={navigation} />
// </View>:(<></>)}

//               <RecentInstant ref={InstantRef} />

//                <View style={{ marginHorizontal: 15, marginTop: 20 }}>
//                 <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//                   <Text style={{ fontFamily: "Metropolis-SemiBold", marginHorizontal: 5 }}>Recent Groups</Text>
//                   {/* <Pressable android_ripple={{color:"#CCCCCC",radius:40}} onPress={()=>{navigation.navigate("Groups")}} >
           
//             <Text style={{fontFamily:"Metropolis-SemiBold",marginHorizontal:5,color:"#5563DA"}}>View all</Text>
//             </Pressable> */}
//                 </View>

//                 <View style={{ flexDirection: "row", marginTop: 10 }}>


//                   <View style={{ width: 60, flexDirection: "column", justifyContent: "center", alignItems: "center",marginRight:12,marginLeft:10 }}>

//                     <Pressable onPress={() => { showGroup() }} >

//                       <View style={{ justifyContent: "center", alignItems: "center", marginTop: 5 }}>
//                         <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "black", height: 40, width: 40, borderRadius: 25, borderWidth: 2, marginBottom: 5 }}>
//                           <Plus height={16} width={16}></Plus>
//                         </View>
//                         <View style={{justifyContent: "center", alignItems: "center",width:80,top:5}}>
//                         <Text ellipsizeMode={"tail"} numberOfLines={1} style={{ fontSize: 12, fontFamily: "Metropolis-SemiBold"}}>Create new</Text>
//                         </View>
                        
//                       </View>
//                     </Pressable>
//                   </View>
//                   <CreateGroup ref={groupAlert} callback={refetchGroups} />
                  
//                   <RecentGroups navigation={navigation} ref={recentGroup} />
              



//                 </View>

//               </View>
//               <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//                   <Text style={{ fontFamily: "Metropolis-SemiBold", marginHorizontal: 20,marginTop:20 }}>Overview</Text>
//               </View>
//               <View style={{ backgroundColor: "#EDEDED", marginTop: 15, paddingVertical: 10 }}>
//                 <DisplayCards />
//               </View>
//             <Hide>
//               <View style={{ marginTop: 15 }}>
//                 <Pressable onPress={()=>{
//                   navigation.navigate("OnlineVendorsScreen")
//                   analytics.track("Online Vendors widget clicked")
//                   }}>
//                 <View style={{ flexDirection: "row",}}>
//                   <Image 
//                       source={require("../../assets/OnlineVendorsEntryCard.png")}
//                       style={{height: windowWidth*170/352, width: windowWidth}}
//                   />
//                 </View>
//                 </Pressable>


               
//               </View>
//               </Hide>
              
//               <View>
//               {banner_config_obj.toDisplay ? (
//                   <NewBanner imageUrl={banner_config_obj?.bannerUrl} />
//                 ) : null}
//               </View>
            
//               {premium_enabled || 1 ?
//                 <View>
//                   <PremiumScreen type="home"></PremiumScreen>
//                 </View>
//               :null }

//               {(event_show==true && event_position==3)?<View style={{flexDirection:"column"}}>
// <ExperiencesEntry visible={true} refreshing={refreshing} navigation={navigation} />
// <EventEntry visible={true} refreshing={refreshing} navigation={navigation} />
// </View>:(<></>)}
//               <View style={{height:100}}>

//               </View>
              

//             </Animated.ScrollView>
//           </Animated.View>








//         </View>


//         <ScratchCardCongratulationsModal
//           ref={scratchCardRef}
//           onPress={()=> {
//             scratchCardRef.current.hideModal();
//             navigation.navigate("ReferralInviteScreen")
//             analytics.track('Scratch Card congratulatory message pressed');
//           }}
//           onClose={()=>{
//             scratchCardRef.current.hideModal();
//             analytics.track('Scratch Card congratulatory message closed');
//           }}
//         />

      
//       <View style={{ flexDirection: "row-reverse", alignItems: "center", position: "absolute", bottom:Platform.OS!="android"?(bottominsets?bottominsets+0:0):30, right:25}}>
//         <Pressable onPress={() => { 
//               menuRef.current.showBottom();
//               setSharedData(null);
//               setFetchedExpenseData(false);
//           }}>
//           <PlusButton/>
//         </Pressable>
//       </View>
//       <AddExpenseBottomSheet ref={menuRef} sharedData={sharedData} setShowMenu={setShowMenu} showGroup={showGroup}/>
//       <PremiumControlUpiScanModal
//         ref={premiumRef}
//         amountFetched={amountFetched}
//         expenseFetchData={expenseFetchData}
//         descriptionFetched={descriptionFetched}
//         title='Premium feature'
//         source='Home Screen UPI scan'
//         callback={() => {
//           setAmount(0);
//           setDescription("");
//           setFetchedExpenseData(false);
//         }}
//         onOverlayPress={()=>{
//           premiumRef?.current?.hideModal();
//           setAmount(0);
//           setDescription("");
//           setFetchedExpenseData(false);
//         }}
//       />
      
//       <SignUpAddExpenseBottomSheet ref = {firstTimeUserRef} onCreateGroup={()=>{
//         showGroup();
//       }} />
      
//       </SafeScreen>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "white",
//     shadowColor: '#000000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 2,

//   },
//   redDot: {
//     backgroundColor: '#EC3232',
//     height: 18,
//     width: 18,
//     borderRadius: 50,
//     marginLeft:-14,
//     marginBottom:28,
//     alignItems:'center',
//     justifyContent:'center',
//   },
//   alertSection:{
//     flexDirection:'row',
//     width:40,
//     height:40,
//     justifyContent:'center',
//     alignItems:'center'
//   },
//   activityCounter:{
//     color:'white',
//     fontFamily:'Metropolis-SemiBold'
//   }
// });

// export default Home
