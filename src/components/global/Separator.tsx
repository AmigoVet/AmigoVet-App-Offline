import { View, Text } from 'react-native'
import React from 'react'

interface SeparatorProps {
  height: number
}

const Separator = ({height = 100}: SeparatorProps) => {
  return (
    <View style={{ height: height }} />
  )
}

export default Separator