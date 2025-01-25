import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { CustomIcon } from '../Customs'; // Asegúrate de que el path sea correcto
import { newColors } from '../../assets/styles/colors';
import { constants } from '../../assets/styles/constants';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../views/Welcome';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const SearchButton = () => {

  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const onPress = () => {
    navigate('Busqueda');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <CustomIcon name="search" size={30} color="black" />
      </Pressable>
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
