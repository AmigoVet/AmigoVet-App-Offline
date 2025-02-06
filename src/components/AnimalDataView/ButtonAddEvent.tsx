import { View, Text } from 'react-native'
import React from 'react'
import { CustomIcon } from '../Customs'
import { StyleSheet } from 'react-native'
import { newColors } from '../../assets/styles/colors'

const ButtonAddEvent = () => {
  return (
    <>
      <View style={styles.btn}>
        <CustomIcon name="calendar-outline" size={24} color={newColors.fondo_principal} />
      </View>
    </>
  )
}

export default ButtonAddEvent


const styles = StyleSheet.create({
  btn: {
    backgroundColor: newColors.verde_light,
    position: 'absolute',
    zIndex: 10,
    bottom: 140,
    right: 20,
    borderRadius: 50,
    padding: 10,
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})