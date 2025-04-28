import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Register } from '../../../../../lib/interfaces/Register';
import { newColors } from '../../../../styles/colors';
import { styleSections } from './styles';

interface RegistersProps {
  registers: Register[];
}

const RegisterSection = ({ registers }: RegistersProps) => {
  return (
    <View style={styleSections.container}>
      <Text style={styleSections.title}>Registros</Text>
      {registers.length === 0 ? (
        <Text style={styleSections.noDataText}>No hay registros</Text>
      ) : (
        registers.map((register) => (
          <View key={register.id} style={styleSections.itemContainer}>
            <Text style={styles.itemText}>{register.comentario}</Text>
            <Text style={styles.itemDate}>{register.fecha}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemText: {
    fontSize: 14,
    color: newColors.fondo_secundario,
  },
  itemDate: {
    fontSize: 12,
    color: newColors.fondo_secundario,
    marginTop: 5,
  },
});

export default RegisterSection;