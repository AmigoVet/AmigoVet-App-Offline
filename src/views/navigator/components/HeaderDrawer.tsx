import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../lib/interfaces/navigate';
import { newColors } from '../../../assets/styles/colors';
import { CustomIcon } from '../../../components/Customs';
import Iconlogo from '../../../assets/svgs/Iconlogo';

const HeaderDrawer = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <CustomIcon name="chevron-forward-outline" size={30} color={newColors.fondo_principal} />
      </Pressable>
      <View>
        <Iconlogo fill={newColors.fondo_principal} height={50} width={50} /> 
      </View>
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
    paddingHorizontal: 20,
  },
});

export default HeaderDrawer;