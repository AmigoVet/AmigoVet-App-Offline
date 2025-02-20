import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { newColors } from '../../../../assets/styles/colors'
import { constants } from '../../../../assets/styles/constants'

const ExtraData = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerContainer}>
        <Text style={styles.title}>Descripcion</Text>
        <Text style={styles.info}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non fuga facere sit! Iusto eligendi, esse aliquam voluptatem, itaque ab quos at molestiae officiis corporis dolores obcaecati deleniti distinctio. Ex, eaque.</Text>
      </View>
      <View style={styles.containerContainer}>
        <Text  style={styles.title}>Ubicacion</Text>
        <Text style={styles.info}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non fuga facere sit! Iusto eligendi, esse aliquam voluptatem, itaque ab quos at molestiae officiis corporis dolores obcaecati deleniti distinctio. Ex, eaque.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    gap: 10,
  },
  containerContainer: {
    backgroundColor: newColors.verde,
    width: '90%',
    borderRadius: constants.borderRadius,
    padding: 10,
    paddingHorizontal: 15,
    gap: 10,
  },
  title:{
    fontWeight: 'bold',
    color: newColors.fondo_principal,
  },
  info: {
    color: newColors.principal,
  }
})

export default ExtraData