import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { newColors } from '../../../../assets/styles/colors'

const Notes = () => {
  return (
    <View style={styles.container}>
      <Text>Notes</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: newColors.fondo_secundario
  }
})

export default Notes