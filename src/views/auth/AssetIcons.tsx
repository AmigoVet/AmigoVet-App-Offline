import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import CatSvg from '../../assets/svgs/animals/CatSvg'
import CowSvg from '../../assets/svgs/animals/CowSvg'
import DogSvg from '../../assets/svgs/animals/DogSvg'
import Iconlogo from '../../assets/svgs/Iconlogo'

const AssetIcons = () => {
    const { width, height } = Dimensions.get('window');
    
  return (
    <View style={[styles.svgContainer, { pointerEvents: 'none' }]}>
    <Iconlogo
      height={width * 0.35}
      width={width * 0.35}
      style={{
        position: 'absolute',
        top: 0,
        left: 20,
      }}
    />
    <CatSvg
      style={{
        width: width * 0.5,
        height: width * 0.5,
        position: 'absolute',
        top: 0,
        right: -5,
      }}
    />
    <CowSvg
      style={{
        width: width * 0.5,
        height: width * 0.5,
        position: 'absolute',
        bottom: -30,
        left: 0,
      }}
    />
    <DogSvg
      style={{
        width: width * 0.5,
        height: width * 0.5,
        position: 'absolute',
        bottom: -80,
        right: -50,
      }}
    />
  </View>
  )
}

export default AssetIcons

const styles = StyleSheet.create({
  svgContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  }
});