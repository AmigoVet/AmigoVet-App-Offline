import { View, Text, StyleProp, StyleSheet } from 'react-native';
import React from 'react'
import CowSvg from '../../../../assets/svgs/animals/CowSvg';
import { newColors } from '../../../../styles/colors';
import DogSvg from '../../../../assets/svgs/animals/DogSvg';

const FooterLogin = () => {
  return (
    <View style={styles.container}>
      <CowSvg fill={newColors.fondo_secundario} height={200} width={200} />
      <DogSvg style={{marginRight: -60}} fill={newColors.fondo_secundario} height={200} width={200} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:'space-between',
  },
})

export default FooterLogin