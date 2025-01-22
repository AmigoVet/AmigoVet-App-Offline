import { View, StyleSheet } from 'react-native';
import React from 'react';
import { CustomIcon } from '../Customs'; // Asegúrate de que el path sea correcto
import { newColors } from '../../assets/styles/colors';
import { constants } from '../../assets/styles/constants';

const SearchButton = () => {
  return (
    <View style={styles.container}>
      <CustomIcon name="search" size={30} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2, 
    borderColor: newColors.fondo_secundario, 
    backgroundColor: newColors.fondo_principal, 
    borderRadius: constants.borderRadius,
  },
});

export default SearchButton;
