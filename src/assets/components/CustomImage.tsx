import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'

interface CustomImageProps {
    source: string;
    full?: boolean;
}


const CustomImage = ({ source, full }: CustomImageProps) => {

  const windowWidth = Dimensions.get('window').width;


  return (
    <Image 
        source={{ uri: `file://${source}` }} 
        style={{ 
            width: full ? windowWidth : '100%',
            height: full ? 250 : 200, 
            borderRadius: 10, 
            marginBottom: 10 
        }} 
        resizeMode="cover"
    />
  )
}

export default CustomImage