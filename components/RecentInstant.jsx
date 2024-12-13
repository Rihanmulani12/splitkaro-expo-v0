import React, { useState, useImperativeHandle, forwardRef, useEffect, useContext, useCallback } from "react";
import { StyleSheet, Text, Pressable, View, FlatList, TextInput, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const RecentInstant = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(true);
  const [instant, setInstant] = useState([{ _id: 1 }, { _id: 2 }]);

  const navigation = useNavigation();

  useImperativeHandle(ref, () => ({
    refetchInstant: () => {
      fetchInstant();
    }
  }));

  useEffect(() => {
    fetchInstant();
  }, []);

  const fetchInstant = () => {
    setLoading(true);
    setTimeout(() => {
      // Dummy data for Expo
      setInstant([
        { _id: 1, collection_name: "Electricity Bill", items: [{ price: 150 }], shares_graph: { user1: { total_balance: -50 } } },
        { _id: 2, collection_name: "Water Bill", items: [{ price: 100 }], shares_graph: { user1: { total_balance: 30 } } },
      ]);
      setLoading(false);
    }, 1000);
  };

  const actualInstant = (instant.length > 0 && loading === false) ? instant.filter(item => item?.items[0]?.price !== 0) : [];

  const renderItem = useCallback(({ item }) => {
    const balance = item.shares_graph?.user1?.total_balance || 0;
    const isPositive = balance > 0;

    return (
      <Pressable 
        style={styles.card} 
        onPress={() => {
          navigation.navigate("ExpenseDetails", { expense: item });
        }}
      >
        <Text style={styles.collectionName}>{item.collection_name}</Text>
        <Text style={[styles.balance, { color: isPositive ? "#70cf97" : "#fe6370" }]}>
          {isPositive ? `You will get $${balance}` : `You will pay $${Math.abs(balance)}`}
        </Text>
      </Pressable>
    );
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView source={require("../lottie/loading.json")} autoPlay loop style={styles.loadingAnimation} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Priority Bills</Text>
      <FlatList
        data={actualInstant}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  header: {
    fontFamily: "Metropolis-SemiBold",
    fontSize: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  collectionName: {
    fontFamily: "Metropolis-Medium",
    fontSize: 14,
    marginBottom: 5,
  },
  balance: {
    fontFamily: "Metropolis-Medium",
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingAnimation: {
    width: 100,
    height: 100,
  },
});

export default RecentInstant;
