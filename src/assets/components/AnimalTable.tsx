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


  const [pesoEdit, setpeso] = useState(peso);
  const [generoEdit, setGenero] = useState(genero);
  const [propositoEdit, setProposito] = useState(proposito);
  const [edadEdit, setEdad] = useState(edad);

  return (
    <View style={styles.table}>
      {/* Encabezado */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.headerCell}>Peso</Text>
        <Text style={styles.headerCell}>Genero</Text>
        <Text style={styles.headerCell}>Proposito</Text>
        <Text style={styles.headerCell}>Edad</Text>
      </View>

      {/* Fila de datos */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <EditTableText
          placeholder="Peso"
          value={pesoEdit}
          onChangeText={(text) => setpeso(text)}
          type="number"
          editable={false}
        />
        <EditTableText
          placeholder="Genero"
          value={generoEdit}
          onChangeText={(text) => setGenero(text)}
          type="text"
          editable={false}
        />
        <EditTableText
          placeholder="Proposito"
          value={propositoEdit}
          onChangeText={(text) => setProposito(text)}
          type="text"
          editable={false}
        />
        <EditTableText
          placeholder="Edad"
          value={edadEdit}
          onChangeText={(text) => setEdad(text)}
          type="number"
          editable={false}
        />
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
  headerCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.naranja,
    borderBottomColor: colors.naranja,
    borderBottomWidth: 1,
  },
});

export default AnimalTable;
