import React from 'react';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../navigator/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import BuildingScreen from '../../../components/BuildingScreen';
import GlobalTeamSvg from '../../../assets/ilustrations/GlobalTeamSvg';

type LenguajeScreenNavigationProp = DrawerNavigationProp<DrawerParamList>;

const Lenguaje = () => {
  const navigation = useNavigation<LenguajeScreenNavigationProp>();

  return (
    <GlobalContainer>
      <Header title="Idiomas" onPress={() => navigation.toggleDrawer()} iconOnPress="menu-outline" />
      <BuildingScreen
        img={GlobalTeamSvg}
        title="Multilenguaje"
        text="Estamos trabajando para que puedas ver la aplicación en tu idioma preferido."
      />
    </GlobalContainer>
  );
};

export default Lenguaje;
