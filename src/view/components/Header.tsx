import React from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { newColors } from '../styles/colors';
import Iconlogo from '../assets/svgs/Iconlogo';

interface HeaderProps {
  title?: string;
  onPress: () => void;
  iconOnPress?: any;
}

const Header = ({title, onPress, iconOnPress}: HeaderProps) => {

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Icon name={iconOnPress || 'information-circle-outline'} size={30} color={newColors.fondo_principal} />
      </Pressable>
      {title && <Text style={styles.title}>{title}</Text>}
      <Iconlogo fill={newColors.fondo_principal} height={50} width={50} />
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
      fontWeight: '600',
      fontFamily: 'Chillax',
      color: newColors.fondo_principal,
      textAlign: 'center',
    },
  });

export default Header;
