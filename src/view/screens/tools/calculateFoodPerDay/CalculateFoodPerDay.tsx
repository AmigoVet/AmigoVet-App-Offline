import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { NavigationProp } from '../../../navigator/navigationTypes';
import Header from '../../../components/Header';
import ProgrammerSvg from '../../../assets/ilustrations/ProgrammerSvg';
import BuildingScreen from '../../../components/BuildingScreen';
import GlobalContainer from '../../../components/GlobalContainer';

const CalculateFoodPerDay = () => {

    const { goBack } = useNavigation<NavigationProp>();

  return (
    <GlobalContainer>
      <Header title="Comida por dia" iconOnPress="chevron-back-outline" onPress={() => {goBack();}} />
      <BuildingScreen
        img={ProgrammerSvg}
        title="Calcular dosis de comida diaria"
        text="Esta herramienta te permite calcular la cantidad de comida diaria que necesita tu mascota, basándose en su peso y nivel de actividad."
      />
    </GlobalContainer>
  );
};

export default CalculateFoodPerDay;
