import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { newColors } from '../styles/colors';
import { constants } from '../styles/constants';

type BuildingScreenProps = {
  img: React.FC<any>; // Componente SVG
  title: string;
  text: string;
};

const BuildingScreen = ({ img: SvgComponent, title, text }: BuildingScreenProps) => {
  return (
    <View style={styles.container}>
      <SvgComponent width={300} height={300} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: constants.FontTitle,
    color: newColors.fondo_secundario || '#333333',
    textAlign: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    fontFamily: constants.FontText,
    color: newColors.fondo_secundario + '99' || '#33333399',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default BuildingScreen;
