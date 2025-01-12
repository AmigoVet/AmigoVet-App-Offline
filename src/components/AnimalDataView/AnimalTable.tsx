import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors } from '../../assets/styles/colors';
import { CustomIcon } from '../Customs';

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

  const { isDarkTheme } = useTheme(); 
  const colors = getDynamicColors(isDarkTheme); 
  const styles = createStyles(colors); 

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
          <Text style={styles.text}>{pesoEdit} Kg</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{generoEdit}
            {generoEdit === "Hembra" && <CustomIcon name="female-outline" size={15} color={colors.verde} />}
            {generoEdit === "Macho" && <CustomIcon name="male-outline" size={15} color={colors.verde} />}
          </Text>
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

// Estilos dinámicos
const createStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
    table: {
      width: '100%',
      borderWidth: 1,
      borderColor: colors.verde,
      borderRadius: 5,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start', 
    },
    headerCell: {
      flex: 1,
      padding: 10,
      textAlign: 'center',
      fontWeight: 'bold',
      color: colors.verdeLight,
      borderBottomColor: colors.verde,
      borderBottomWidth: 1,
      backgroundColor: colors.verdeDark, 
    },
    cell: {
      flex: 1,
      padding: 10,
      borderColor: colors.verde,
      borderRightWidth: 1,
      justifyContent: 'center',
      alignItems: 'center', 
    },
    text: {
      textAlign: 'center',
      color: colors.blanco, 
      flexWrap: 'wrap', 
      fontSize: 14,
    },
  });

export default AnimalTable;
