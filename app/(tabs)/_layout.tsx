import { Tabs } from "expo-router";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Svg, { Path } from "react-native-svg";

// Home Icon Component
const HomeIcon = ({ color, size = 24 }: { color: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 22V12h6v10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);


const BillsIcon = ({ color, size = 24 }: { color: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 7H17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 11H14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 15H12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Groups Icon Component
const GroupsIcon = ({ color, size = 24 }: { color: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 9a4 4 0 100-8 4 4 0 000 8zM22 20v-2a4 4 0 00-3-3.87M15 4.13a4 4 0 010 7.75"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Friends Icon Component
const FriendsIcon = ({ color, size = 24 }: { color: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 20v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 9a4 4 0 100-8 4 4 0 000 8z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Tab Icon Component
const TabIcon = ({ 
  icon: Icon, 
  color, 
  name, 
  focused 
}: { 
  icon: React.ComponentType<{ color: string; size?: number }>, 
  color: string, 
  name: string, 
  focused: boolean 
}) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center", 
      justifyContent: "center",
      marginTop : 15
    },
    text: {
      color: focused ? color : "white",
      fontSize: 8,
      marginBottom : 2,
      paddingTop : 2,
    
    }
  });

  return (
    <View style={styles.container}>
      <Icon 
        color={focused ? color : "blue"} 
        size={25} 
      />
      <Text style={styles.text}>
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? "light"].tint;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 8,
          height: 70
        },
        tabBarLabel : () => null
    
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              icon={HomeIcon} 
              name="Home" 
              focused={focused} 
              color={activeColor} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bills"
        options={{
          title: "Bills",
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              icon={BillsIcon} 
              name="Bills" 
              focused={focused} 
              color={activeColor} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              icon={FriendsIcon} 
              name="Friends" 
              focused={focused} 
              color={activeColor} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              icon={GroupsIcon} 
              name="Groups" 
              focused={focused} 
              color={activeColor} 
            />
          ),
        }}
      />
    </Tabs>
  );
}