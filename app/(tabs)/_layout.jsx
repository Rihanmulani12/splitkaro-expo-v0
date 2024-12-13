

import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          
        }}
      />
      <Tabs.Screen
        name="bills"
        options={{
          title: "Bill",
          
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Gill",
         
        }}
      />

      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
         
        }}
      />
    </Tabs>
  );
}
