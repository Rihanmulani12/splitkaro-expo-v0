import React, { useState, useImperativeHandle, forwardRef, useEffect, useContext, useCallback } from "react";
import { StyleSheet, Text, Pressable, View, FlatList, Dimensions, StatusBar } from "react-native";
import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Svg, Rect } from "react-native-svg";

const RecentGroups = forwardRef((props, ref) => {
  const [groups, setGroups] = useState([]); // Dummy groups data
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useImperativeHandle(ref, () => ({
    refetchGroups: () => {
      console.log("Refetching groups...");
      setLoading(true);
      setTimeout(() => {
        // Dummy data
        setGroups([
          { _id: "1", group_name: "Family", group_type: "Home" },
          { _id: "2", group_name: "Trip", group_type: "Trip" },
          { _id: "3", group_name: "Work", group_type: "Office" }
        ]);
        setLoading(false);
      }, 1000);
    },
  }));

  useEffect(() => {
    ref.current?.refetchGroups();
  }, []);

  const handleGroupPress = useCallback((item) => {
    const { _id, group_name, group_type } = item;
    navigation.navigate('GroupView', { group_id: _id, group_name, group_type });
    console.log(`Navigated to group: ${group_name}`);
  }, [navigation]);

  const handleAddExpense = useCallback((item) => {
    console.log(`Adding expense to group: ${item.group_name}`);
  }, []);

  const renderGroups = useCallback(({ item }) => (
    <View style={styles.groupContainer}>
      <Pressable 
        android_ripple={{color: "green", radius: 100}} 
        style={styles.addExpenseButton} 
        onPress={() => handleAddExpense(item)}
      >
        <View style={styles.addExpenseIcon}>
          <Svg height={22} width={22} viewBox="0 0 50 50">
            <Rect x="22.5" y="11" rx="2" height="28" width="5" fill="white" />
            <Rect x="11.3" y="22.5" rx="2" height="5" width="28" fill="white" />
          </Svg>
        </View>
      </Pressable>
      <Pressable onPress={() => handleGroupPress(item)} style={styles.groupButton}>
        <View style={styles.groupLogo}>
          <View style={styles.logo} />
        </View>
        <View style={styles.groupNameContainer}>
          <Text 
            ellipsizeMode="tail" 
            numberOfLines={1} 
            style={styles.groupName}
          >
            {item.group_name}
          </Text>
        </View>
      </Pressable>
    </View>
  ), [handleAddExpense, handleGroupPress]);

  if (loading) {
    return (
      <View style={styles.skeletonContainer}>
        {[...Array(3)].map((_, index) => (
          <SkeletonPlaceholder key={index} borderRadius={10} borderWidth={1}>
            <SkeletonPlaceholder.Item 
              borderRadius={15} 
              width={60} 
              height={75} 
              marginTop={4} 
              marginRight={10}
            />
          </SkeletonPlaceholder>
        ))}
      </View>
    );
  }

  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={groups}
      renderItem={renderGroups}
      keyExtractor={item => item._id.toString()}
    />
  );
});

const styles = StyleSheet.create({
  groupContainer: {
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: "#F6F6F6",
    top: 2.5,
  },
  addExpenseButton: {
    zIndex: 1,
    marginBottom: -20,
    marginLeft: 44,
  },
  addExpenseIcon: {
    height: 27,
    width: 25,
    right: 0,
    zIndex: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 1,
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 2,
    backgroundColor: "#5563DA",
    top: -2.5,
    right: -2.5,
    alignItems: "center",
    justifyContent: 'center',
  },
  groupButton: {
    marginTop: 5,
    width: 70,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
  },
  groupLogo: {
    backgroundColor: "#FFF6EE",
    height: 45,
    width: 45,
    borderRadius: 25,
    marginBottom: 5,
    justifyContent: "center",
    paddingLeft: 2.5,
    paddingTop: 10,
  },
  logo: {
    marginLeft: -3,
    marginTop: -10,
    backgroundColor: "#e3e3e3",
    height: 35,
    width: 35,
    borderRadius: 17.5,
  },
  groupNameContainer: {
    paddingRight: 1,
  },
  groupName: {
    fontFamily: "Metropolis-SemiBold",
    marginBottom: 5,
    fontSize: 12,
  },
  skeletonContainer: {
    flexDirection: "row",
  },
});

export default RecentGroups;
