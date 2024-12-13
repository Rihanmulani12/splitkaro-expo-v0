import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import CreateGroup from "../../components/createGroup";
import React, { useRef } from "react";

const Home = () => {
  const createGroupRef = useRef(console.log("ref"));

  return (
    <>
    
    <View style={styles.container}>
     
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.topSection}>
        <View style={styles.iconSection}>
          <View style={styles.iconContainer}>
            <Pressable style={styles.iconButton}>
              <Text style={styles.iconText}>A</Text>
            </Pressable>
            <Text style={styles.labelText}>Account</Text>
          </View>

          <View style={styles.iconContainer}>
            <Pressable style={styles.iconButton}>
              <Text style={styles.iconText}>W</Text>
            </Pressable>
            <Text style={styles.labelText}>Wallet</Text>
          </View>
        </View>
      </View>

      

      


      <View style={styles.container}>
        <View style={styles.groupSection}>
          <Pressable
            onPress={() => createGroupRef.current?.showAlert()}
            style={styles.createButton}
          >
            <Text style={styles.createButtonText}>Create Group</Text>
          </Pressable>

          
          <CreateGroup ref={createGroupRef} />
        </View>
      </View>

      
        <View style={styles.bannerSection}>
          <Image
            source={require("../../assets/OnlineVendorsEntryCard.png")}
            resizeMode="contain"
            style={styles.bannerImage}
          />
        </View>
      </ScrollView>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
    backgroundColor: "darkgray",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
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
  },
  scrollContainer: {
    padding: 15,
  },
  bannerSection: {
    marginBottom: 20,
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  groupSection: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  groupList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  groupCard: {
    width: "30%",
    alignItems: "center",
  },
  groupButton: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
  },
  groupText: {
    color: "white",
    fontSize: 14,
  },
});

export default Home;
