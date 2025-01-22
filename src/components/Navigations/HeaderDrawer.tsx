import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors, newColors, staticColors } from '../../assets/styles/colors';
import { RootStackParamList } from '../../views/Welcome';
import { CustomIcon } from '../Customs';
import LogoSimple from '../global/LogoSimple';


const HeaderDrawer = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkTheme } = useTheme(); 
  const colors = getDynamicColors(isDarkTheme); 
  const styles = createStyles(colors); 

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <CustomIcon name="chevron-forward-outline" size={30} color={staticColors.blancoLight} />
      </Pressable>
      <LogoSimple estatico='light' />
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: newColors.fondo_secundario,
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
