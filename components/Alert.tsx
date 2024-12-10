import React, { useState, useImperativeHandle, forwardRef } from "react";
import { StyleSheet, Modal, Text, Pressable, View, Dimensions,ScrollView, TouchableWithoutFeedback } from "react-native";
// import Modal from 'react-native-modal';
import Loading from "../components/Loading";
import LottieView from 'lottie-react-native';

const Alert = (props, ref : any) => {

  const windowWidth = Dimensions.get('window').width;
  const alertHeader = props.alertHeader;
  const [alertText, setAlertText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const type = props.type;
  const loading=props.loading;


  useImperativeHandle(ref, () => ({
    showAlert: (text : any) => {
      setAlertText(text);
      setModalVisible(true)
    },
    hideAlert: (text : any) => {
      setAlertText("");
      setModalVisible(false);
    }

  }));

  //   useImperativeHandle(ref, () => ({
  //     hideAlert: (text) => {
  //         setAlertText("");
  //         setModalVisible(false);
  //     }

  // }));
  const okayHandler = () =>{
    if(props.callback){
      props.callback();
    }
    setModalVisible(false)
  }
  return (
    <Modal
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      visible={modalVisible} // required
       // onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={() => { setModalVisible(false) }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,.6)',
            ...props.style,
          }}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 30, width: windowWidth * .8, borderRadius: 10, backgroundColor: "white" }}>
        <ScrollView>
       
        <Text style={{ marginBottom: 20, fontSize: 19, color: "#2c365a", fontFamily: "Metropolis-SemiBold" }}>{alertHeader}</Text>
       <View style={{justifyContent:"center",alignItems:"center",marginLeft:-25}}>       
         {props.image=="congrats"?(
         <View style={{ height: 115, width: 115,marginLeft:3 }}>
                          <LottieView

                            source={require('../lottie/offer.json')}
                            autoPlay
                            loop
                          />
                        </View>):(<></>)}
             </View>

        <Text style={{ fontSize: 14, color: "#999999", fontFamily: "Metropolis-Regular", lineHeight: 20 }}>{alertText}</Text>
      
        {type == "error" && (
          <View style={{ display: "flex", flexDirection: "row-reverse", marginTop: 50 }}>
            <Pressable onPress={() => { okayHandler() }}>
              <View style={{ paddingHorizontal: 40, paddingVertical: 10, borderRadius: 25, backgroundColor: "#000000", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontFamily: "Metropolis-SemiBold", color: "white", fontSize: 15 }}>Okay</Text>
              </View>
            </Pressable>


          </View>)}
       
        {type == "prompt" && (
          <View style={{ display: "flex", flexDirection: "row-reverse", marginTop: 50 }}>
          {loading?(
            <Pressable onPress={() => {  }}>
            <View style={{height:40,width:145,paddingHorizontal: 40, paddingVertical: 10, borderRadius: 25, backgroundColor: "#000000", justifyContent: "center", alignItems: "center" }}>
           
            <Loading type={"dots"} height={2} width={2} />
           
            
            </View>
          </Pressable>

          ):(
            <Pressable onPress={() => { props.callback() }}>
              <View style={{width:145, paddingHorizontal: 40, paddingVertical: 10, borderRadius: 25, backgroundColor: "#000000", justifyContent: "center", alignItems: "center" }}>
                
                <Text maxFontSizeMultiplier={1.1} style={{ fontFamily: "Metropolis-SemiBold", color: "white", fontSize: 15 }}>Confirm</Text>
              </View>
            </Pressable>)}

            <Pressable onPress={() => { setModalVisible(false) }}>
              <View style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                <Text maxFontSizeMultiplier={1.1} style={{ fontFamily: "Metropolis-SemiBold", color: "#000000", fontSize: 15 }}>Cancel</Text>
              </View>
            </Pressable>

          </View>)}

          </ScrollView>
      </View>
      </View>
    </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({

});

export default forwardRef(Alert);