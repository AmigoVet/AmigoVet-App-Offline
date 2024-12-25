import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors, staticColors } from '../../assets/styles/colors';
import { RootStackParamList } from '../../views/Welcome';
import { CustomIcon } from '../Customs';


const HeaderDrawer = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkTheme } = useTheme(); 
  const colors = getDynamicColors(isDarkTheme); 
  const styles = createStyles(colors); 

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <CustomIcon name="menu" size={30} color={staticColors.blancoLight} />
      </Pressable>
      <Image
        source={require('../../assets/img/HeaderLogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Pressable onPress={() => navigation.navigate('Busqueda')}>
        <CustomIcon name="search" size={30} color={staticColors.blancoLight} />
      </Pressable>
    </View>
  );
};

// Función para generar estilos dinámicos
const createStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
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
    logo: {
      width: 100,
      alignSelf: 'center',
    },
  });

export default HeaderDrawer;
