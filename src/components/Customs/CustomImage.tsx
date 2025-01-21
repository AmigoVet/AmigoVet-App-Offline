import { View, Text, Image, Dimensions, StyleProp, ImageStyle } from 'react-native';
import React from 'react'

interface CustomImageProps {
    source: string;
    full?: boolean;
    style?: StyleProp<ImageStyle>;
}


const CustomImage = ({ source, full, style }: CustomImageProps) => {

  const windowWidth = Dimensions.get('window').width;
  return (
    <Image 
        source={{ uri: `file://${source}` }} 
        style={[{ 
            width: full ? windowWidth : '100%',
            height: full ? 250 : 200, 
            borderRadius: 30, 
            marginBottom: 10,
            marginHorizontal: full ? -10 : 0,
            zIndex: 10,
        }, style]}
        resizeMode="cover"
    />
  )
}

export default CustomImage