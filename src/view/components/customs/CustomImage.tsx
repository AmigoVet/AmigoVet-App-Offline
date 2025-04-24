import { View, Text, Image, Dimensions, StyleProp, ImageStyle } from 'react-native';
import React from 'react';
import { constants } from '../../styles/constants';

interface CustomImageProps {
  source: string | undefined;
  full?: boolean;
  style?: StyleProp<ImageStyle>;
}

const CustomImage = ({ source, full, style }: CustomImageProps) => {
  // Mostrar placeholder si no hay source
  if (!source) {
    return (
      <View
        style={[
          {
            width: full ? Dimensions.get('window').width : '100%',
            height: full ? 250 : 100,
            backgroundColor: '#e0e0e0',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: full ? 0 : constants.borderRadius,
            borderTopRightRadius: full ? 0 : constants.borderRadius,
            borderBottomLeftRadius: constants.borderRadius,
            borderBottomRightRadius: constants.borderRadius,
          },
          style,
        ]}
      >
        <Text>Sin imagen</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: source }}
      style={[
        {
          width: full ? Dimensions.get('window').width : '100%',
          height: full ? 250 : 100,
          resizeMode: 'cover',
          borderTopLeftRadius: full ? 0 : constants.borderRadius,
          borderTopRightRadius: full ? 0 : constants.borderRadius,
          borderBottomLeftRadius: constants.borderRadius,
          borderBottomRightRadius: constants.borderRadius,
        },
        style,
      ]}
    />
  );
};

export default CustomImage;