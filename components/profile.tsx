import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { ViewStyle ,Pressable , PressableProps } from "react-native";


interface ProfileProps extends PressableProps {
    width?: number;
    height?: number;
    fillColor?: string;
    containerStyle?: ViewStyle;
}

const Profile : React.FC<ProfileProps> = (
    {
         width = 20,
         height = 20,
         fillColor = "white",
          containerStyle,
          ...pressableProps
    }
 
) => {

  return (
    <Pressable style={[styles.container]} {...pressableProps}>
      <Svg width={width} height={height} viewBox="0 0 165 157" fill="none">
        <Path
          d="M82.5 91.5624C65.076 91.5624 50.886 78.0604 50.886 61.4812C50.886 44.902 65.076 31.4 82.5 31.4C99.924 31.4 114.114 44.902 114.114 61.4812C114.114 78.0604 99.924 91.5624 82.5 91.5624ZM82.5 39.9722C70.059 39.9722 59.928 49.612 59.928 61.4498C59.928 73.2876 70.059 82.9274 82.5 82.9274C94.941 82.9274 105.072 73.2876 105.072 61.4498C105.072 49.612 94.941 39.9722 82.5 39.9722Z"
          fill="white"
        />
        <Path
          d="M127.677 125.946H118.635C118.635 106.98 102.432 91.5626 82.5 91.5626C62.568 91.5626 46.365 106.98 46.365 125.946H37.323C37.323 102.239 57.585 82.959 82.5 82.959C107.415 82.959 127.677 102.239 127.677 125.946Z"
          fill="white"
        />
      </Svg>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
});

export default Profile;
