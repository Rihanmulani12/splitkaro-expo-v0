import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  Dimensions, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import Svg , { Path } from 'react-native-svg';


const GROUP_TYPES = [
  { id: 1, type: 'Home', name: 'Home', icon: '🏠' },
  { id: 2, type: 'Trip', name: 'Trip', icon: '🧳' },
  { id: 3, type: 'Personal', name: 'Personal', icon: '👤' },
  { id: 0, type: 'Others', name: 'Others', icon: '➕' }
];






const CreateGroupModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedGroupType, setSelectedGroupType] = useState(null);
  const [groupNameError, setGroupNameError] = useState(false);

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

  const renderGroupType = ({ item, index } : any) => (
    <TouchableOpacity 
      onPress={() => setSelectedGroupType(index)}
      style={[
        styles.groupTypeButton, 
        selectedGroupType === index && styles.selectedGroupType
      ]}
    >
      {item.type === 'Personal' && (
        <View>
          <Text style={styles.newBadgeText}>New</Text>
        </View>
      )}
      <View style={styles.groupTypeIcon}>
        <Text style={styles.groupTypeIconText}>{item.icon}</Text>
      </View>
      <Text style={styles.groupTypeText} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const handleCreateGroup = () => {
    if (groupName.trim() === '') {
      setGroupNameError(true);
      return;
    }
    if (selectedGroupType === null) {
      
      return;
    }
    
   
    console.log('Creating group:', { 
      name: groupName, 
      type: GROUP_TYPES[selectedGroupType].type 
    });
    
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      

     
    
      <View style={styles.createGroupTriggerContainer}>
      <Text style={styles.createGroupTriggerText}>Create Group</Text>
      <TouchableOpacity 
      //@ts-ignore
        onPress={() => setModalVisible(true)} 
        style={styles.createGroupButton}
      >
        <Svg 
          width="30" 
          height="30" 
          viewBox="0 0 14 14" 
          fill="none"
        >
          <Path 
            d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" 
            fill="black" 
            fillOpacity="0.54"
          />
        </Svg>
      </TouchableOpacity>
    </View>

      

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: windowWidth * 0.8 }]}>
            <Text style={styles.modalTitle}>Create a New</Text>
            
           
            <Text style={styles.inputLabel}>Group Name</Text>
            <TextInput
              placeholder="Enter a group name"
              value={groupName}
              onChangeText={(text) => {
                setGroupName(text);
                setGroupNameError(false);
              }}
              style={[
                styles.input,
                groupNameError && styles.inputError
              ]}
              maxLength={30}
            />

           
            <View style={styles.groupTypesContainer}>
              <FlatList
                horizontal
                data={GROUP_TYPES}
                renderItem={renderGroupType}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                onPress={handleCreateGroup} 
                style={styles.createButton}
              >
                <Text style={styles.createButtonText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)} 
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
   
    backgroundColor : "white",
    marginRight: "60%",
   
    
    
    
    
  },
  createGroupButton: {
    backgroundColor : "white",
    
    
   

    
  },
  createGroupButtonText: {
    color: 'black',
    fontWeight: 'semibold',
    fontSize: 20,
  },
  modalOverlay: {
   
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position : "absolute",
    top : 0,
    left : 0,
    right : 0,
    bottom : 0
    
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems : "center"
    
  },
  modalTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c365a',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: '#999999',
    fontSize: 12,
    padding : 10
    
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginBottom: 20,
    paddingVertical: 10,
  },
  inputError: {
    borderBottomColor: '#ff7474',
  },
  groupTypesContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft : 20
    

  },
  groupTypeButton: {
    marginRight: 10,
    width: 65,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#f6f6f6',
  },
  selectedGroupType: {
    borderColor: '#7B61FF',
  },
  groupTypeIcon: {
    backgroundColor: '#FFF6EE',
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  groupTypeIconText: {
    fontSize: 20,
  },
  groupTypeText: {
    fontSize: 12,
    fontWeight: '500',
  },
 
  newBadgeText: {
    fontSize: 8,
    color: 'white',
  },
  actionButtons: {
    flexDirection: 'row-reverse',
    marginTop: 20,
    marginBottom: 20,
    width: '90%',
  },
  createButton: {
    backgroundColor: '#7B61FF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
    marginLeft: 20,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  createGroupTriggerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createGroupTriggerText: {
    color: 'black',
    padding: 10,
    fontSize: 15,
    fontWeight: '600',
    marginRight: 10,
  },
});

export default CreateGroupModal;