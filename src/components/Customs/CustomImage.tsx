import { View, Text, Image, Dimensions, StyleProp, ImageStyle } from 'react-native';
import React from 'react'
import { constants } from '../../assets/styles/constants';

interface CustomImageProps {
    source: string | undefined;
    full?: boolean;
    style?: StyleProp<ImageStyle>;
}


const CustomImage = ({ source, full, style }: CustomImageProps) => {
  return (
    <Image
      source={{ uri: `file://${source}` }}
      style={[
        {
          width: full ? Dimensions.get('window').width : '100%',
          height: full ? 250 : '100%',
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


export default CustomImage