import React from 'react';
import { View} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeScreen = ({ children,color="white",active } : { children: React.ReactNode,color?:string,active?:boolean }) => {
  const insets = useSafeAreaInsets();
  return (
    <>
        {active!=false?(<>
    <View style={{   paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right, flex: 1 ,backgroundColor:color}}>
      {children}
    </View></>):(<>{children}</>)}
    </>
  );
};

export default SafeScreen;