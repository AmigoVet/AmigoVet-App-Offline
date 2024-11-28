import { View, Text, Image } from 'react-native'
import React from 'react'

interface CustomImageProps {
    source: string;
}


const CustomImage = ({ source }: CustomImageProps) => {
  return (
    <Image 
        source={{ uri: `file://${source}` }} 
        style={{ 
            width: '100%', 
            height: 200, 
            borderRadius: 10, 
            marginBottom: 10 
        }} 
        resizeMode="cover"
    />
  )
}

export default CustomImage