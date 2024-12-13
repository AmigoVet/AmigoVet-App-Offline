import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
    name: string
    size: number
    color: string
}

const CustomIcon = ({ name, size, color }: Props) => {
  return (
    <Ionicons name={name} size={size} color={color} />
  )
}

export default CustomIcon