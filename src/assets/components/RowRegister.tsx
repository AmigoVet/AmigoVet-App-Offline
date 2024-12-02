import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { Register } from '../interfaces/registers';
import { colors, GlobalStyles } from '../styles';
import { format } from 'date-fns';

interface RowRegisterProps {
  register: Register;
  isLast?: boolean;
  bgColor?: string;
}

const RowRegister = ({ register, isLast = false, bgColor = colors.rowBgDark }: RowRegisterProps) => {
    console.log(register)
    const windowWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    container: {
      width: windowWidth - 32,
      flexDirection: 'row',
      backgroundColor: bgColor,
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
      color: colors.blancoLight,
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
