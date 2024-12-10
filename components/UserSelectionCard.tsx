import React from 'react';
import { Image } from 'react-native';
import { TouchableContainer } from './Restyle/TouchableContainer';
import { Card, Text, Box, W } from '@/constants/Theme';

const UserSelectionCard = ({ item, onPress }: { item: any; onPress: () => void }) => {
  return (
    <TouchableContainer
      alignItems="center"
      justifyContent="center"
      onPress={onPress}
    >
      <Card
        padding={4}
        width={W * 0.4}
        height={W * 0.44}
        overflow="visible"
        marginVertical={12}
        alignItems="center"
        shadowOpacity={0.7}
        variant="elevated"
        justifyContent="space-between"
        style={{
          elevation: 10,
          shadowRadius: 5,
          borderRadius: 18,
          backgroundColor: '#FFFFFF',
          shadowOffset: { width: 5, height: 5 },
        }}
      >
        <Box width={100} height={100}>
          <Image
            source={item.photo}
            resizeMode="contain"
            style={{
              width: 100,
              height: 100,
            }}
          />
        </Box>

        <Text
          lineHeight={18}
          variant="regular"
          marginBottom="s"
          textAlign="center"
          allowFontScaling={false}
        >
          {item.title}
        </Text>
      </Card>
    </TouchableContainer>
  );
};

export default UserSelectionCard;
