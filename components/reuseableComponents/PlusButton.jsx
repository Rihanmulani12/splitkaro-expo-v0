import { View, Text,Platform } from 'react-native'
import React from 'react'
import {Svg,Circle,Defs,LinearGradient,Stop,Rect,G} from "react-native-svg";

export default function PlusButton() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>

          <View style={{justifyContent: "center", alignItems: "center", height: 55, width: 55, borderRadius: 30 }}>
          <Svg height={Platform.OS=="ios"?55:52} width={Platform.OS=="ios"?55:52} viewBox={"0 0 50 50"}>
          
                  <Defs>
                      <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                          <Stop offset="0" stopColor="#5563DA" stopOpacity="1" />
                          <Stop offset="1" stopColor="#5563DA" stopOpacity="1" />
                      </LinearGradient>
                  </Defs>
              <Circle cx={25}  r={25} cy={25} fill="url(#grad)"></Circle>
              <Rect x="22.5" y="11" rx="2"  height="28" width="5"  fill="white" />
              <Rect x="11.3" y="22.5" rx="2"  height="5" width="28"  fill="white" />
           
          </Svg>
            
          </View>

      </View>
  )
}