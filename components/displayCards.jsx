import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const DisplayCards = () => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const cards = [
        {
            id: 1,
            name: "Groups",
            details: "Want to log bills & settle up later? Create a group of expenses.",
            icon: "group"
        },
        {
            id: 2,
            name: "Priority Bills",
            details: "Want to settle up your expense urgently? Mark your expense as priority bill.",
            icon: "instant2"
        },
        {
            id: 3,
            name: "Collection",
            details: "Tired of adding expenses one by one? Add all at once to a collection.",
            icon: "collection"
        }
    ];

    const renderItems = ({ item }) => {
        return (
            <Pressable 
                onPress={() => {
                    navigation.navigate("Banner", { type: item.id, name: item.name });
                }} 
                style={styles.card}
            >
                <View style={styles.iconContainer}>
                    <Text>{item.icon}</Text>
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardDetails}>{item.details}</Text>
                </View>
            </Pressable>
        );
    };

    return (
        <>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <LottieView source={require("../lottie/loading.json")} autoPlay loop style={styles.loadingAnimation} />
                </View>
            ) : (
                <FlatList 
                    contentContainerStyle={styles.listContainer} 
                    keyboardShouldPersistTaps="handled" 
                    showsHorizontalScrollIndicator={false} 
                    horizontal={true} 
                    data={cards} 
                    renderItem={renderItems} 
                    keyExtractor={item => item.id.toString()}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "white",
        width: 260,
        borderRadius: 10,
        marginLeft: 15,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth: 1.5,
        borderColor: "#FBB03B",
        alignItems: "center",
    },
    iconContainer: {
        height: 40,
        width: 40,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#FBB03B",
        borderWidth: 2,
    },
    cardContent: {
        marginLeft: 10,
        flex: 1,
    },
    cardTitle: {
        fontFamily: "Metropolis-SemiBold",
        fontSize: 14,
    },
    cardDetails: {
        fontFamily: "Metropolis-Medium",
        fontSize: 11,
        color: "#4D4D4D",
        marginTop: 1,
    },
    listContainer: {
        paddingRight: 20,
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

export default DisplayCards;
