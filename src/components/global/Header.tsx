import React from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { getDynamicColors, newColors, staticColors } from '../../assets/styles/colors';
import { CustomIcon } from '../Customs';
import { RootStackParamList } from '../../lib/interfaces/navigate';
import LabelLogo from '../../assets/svgs/LabelLogo';

interface HeaderProps {
  title?: string;
}

const Header = ({title}: HeaderProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <CustomIcon name="chevron-back-outline" size={30} color={staticColors.blancoLight} />
      </Pressable>
      {title && <Text style={styles.title}>{title}</Text>}
      <LabelLogo  />
    </View>
  );
};

const styles = StyleSheet.create({
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
      paddingHorizontal: 10,
    },
    title:{
      fontSize: 24,
      fontWeight: 'bold',
      color: newColors.fondo_principal,
      textAlign: 'center',
    },
  });

export default Header;
