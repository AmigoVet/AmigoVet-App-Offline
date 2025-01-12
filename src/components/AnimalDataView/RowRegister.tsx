import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { format } from 'date-fns';
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors } from '../../assets/styles/colors';
import { Register } from '../../lib/interfaces/registers';

interface RowRegisterProps {
  register: Register;
  isLast?: boolean;
  bgColor?: string;
}

const RowRegister = ({ register, isLast = false, bgColor }: RowRegisterProps) => {
  const windowWidth = Dimensions.get('window').width;

  const { isDarkTheme } = useTheme(); // Obtener el tema actual
  const colors = getDynamicColors(isDarkTheme); // Obtener colores dinámicos

  // Si no se pasa `bgColor` como prop, usar el color dinámico por defecto
  const backgroundColor = bgColor || colors.rowBgDark;

  const styles = StyleSheet.create({
    container: {
      width: windowWidth - 32,
      flexDirection: 'row',
      backgroundColor: backgroundColor,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 8,
      borderBottomRightRadius: isLast ? 10 : 0,
      borderBottomLeftRadius: isLast ? 10 : 0,
      paddingVertical: 8,
    },
    column: {
      flex: 1,
      alignItems: 'center',
    },
    text: {
      color: colors.blancoLight, // Texto dinámico
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.text}>{format(new Date(register.fecha), 'yyyy-MM-dd')}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>{register.accion}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>{register.comentario}</Text>
      </View>
    </View>
  );
};

export default RowRegister;
