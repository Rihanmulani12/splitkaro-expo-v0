import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityButton from "@/components/activity";

import Profile from "@/components/profile";

const Home = () => {
  return (
    <SafeAreaView>

      <View style={{height : "50%" , backgroundColor: "blue"}}>
      <View style={styles.container}>
        <ActivityButton
          onPress={() => console.log("Activity pressed")}
        />
      </View>

      <View style={styles.container1} >
        <Profile  onPress={() => console.log("Profile pressed")}/>
        
      </View>
      </View>
    </SafeAreaView>
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
});

export default Home;
