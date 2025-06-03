import { NavigationProp } from '../../../navigator/navigationTypes';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import ProgrammerSvg from '../../../assets/ilustrations/ProgrammerSvg';
import BuildingScreen from '../../../components/BuildingScreen';
import GlobalContainer from '../../../components/GlobalContainer';

const CalculateAppropriateWeight = () => {
      const { goBack } = useNavigation<NavigationProp>();
  return (
    <GlobalContainer>
      <Header title="Peso Ideal" iconOnPress="chevron-back-outline" onPress={() => {goBack();}} />
      <BuildingScreen
        img={ProgrammerSvg}
        title="Calcular el peso ideal de tu mascota"
        text="Esta herramienta te permite calcular el peso ideal de tu mascota, basándose en su raza, edad y nivel de actividad."
      />
    </GlobalContainer>
  );
};

export default CalculateAppropriateWeight;
