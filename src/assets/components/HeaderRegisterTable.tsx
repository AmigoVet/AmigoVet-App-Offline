import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { colors, GlobalStyles } from '../styles';

const HeaderRegisterTable = () => {
  const windowWidth = Dimensions.get('window').width; 

  const styles = StyleSheet.create({
    container: {
      width: windowWidth - 32,
      height: 40,
      flexDirection: 'row',
      backgroundColor: colors.naranja,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 8,
      borderTopRightRadius: 10 ,
      borderTopLeftRadius: 10,
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
    <View style={{
        backgroundColor: colors.fondo,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
    <Text style={[GlobalStyles.title, {textAlign: 'center'}]}>Registros</Text>

    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.text}>Fecha</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Acción</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.text}>Comentario</Text>
      </View>
    </View>

    </View>

  );
};

export default HeaderRegisterTable;
