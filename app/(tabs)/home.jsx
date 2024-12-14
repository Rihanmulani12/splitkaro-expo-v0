import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useState } from "react";
import Plus from "../../assets/svg/general/plus2.svg";

import SafeScreen from "@/components/SafeScreen";
import Wallet from "@/assets/svg/general/walletwhite.svg";
import ActivityButton from "@/components/activity";
import CreateGroupModal from "@/components/createGroup";
import Profile from "@/components/profile";
import Svg, { Polygon } from "react-native-svg";

const Home = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to open the modal
  const handleCreateGroup = () => {
    setModalVisible(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Function to handle group creation
  const handleGroupCreation = (groupData) => {
    console.log("New Group Created:", groupData);
    handleCloseModal();
  };

  const handleAccountPress = () => {
    console.log("Account button pressed");
  };

  const handleWalletPress = () => {
    console.log("Wallet button pressed");
  };

  return (
    <SafeScreen color="#707CE3">
      <StatusBar barStyle="light-content" backgroundColor="#707CE3" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {/* Account Button */}
          
          <View style={styles.headerButtonContainer}>
            <Pressable
              android_ripple={{ color: "#FFF6EE", radius: 20 }}
              style={styles.headerButton}
              onPress={handleAccountPress}
            >
              <View style={styles.headerButtonInner}>
                <Profile />
              </View>
            </Pressable>
          </View>

          {/* Wallet and Activity Buttons */}
          <View style={styles.walletActivityContainer}>
            <ActivityButton />
          </View>
        </View>
        <Text style={{ fontFamily: "Metropolis-Bold", color: "#E5E5E5", fontSize: 12, marginLeft: 10 , top : 90 , position: "absolute"}}>Account</Text>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.groupSection}>
            <Pressable onPress={handleCreateGroup} style={styles.createButton}>
              <View style={styles.createGroupBtn}>
              <Svg
                
                
                viewBox="0 0 490 490"
                style={{backgroundColor: "transparent"}}
                
              >
                <Polygon
                  style="fill:#ffffff;"
                  points="495,227.5 267.5,227.5 267.5,0 227.5,0 227.5,227.5 0,227.5 0,267.5 227.5,267.5 227.5,495 
	267.5,495 267.5,267.5 495,267.5 "
                />
              </Svg>

              
              </View>
              <View style={{justifyContent: "center", alignItems: "center",width:80,top:5}}>
              <Text ellipsizeMode={"tail"} numberOfLines={1} style={{ fontSize: 12, fontFamily: "Metropolis-SemiBold"}}>Create new</Text>
              </View>
            </Pressable>
            
            <CreateGroupModal
              isVisible={isModalVisible}
              onClose={handleCloseModal}
              onGroupCreate={handleGroupCreation}
            />
          </View>

          {/* Banner Section */}
          <View style={styles.bannerSection}>
            <Image
              source={require("@/assets/OnlineVendorsEntryCard.png")}
              resizeMode="contain"
              style={styles.bannerImage}
            />
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#707CE3",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
  },
  headerButtonContainer: {
    alignItems: "center",
  },
  headerButton: {
    height: 40,
    width: 40,
  },
  headerButtonInner: {
    height: 40,
    width: 40,
    backgroundColor: "rgba(193, 193, 193, 0.21)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerButtonIcon: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerButtonText: {
    fontFamily: "Metropolis-Bold",
    color: "#E5E5E5",
    fontSize: 12,
    marginTop: 3,
  },
  rightHeaderButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollContainer: {
    padding: 15,
  },
  topSection: {
    padding: 20,
    backgroundColor: "#707CE3",
  },
  iconSection: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconContainer: {
    alignItems: "center",
  },
  iconButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#C1C1C1",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  labelText: {
    marginTop: 5,
    fontSize: 12,
    color: "#E5E5E5",
  },
  bannerSection: {
    marginTop: 150,
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  groupSection: {
   
    marginTop : 150,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    
    marginBottom: 20,
    

  },
  createButton: {
    alignItems: "center",
    justifyContent: "center",
    
  },
  createGroupBtn: {
    height : 40 ,
    width: 40,
    borderRadius: 30,
    backgroundColor: "white",

   
  },
  
});

export default Home;
