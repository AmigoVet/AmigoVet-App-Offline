import React from 'react';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../navigator/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import BuildingScreen from '../../../components/BuildingScreen';
import ComingSoonSvg from '../../../assets/ilustrations/ComingSoonSvg';

type AboutScreenNavigationProp = DrawerNavigationProp<DrawerParamList>;

const About = () => {
  const navigation = useNavigation<AboutScreenNavigationProp>();

  return (
    <GlobalContainer>
      <Header title="Info" onPress={() => navigation.toggleDrawer()} iconOnPress="menu-outline" />
      <BuildingScreen
        img={ComingSoonSvg}
        title="Informacion"
        text="Pronto tendras mas informacion sobre nosotros, Mientras tanto, podras visitar www.amigovet.app!"
      />
    </GlobalContainer>
  );
};

export default About;
