import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import icons from '@/constants/icons';


const TabIcon = ({ icon, color, name, focused } : any) => {
  return (
    <View>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
      />
      <Text>
        {name}
      </Text>
    </View>
  );
};



export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
       <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
      <Tabs.Screen
        name="bills"
        options={{
          title: "Bills",
        }}
      />

      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
        }}
      />

      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
        }}
      />
    </Tabs>
  );
}