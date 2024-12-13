
import React from 'react';
import { Linking } from 'react-native';

import FastImage from 'react-native-fast-image';
//import { analytics } from '../../configs/analytics';
import {W} from '@/constants/Theme';

import {TouchableContainer} from '../Restyle';

const NewBanner = (props) => {

  let imageAspectRatio = props.imageAspectRatio?props.imageAspectRatio:520/160; // Image Size 520*160
  const navigation = useNavigation();

  return (
    <TouchableContainer
      mt="s"
      px="m"
      borderRadius={16}
      alignItems={'center'}
      onPress={() =>{
        if(props.redirect)
        {
            Linking.openURL(props.redirect);
            analytics.track('Dynamic Banner Clicked');
        }else
        if(props.type=="refer_banner")
        {
          navigation.navigate("ReferralInviteScreen")
          analytics.track('Home Refer Banner Clicked');
        
        }else if(props.type=="campaign"){
          navigation.navigate("Campaign",{image:props.imageUrl,title:""})
          analytics.track('Campaign Banner Clicked');
        }
        else{
          navigation.navigate('NewFeaturesScreen')
          analytics.track('New feature banner pressed',{image:props.imageUrl});
        }
       
        }}>
      <FastImage
        style={{
          width: W - 32,
          borderRadius: props.borderRadius>0?props.borderRadius:12,
          height: (W - 32) / imageAspectRatio,
          marginTop:3
        }}
        source={{uri: props.imageUrl}}
      />
    </TouchableContainer>
  );
};

export default NewBanner;
