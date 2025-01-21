import { View, Text, Image, Dimensions, StyleProp, ImageStyle } from 'react-native';
import React from 'react'

interface CustomImageProps {
    source: string;
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
          borderTopLeftRadius: full ? 0 : 30,
          borderTopRightRadius: full ? 0 : 30,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        },
        style, 
      ]}
    />
  );
};


export default CustomImage