import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import Modal from "react-native-modal";

const CreateGroupModal = ({ isVisible, onClose, onGroupCreate }) => {
  const groupTypes = [
    { id: 1, type: "Home", name: "Home" },
    { id: 2, type: "Trip", name: "Trip" },
    { id: "2a", type: "Personal", name: "Personal" },
    { id: 3, type: "Office", name: "Office" },
    { id: 4, type: "Sports", name: "Sports" },
    { id: 0, type: "group", name: "Others" },
  ];

  const renderGroupTypes = ({ item }) => (
    <Pressable style={styles.groupTypeContainer}>
      {item.type === "Personal" && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>New</Text>
        </View>
      )}
      <View style={styles.groupTypeIcon} />
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.groupTypeText}>
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <>
      <StatusBar backgroundColor="rgba(0,0,0,0.4)" />
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        backdropOpacity={0.4}
        animationIn="zoomIn"
        animationOut="fadeOut"
        style={styles.modalContainer}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : undefined}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create a group</Text>
            <Text style={styles.inputLabel}>Group name</Text>
            <TextInput
              allowFontScaling={false}
              maxLength={30}
              placeholderTextColor="#999999"
              placeholder="Enter a group name"
              style={styles.groupNameInput}
            />
            <View style={styles.groupTypesContainer}>
              <FlatList
                keyboardShouldPersistTaps="handled"
                showsHorizontalScrollIndicator={false}
                horizontal
                data={groupTypes}
                renderItem={renderGroupTypes}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Pressable onPress={() => onGroupCreate({ name: "Example Group" })}>
                <View style={styles.createButton}>
                  <Text style={styles.createButtonText}>Create</Text>
                </View>
              </Pressable>
              <Pressable onPress={onClose}>
                <View style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
    marginBottom: Dimensions.get("window").height * 0.12,
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: Dimensions.get("window").width * 0.8,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    marginBottom: 20,
    fontSize: 19,
    color: "#2c365a",
    fontFamily: "Metropolis-SemiBold",
  },
  inputLabel: {
    paddingLeft: 4,
    fontSize: 12,
    color: "#999999",
    fontFamily: "Metropolis-Regular",
  },
  groupNameInput: {
    color: "#2c365a",
    height: 40,
    borderRadius: 5,
    borderColor: "#CCCCCC",
    borderBottomWidth: 1,
    fontFamily: "Metropolis-SemiBold",
  },
  groupTypesContainer: {
    marginTop: 10,
  },
  groupTypeContainer: {
    marginTop: 5,
    width: 65,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    paddingTop: 10,
    borderRadius: 15,
    backgroundColor: "#f6f6f6",
    marginRight: 10,
  },
  newBadge: {
    position: "absolute",
    top: 2,
    left: 2,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: "#FE6370",
    zIndex: 10,
    borderRadius: 5,
  },
  newBadgeText: {
    fontSize: 8,
    color: "#ffffff",
  },
  groupTypeIcon: {
    backgroundColor: "#FFF6EE",
    height: 45,
    width: 45,
    borderRadius: 25,
    marginBottom: 5,
    justifyContent: "center",
    paddingLeft: 2.5,
  },
  groupTypeText: {
    fontFamily: "Metropolis-SemiBold",
    marginBottom: 5,
    fontSize: 12,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    marginTop: 20,
  },
  createButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    width: 130,
  },
  createButtonText: {
    fontFamily: "Metropolis-SemiBold",
    color: "white",
    fontSize: 15,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: "Metropolis-SemiBold",
    color: "#000000",
    fontSize: 15,
  },
});

export default CreateGroupModal;
