import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { newColors } from '../../../../assets/styles/colors';
import { constants } from '../../../../assets/styles/constants';

interface ExtraDataProps {
  description: string;
  ubicacion: string;
}

const ExtraData = ({ description, ubicacion }: ExtraDataProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerContainer}>
        <Text style={styles.title}>Descripción</Text>
        <Text style={styles.info}>{description}</Text>
      </View>
      <View style={styles.containerContainer}>
        <Text style={styles.title}>Ubicación</Text>
        <Text style={styles.info}>{ubicacion}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    gap: 10,
  },
  containerContainer: {
    width: '90%',
    borderRadius: constants.borderRadius,
    padding: 10,
    paddingHorizontal: 15,
    gap: 10,
    borderWidth: constants.borderWidth,
  },
  title: {
    fontWeight: 'bold',
    color: newColors.fondo_secundario,
    borderBottomWidth: 1,
    borderColor: newColors.fondo_secundario,
    borderRadius: constants.borderRadius,
    alignSelf: 'flex-start',
  },
  info: {
    color: newColors.fondo_secundario,
  },
});

export default ExtraData;