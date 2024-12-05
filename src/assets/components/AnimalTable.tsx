import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles';
import EditTableText from './EditTableText';

interface AnimalTableProps {
  peso: string;
  genero: string;
  proposito: string;
  edad: string;
}

const AnimalTable = ({ peso, genero, proposito, edad }: AnimalTableProps) => {
  const [pesoEdit, setPeso] = useState(peso);
  const [generoEdit, setGenero] = useState(genero);
  const [propositoEdit, setProposito] = useState(proposito);
  const [edadEdit, setEdad] = useState(edad);

  return (
    <View style={styles.table}>
      {/* Encabezado */}
      <View style={styles.row}>
        <Text style={styles.headerCell}>Peso</Text>
        <Text style={styles.headerCell}>Género</Text>
        <Text style={styles.headerCell}>Propósito</Text>
        <Text style={styles.headerCell}>Edad</Text>
      </View>

      {/* Fila de datos */}
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.text}>{pesoEdit}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{generoEdit}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{propositoEdit}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{edadEdit}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.naranja,
    borderRadius: 5,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Asegura alineación vertical si hay varias líneas
  },
  headerCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.naranja,
    borderBottomColor: colors.naranja,
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
    padding: 10,
    borderColor: colors.naranja,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center', // Centra horizontalmente
  },
  text: {
    textAlign: 'center',
    color: colors.blanco,
    flexWrap: 'wrap', // Permite envolver el texto
    fontSize: 14,
  },
});

export default AnimalTable;
