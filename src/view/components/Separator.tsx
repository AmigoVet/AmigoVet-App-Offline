import { View, Text } from 'react-native'
import React from 'react'

interface SeparatorProps {
  height: number
}

const Separator = ({ height }: SeparatorProps) => {
  return (
    <View  style={{height: height, width: '100%'}} />
  )
}

export default Separator