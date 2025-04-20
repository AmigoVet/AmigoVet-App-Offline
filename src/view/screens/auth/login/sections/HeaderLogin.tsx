import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Iconlogo from '../../../../assets/svgs/Iconlogo'
import { newColors } from '../../../../styles/colors'
import CatSvg from '../../../../assets/svgs/animals/CatSvg'



const HeaderLogin = () => {
  return (
    <>
    <View style={styles.container}>
      <View style={{height: 2, width: 30}} />
      <Iconlogo fill={newColors.fondo_secundario} height={150} width={150} />
      <CatSvg fill={newColors.fondo_secundario} height={240} width={240} />
    </View>
    <View style={styles.miniContainer}>
      <Text style={[styles.subtiles, {fontSize: 36}]}>¡Hola!</Text>
      <Text style={styles.subtiles}>Bienvenid@ a AmigoVet</Text>
    </View>
    <Text style={styles.text}>Estamos felices de tenerte aqui</Text>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginRight: -5
  },
  miniContainer: {
    flexDirection: 'column',
    marginTop: -85,
    marginLeft: 30,
  },
  subtiles: {
    fontSize: 26,
    color: newColors.fondo_secundario,
    fontFamily: 'Synonym',
    fontWeight: '700',
  },
  text: {
    marginLeft: 30,
    fontSize: 16,
    color: newColors.fondo_secundario,
    fontFamily: 'Chillax-Extralight',
  }
})

export default HeaderLogin