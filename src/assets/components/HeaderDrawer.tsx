import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import CustomIcon from './CustomIcon';
import { RootStackParamList } from '../../views/Welcome';


const HeaderDrawer = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <CustomIcon name="menu" size={30} color="white" />
      </Pressable>
      <Image
        source={require('../img/HeaderLogo1.png')}
        style={{
          width: 100,
          alignSelf: 'center',
        }}
        resizeMode="contain"
      />
      {/* Botón para ir a la búsqueda */}
      <Pressable onPress={() => navigation.navigate('Busqueda')}>
        <CustomIcon name="search" size={30} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.fondoDark,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 10,
    paddingHorizontal: 20,
  },
});

export default HeaderDrawer;
