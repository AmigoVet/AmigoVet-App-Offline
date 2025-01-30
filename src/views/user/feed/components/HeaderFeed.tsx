import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../lib/context/ThemeContext';
import { getDynamicColors, newColors, staticColors } from '../../../../assets/styles/colors';
import { CustomIcon } from '../../../../components/Customs';
import LogoSimple from '../../../../components/global/LogoSimple';
import { RootStackParamList } from '../../../Welcome';

const HeaderFeed = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkTheme } = useTheme(); 
  const colors = getDynamicColors(isDarkTheme); 
  const styles = createStyles(colors); 

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <CustomIcon name="chevron-back-outline" size={30} color={staticColors.blancoLight} />
      </Pressable>
      <LogoSimple estatico='light' />
    </View>
  );
}


const createStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 60,
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

export default HeaderFeed