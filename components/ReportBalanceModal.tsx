import React, { useState, useRef, useImperativeHandle, useEffect, forwardRef } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Platform, TextInput, Linking } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import MainButton from './MainButton';
import Loading from "../components/Loading";
//import { AuthContext } from "../contexts/authContext";
import Alert from "../components/Alert";
//import database from '@react-native-firebase/database';

//import firestore from '@react-native-firebase/firestore';
//import {analytics} from "../configs/analytics"
import Svg, { Path } from "react-native-svg";

//import moment from 'moment';
import getRemoteValues from './Functions/getRemoteValues'
import { Image } from 'expo-image';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const formatDate = (date : Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };
  
  const createdAt = formatDate(new Date());

const ReportBalanceModal = (props, ref) => {

    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formContent, setFormContent] = useState('');
    const { state } = React.useContext(AuthContext);
    const userData = JSON.parse(state.userData);
    const user_id = userData && userData.user_id;
    const alertRef = useRef();
    const issueReference = database().ref('/issues').push();
    const counterReference = database().ref('/counter/current');
    const collectionReference = firestore().collection('email');

    const query_message = getRemoteValues("query_message").asString();

    useImperativeHandle(ref, () => ({
        showModal: (text) => {
            setFormContent("");
            setLoading(false);
            setSubmitted(false);
            setModalVisible(true);
        }

    }));

    const showAlert = () => {
        alertRef.current.showAlert("Please do not submit an empty issue. You can help us improve the app.");
    }

    const submitHandler = () => {
        analytics.track("Report an issue submit clicked")
        setLoading(true);
        let textString = formContent;
        textString = textString.replace(/(\r\n|\n|\r)/gm, "");
        textString = textString.replace(/ /g,'');
        if (textString != "") {
            analytics.track("Report an issue submitted")
            const temp = {
                userID: user_id,
                name: userData.first_name + ' ' + userData.last_name,
                email: userData.email,
                query: formContent,
                created_at: createdAt  // replace with moment//(new Date().toISOString()).local().format('DD MMM YYYY h:mm A')
            }

            issueReference
                .set(temp).then(async () => {
                    addToEmailList(formContent);
                    setFormContent("");
                    setLoading(false);
                    setSubmitted(true);
                });
        } else {
            showAlert();
            setLoading(false);
        }
    }

    const addToEmailList = async(message) => {

        // generating unique id for support ticket
        let current = 0;

        await counterReference
            .once('value')
            .then(snapshot => {
                current = snapshot.val().counter;
            });

        let ticketId = generateTicketId(current);

        await collectionReference.add({
            message:{
                    subject:"[Support] #" + ticketId + " - " + message,
                    html: `<body>
                    Hi ${userData.first_name},<br>
                    ${query_message ?? "We are looking into the issue. Someone from our support will contact you soon."}<br><br><br>
                    Query - ${message}<br><br>
                    Regards,<br>
                    Team Splitkaro.
                </body>`,
                    text: ""
                },
            to:[userData.email],
            cc:["support@splitkaro.com"]
        }).then(()=>{
            
        }).catch((err)=>{
            console.log(err)
        })

        counterReference
            .update({
                counter: current + 1
            })
            .then(() => {});
    }

    const generateTicketId = (addition) =>{
        let temp = 1000000 + addition;
        let randString = Math.floor(Math.random() * (91)) + 10;
        
        return temp.toString() + randString.toString();

    }

    const closeSheetHandler = () => {
        setModalVisible(false);
    }

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {

                if (modalVisible) {
                    e.preventDefault();
                    ignoreListHandler();
                    setModalVisible(false);
                }
            }),
        [navigation, modalVisible]
    );

    const closingHandler = () => {
        setModalVisible(false);
    }

    return (
        <>
            <Modal  avoidKeyboard={Platform.OS == "ios" ? true : null} hideModalContentWhileAnimating={true} useNativeDriverForBackdrop={true} onBackButtonPress={() => { closingHandler() }} isVisible={modalVisible} backdropOpacity={0.6} backdropTransitionInTiming={100} backdropTransitionOutTiming={200} onBackdropPress={() => { closingHandler() }} animationIn="zoomIn" animationInTiming={100} animationOutTiming={200} style={styles.modal}>
                <View style={!submitted ? styles.container : styles.container2}>
                    {!submitted ? (
                        <View style={styles.sheetContent}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.heading}>Report an issue</Text>
                                <Text style={styles.sheetMessage}>We deeply regret the inconvenience caused. Please let us know your issue and we will get back to you soon.</Text>
                                <Text style={styles.emailMessage}>Check your mail for further communication.</Text>
                                <TextInput
                                    value={formContent}
                                    onChangeText={(text) => { setFormContent(text) }}
                                    placeholderTextColor={"#999999"}
                                    placeholder={"Please share your issue here"}
                                    style={styles.textInput}
                                    multiline={true} />
                            </View>
                            <View style={{ alignItems: "center", paddingTop: 40, width: windowWidth / 1.1 }}>
                                {!loading ? (
                                    <MainButton clicked={submitHandler}>
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </MainButton>
                                ) : (
                                    <MainButton clicked = {()=>{}}>
                                        <Loading height={22} width={22} />
                                    </MainButton>
                                )}
                            </View>
                        </View>
                    ) : (
                        <View style={styles.submittedSheet}>
                            <View style={styles.submittedMessage}>
                                <Text style={styles.closeMessage}>Thank You for reporting the issue. We will get back to you soon via email</Text>
                                <Image  style={{width : 100 , height : 100}} source={require("../assets/images/splash-icon.png")}  />
                            </View>
                            <View style={{ alignItems: "center", paddingTop: 40, width: windowWidth / 1.1 }}>
                                <MainButton clicked={closeSheetHandler}>
                                    <Text style={styles.buttonText}>close</Text>
                                </MainButton>
                            </View>
                        </View>
                    )}
                </View>
            </Modal>
            <Alert type={"error"} alertHeader={"Error"} ref={alertRef}></Alert>
        </>
    );
};

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        backgroundColor: "white",
        height: 460,
        paddingBottom: 25,
        paddingTop: 10,
        paddingHorizontal: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 10
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container2: {
        backgroundColor: 'white',
        height: 420,
        paddingTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    sheetContent: {
        marginTop: 15,
        height: 300,
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    submittedSheet: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth,
        height: 420,
        paddingTop: 10,
        paddingBottom: 10
    },
    submittedMessage: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        width: 280,
    },
    closeMessage: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Metropolis-Medium',
        color: '#3E4016',
        marginBottom: 30,
        marginTop: 70
    },
    backDrop: {
        position: "absolute",
        backgroundColor: "black",
        height: "120%",
        width: "120%"
    },
    heading: {
        fontFamily: 'Metropolis-Bold',
        fontSize: 20,
        color: '#5563DA'
    },
    sheetMessage: {
        marginVertical: 20,
        fontFamily: 'Metropolis-Regular',
        fontSize: 15,
        color: '#4d4d4d'
    },
    sheetBottomMessage: {
        fontFamily: 'Metropolis-Regular',
        fontSize: 15,
        color: '#4d4d4d',
        marginVertical: 5
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Metropolis-SemiBold'
    },
    textInput: {
        marginTop: 15,
        borderColor: '#999999',
        borderWidth: 1,
        borderRadius: 20,
        height: windowHeight / 7,
        color: 'black',
        padding: 10,
        fontFamily: 'Metropolis-Regular',
    },
    storeLink: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emailMessage: {
        fontFamily: 'Metropolis-Bold',
        fontSize: 15,
        color: '#4d4d4d'
    }

});

export default forwardRef(ReportBalanceModal);