import { View, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../views/Welcome';
import CustomIcon from './CustomIcon';
import { useTheme } from '../context/ThemeContext';
import { getDynamicColors, staticColors } from '../styles/colors';
import { createGlobalStyles } from '../styles/styles';

const Header = () => {
  const {navigate, dispatch} = useNavigation<NavigationProp<RootStackParamList>>();

  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  

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

  return (
    <View style={styles.container}>
      {/* Abrir el Drawer al presionar el icono de menú */}
      <Pressable onPress={() => dispatch(DrawerActions.openDrawer())}>
        <CustomIcon name="menu" size={30} color={staticColors.blancoLight} />
      </Pressable>
      <Image 
        source={require('../img/HeaderLogo1.png')} 
        style={{ 
          width: 100, 
          alignSelf: 'center',
        }} 
        resizeMode="contain"
      />
      <Pressable onPress={() => navigate('Busqueda')}>
        <CustomIcon name="search" size={30} color={staticColors.blancoLight} />
      </Pressable>
    </View>
  );
};



export default Header;
