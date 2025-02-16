import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { newColors } from '../../../../assets/styles/colors';
import { CustomIcon } from '../../../../components/Customs';
import { RootStackParamList } from '../../../Welcome';
import Iconlogo from '../../../../assets/svgs/Iconlogo';

interface HeaderProps {
  title?: string;
  id? : string;
}

const Header = ({ title = "Datos del animal", id = "Sin identificador" }: HeaderProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.iconContainer}>
        <CustomIcon name="chevron-back-outline" size={25} color={newColors.fondo_principal} />
      </Pressable>
      
      <View>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.subtitle}>{id}</Text>
      </View>

      <View style={styles.iconContainer}>
        <Iconlogo fill={newColors.fondo_principal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    backgroundColor: newColors.fondo_secundario,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 10,
    paddingHorizontal: 10,
  },
  iconContainer: {
    width: 40, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: newColors.fondo_principal,
    textAlign: 'center',
  },
  subtitle:{
    fontSize: 12,
    fontWeight: '300',
    color: newColors.fondo_principal,
    textAlign: 'center',
  }
});

export default Header;
