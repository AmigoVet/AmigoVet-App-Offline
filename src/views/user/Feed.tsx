import { View, Text } from 'react-native'
import React from 'react'
import { createGlobalStyles } from '../../assets/styles/styles'

const Feed = () => {

  const globalStyles = createGlobalStyles(false);

  return (
    <View style={globalStyles.container}>
      <Text>Feed</Text>
    </View>
  )
}

export default Feed