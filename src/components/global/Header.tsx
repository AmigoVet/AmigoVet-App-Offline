import { View, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors, staticColors } from '../../assets/styles/colors';
import { RootStackParamList } from '../../views/Welcome';
import { CustomIcon } from '../Customs';


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
        source={require('../../assets/img/HeaderLogo.png')} 
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
