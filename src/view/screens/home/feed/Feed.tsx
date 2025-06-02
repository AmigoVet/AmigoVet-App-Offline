import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import BuildingScreen from '../../../components/BuildingScreen';
import WebisteBuilderSvg from '../../../assets/ilustrations/WebsiteBuilderSvg';
import { Alert } from 'react-native';



const Feed = () => {

  return (
    <GlobalContainer>
      <Header title="Feed" onPress={() => {Alert.alert('Funcionalidad aun no disponible');}} />
      <BuildingScreen
        img={WebisteBuilderSvg}
        title="Tienda y adopcion de mascotas"
        text="¡Pronto podrás publicar tus mascotas para adopción y explorar nuestra tienda! Estamos trabajando en esta funcionalidad para que esté disponible muy pronto."
      />
    </GlobalContainer>
  );
};

export default Feed;
