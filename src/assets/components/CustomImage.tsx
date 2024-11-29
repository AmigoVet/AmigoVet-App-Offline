import { View, Text, Image } from 'react-native'
import React from 'react'

interface CustomImageProps {
    source: string;
    full?: boolean;
}


const CustomImage = ({ source, full }: CustomImageProps) => {
  return (
    <Image 
        source={{ uri: `file://${source}` }} 
        style={{ 
            width: full ? '100%' : '110%',
            height: 200, 
            borderRadius: 10, 
            marginBottom: 10 
        }} 
        resizeMode="cover"
    />
  )
}

export default CustomImage