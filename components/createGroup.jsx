import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import { 
  StyleSheet, Text, Pressable, View, Dimensions, TextInput, FlatList,
  KeyboardAvoidingView, Platform, SafeAreaView, StatusBar
} from "react-native";
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

const CreateGroup = forwardRef((props, ref) => {
  const modalBackdropColor = 'rgba(0,0,0,.4)';
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameError, setGroupNameError] = useState(false);
  const [selectedGroupType, setGroupType] = useState(null);

  useImperativeHandle(ref, () => ({
    showAlert: () => {
      setModalVisible(true);
    },
  }));

  const groupTypes = [
    { id: 1, type: "Home", name: "Home" },
    { id: 2, type: "Trip", name: "Trip" },
    { id: '2a', type: "Personal", name: "Personal" },
    { id: 3, type: "Office", name: "Office" },
    { id: 4, type: "Sports", name: "Sports" },
    { id: 0, type: "group", name: "Others" },
  ];

  const renderGroupTypes = ({ item, index }) => (
    <Pressable
      onPress={() => setGroupType(index)}
      style={{
        marginTop: 5,
        width: 65,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        paddingTop: 10,
        borderRadius: 15,
        borderColor: index === selectedGroupType ? "#7B61FF" : "white",
        backgroundColor: "#f6f6f6",
        marginRight: 10,
      }}
    >
      {item.type === 'Personal' && (
        <View
          style={{
            position: 'absolute',
            top: 2,
            left: 2,
            paddingVertical: 2,
            paddingHorizontal: 5,
            backgroundColor: "#FE6370",
            zIndex: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ fontSize: 8, color: "#ffffff" }}>New</Text>
        </View>
      )}
      <View
        style={{
          backgroundColor: "#FFF6EE",
          height: 45,
          width: 45,
          borderRadius: 25,
          marginBottom: 5,
          justifyContent: "center",
          paddingLeft: 2.5,
        }}
      />
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={{
          fontFamily: "Metropolis-SemiBold",
          marginBottom: 5,
          fontSize: 12,
        }}
      >
        {item.name}
      </Text>
    </Pressable>
  );

  const createGroup = () => {
    if (!groupName) {
      setGroupNameError(true);
      return;
    }
    if (selectedGroupType == null) {
      Toast.show({
        type: 'error',
        text1: 'Group type',
        text2: 'Please select group type.',
        visibilityTime: 1700,
        topOffset: 150,
      });
      return;
    }
    // Dummy function for group creation
    console.log("Group Created", { groupName, groupType: groupTypes[selectedGroupType].type });
    setModalVisible(false);
  };

  return (
    <>
      <StatusBar backgroundColor={modalVisible ? modalBackdropColor : undefined} />
      <Modal
        hideModalContentWhileAnimating
        deviceHeight={1000}
        useNativeDriverForBackdrop
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={modalVisible}
        backdropOpacity={0.4}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="zoomIn"
        animationOut="fadeOut"
        style={{ alignItems: "center", marginBottom: windowHeight * 0.12 }}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : null}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 30,
              width: windowWidth * 0.8,
              borderRadius: 10,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                marginBottom: 20,
                fontSize: 19,
                color: "#2c365a",
                fontFamily: "Metropolis-SemiBold",
              }}
            >
              Create a group
            </Text>
            <Text
              style={{
                paddingLeft: 4,
                fontSize: 12,
                color: "#999999",
                fontFamily: "Metropolis-Regular",
              }}
            >
              Group name
            </Text>
            <TextInput
              allowFontScaling={false}
              maxLength={30}
              placeholderTextColor="black"
              placeholder="Enter a group name"
              onChangeText={(text) => {
                setGroupNameError(false);
                setGroupName(text);
              }}
              style={{
                color: "#2c365a",
                height: 40,
                borderRadius: 5,
                borderColor: groupNameError ? "#ff7474" : "#CCCCCC",
                borderBottomWidth: 1,
                fontFamily: "Metropolis-SemiBold",
              }}
            />
            <View style={{ marginTop: 10 }}>
              <FlatList
                keyboardShouldPersistTaps="handled"
                showsHorizontalScrollIndicator={false}
                horizontal
                data={groupTypes}
                renderItem={renderGroupTypes}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
            <View style={{ display: "flex", flexDirection: "row-reverse", marginTop: 20 }}>
              <Pressable onPress={createGroup}>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 25,
                    backgroundColor: "#000000",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 130,
                  }}
                >
                  <Text
                    adjustsFontSizeToFit
                    style={{
                      fontFamily: "Metropolis-SemiBold",
                      color: "white",
                      fontSize: 15,
                    }}
                  >
                    Create
                  </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  setGroupNameError(false);
                  setGroupName("");
                  setGroupType(null);
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Metropolis-SemiBold",
                      color: "#000000",
                      fontSize: 15,
                    }}
                  >
                    Cancel
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
        <Toast />
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({});

export default CreateGroup;
