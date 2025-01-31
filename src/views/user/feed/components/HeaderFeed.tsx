import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../lib/context/ThemeContext';
import { getDynamicColors, newColors, staticColors } from '../../../../assets/styles/colors';
import { CustomIcon } from '../../../../components/Customs';
import { RootStackParamList } from '../../../Welcome';
import LabelLogo from '../../../../assets/svgs/LabelLogoLight';

interface HeaderFeedProps {
  userName?: string;
}

const HeaderFeed = ({userName}: HeaderFeedProps) => {
  const {navigate, goBack, } = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkTheme } = useTheme(); 
  const colors = getDynamicColors(isDarkTheme); 
  const styles = createStyles(colors); 

  return (
    <View style={styles.container}>
      <View>
        <LabelLogo width={140} height={140} fill={newColors.fondo_principal} style={{marginTop: -50}} />
        <Text style={{fontSize: 12, fontWeight: '300', color: newColors.fondo_principal, marginTop: -45}}>Bienvenido {userName}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 5}}>
          <Pressable onPress={() => navigate('Busqueda')}>
            <CustomIcon name="search-outline" size={25} color={staticColors.blancoLight} />
          </Pressable>
          <Pressable onPress={() => navigate('Nuevo')}>
            <CustomIcon name="add-circle-outline" size={25} color={staticColors.blancoLight} />
          </Pressable>
          <Pressable onPress={() => {Alert.alert('Llegara pronto!!')}}>
            <CustomIcon name="chatbubble-outline" size={25} color={staticColors.blancoLight} />
          </Pressable>
        </View>
        <Pressable onPress={() =>{Alert.alert('Settings')}}>
          <CustomIcon name="ellipsis-vertical" size={25} color={staticColors.blancoLight} />
        </Pressable>
      </View>
    </View>
  );
}


const createStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 80,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: newColors.fondo_secundario,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      zIndex: 10,
      paddingHorizontal: 20,
    },
    iconsContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    logo: {
    },
  });

export default HeaderFeed