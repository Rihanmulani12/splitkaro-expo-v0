import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityButton from "@/components/activity";

import Profile from "@/components/profile";
import groups from './groups';
import CreateGroupModal from "@/components/CreateGroupModal";



const Home = () => {
  return (
    <>
    

    <SafeAreaView>
     

      <View style={{backgroundColor : "white" , height : "100%"}}>

      <View style={{height : "35%" , backgroundColor: "#5563da"}}>
      <View style={styles.container}>
        <ActivityButton
          onPress={() => console.log("Activity pressed")}
        />
      </View>

      <View style={styles.container1} >
        <Profile  onPress={() => console.log("Profile pressed")}/>
        
      </View>

      <View style={styles.wallet}>
         <Text style={{color : "white"}}>Wallet</Text>
      </View>
      </View>

      <View>
        <Text style={{fontSize : 15, fontWeight : "semibold", padding : 10}}>Recent groups</Text>
        <CreateGroupModal/>
      </View>


      </View>

     
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    backgroundColor: "rgba(193, 193, 193, 0.21)",
    position: "absolute",
    top: 60,
    right: 10,

    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  container1: {
    height: 40,
    width: 40,
    backgroundColor: "rgba(193, 193, 193, 0.21)",
    position: "absolute",
    top: 60,
    left: 10,

    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  wallet : {
    position: "absolute",
    backgroundColor : "darkblue", 
    height : "40%" , 
    width : "80%",
    top : "50%",
    left : "8%",
    justifyContent : "center",
    alignItems : "center",
    borderRadius: 10,
    borderWidth: 0.5,
    
  }
});

export default Home;
