import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import CatSvg from '../../assets/svgs/animals/CatSvg';
import CowSvg from '../../assets/svgs/animals/CowSvg';
import DogSvg from '../../assets/svgs/animals/DogSvg';
import Iconlogo from '../../assets/svgs/Iconlogo';
import { horizontalScale, verticalScale } from '../../lib/functions/scale';
import { newColors } from '../../assets/styles/colors';

const AssetIcons = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  
  // Cálculo de tamaños basados en la proporción de la pantalla
  const logoSize = Math.min(horizontalScale(130), screenWidth * 0.35);
  const animalSize = Math.min(horizontalScale(180), screenWidth * 0.45);
  
  return (
    <View style={[styles.svgContainer, { pointerEvents: 'none' }]}>
      <Iconlogo
      fill={newColors.fondo_secundario}
        height={logoSize}
        width={logoSize}
        style={{
          position: 'absolute',
          top: verticalScale(0),
          left: horizontalScale(20),
        }}
      />
      <CatSvg
      fill={newColors.fondo_secundario}
      style={{
          width: animalSize,
          height: animalSize,
          position: 'absolute',
          top: verticalScale(0),
          right: horizontalScale(-5),
        }}
      />
      <CowSvg
      fill={newColors.fondo_secundario}
      style={{
          width: animalSize,
          height: animalSize,
          position: 'absolute',
          bottom: verticalScale(-20), // Ajuste para evitar desbordamientos
          left: horizontalScale(0),
        }}
      />
      <DogSvg
      fill={newColors.fondo_secundario}
      style={{
          width: animalSize,
          height: animalSize,
          position: 'absolute',
          bottom: verticalScale(-60), // Ajuste para evitar desbordamientos
          right: horizontalScale(-35),
        }}
      />
    </View>
  );
};

export default AssetIcons;

const styles = StyleSheet.create({
  svgContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  }
});