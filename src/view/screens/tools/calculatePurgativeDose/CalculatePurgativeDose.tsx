import React from 'react';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../../navigator/navigationTypes';
import BuildingScreen from '../../../components/BuildingScreen';
import ProgrammerSvg from '../../../assets/ilustrations/ProgrammerSvg';

const CalculatePurgativeDose = () => {
  const { goBack } = useNavigation<NavigationProp>();


  return (
    <GlobalContainer>
      <Header title="Dosis de purgante" iconOnPress="chevron-back-outline" onPress={() => {goBack();}} />
      <BuildingScreen
        img={ProgrammerSvg}
        title="Calcular dosis de purgante"
        text="Estamos trabajando en esta herramienta para que puedas calcular la dosis de purgante de forma fácil y rápida. ¡Pronto estará disponible!"
      />
    </GlobalContainer>
  );
};

export default CalculatePurgativeDose;
