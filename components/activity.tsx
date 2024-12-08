import React from "react";
import {
  Pressable,
  PressableProps,
  ViewStyle,
  StyleSheet,
  Text,
} from "react-native";
import Svg, { Path } from "react-native-svg";


interface ActivityButtonProps extends PressableProps {
  width?: number;

  height?: number;

  fillColor?: string;

  containerStyle?: ViewStyle;

  badgeCount?: number;
}

const ActivityButton: React.FC<ActivityButtonProps> = ({
  width = 20,
  height = 20,
  fillColor = "white",
  containerStyle,
  badgeCount,
  ...pressableProps
}) => {
  return (
    <Pressable style={[styles.container, containerStyle]} {...pressableProps}>
      <Svg width={width} height={height} viewBox="0 0 12 14" fill="none">
        <Path
          d="M5.72497 13.4431C6.7497 13.4431 7.58338 12.6267 7.63548 11.6194H3.81445C3.86656 12.6267 4.70024 13.4431 5.72497 13.4431Z"
          fill={fillColor}
        />
        <Path
          d="M9.14665 4.9326C9.14665 3.43893 8.20877 2.10157 6.8714 1.59789C6.90614 1.47631 6.94088 1.33736 6.94088 1.21578C6.94088 0.538418 6.40246 0 5.7251 0C5.04773 0 4.54405 0.538418 4.54405 1.21578C4.54405 1.35473 4.56142 1.47631 4.61352 1.59789C3.27616 2.10157 2.33827 3.43893 2.33827 4.9326C2.33827 6.82575 1.83459 8.02417 0.358284 9.50047C-0.475395 10.3342 0.254074 11.0984 1.43512 11.0984H5.7251H10.0498C11.2309 11.0984 11.9603 10.3342 11.1266 9.50047C9.6677 8.02417 9.14665 6.80838 9.14665 4.9326Z"
          fill={fillColor}
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

export default ActivityButton;
