import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "@/components/LoginScreen";


const loginscreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Login/>
    </SafeAreaView>
  );
};

export default loginscreen;
