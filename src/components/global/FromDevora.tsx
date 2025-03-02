import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import {newColors } from '../../assets/styles/colors';

const FromDevora = () => {


  return (
    <View style={styles.container}>
      <Text style={styles.text}>BY Devora Inc</Text>
    </View>
  );
};

const styles =
  StyleSheet.create({
  container: {
    position: 'absolute', 
    bottom: 20, 
    left: 0,
    right: 0, 
    alignItems: 'center', 
  },
  text: {
    fontSize: 13,
    fontWeight: 300,
    color: newColors.fondo_secundario,
  },
});

export default FromDevora;
