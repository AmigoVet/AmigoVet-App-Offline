import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '../navigator/navigationTypes';
import { newColors } from '../styles/colors';
import { constants } from '../styles/constants';
import Icon from '@react-native-vector-icons/ionicons';


const SearchButton = () => {

  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const onPress = () => {
    navigate('Busqueda');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Icon name="search" size={30} color="black" />
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
