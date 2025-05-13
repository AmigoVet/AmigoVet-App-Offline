import { View, Text, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigator/navigationTypes';
import HeaderAnimalView from './components/HeaderAnimalView';
import GlobalContainer from '../../../components/GlobalContainer';
import BasicDataAnimalView from './components/BasicDataAnimalView';
import ExtraDataAnimalView from './components/ExtraDataAnimalView';
import EventSection from './sections/EventSection';
import NoteSection from './sections/NoteSection';
import { newColors } from '../../../styles/colors';
import { constants } from '../../../styles/constants';
import CustomScrollView from '../../../components/customs/CustomScrollView';
import RegisterSection from './sections/RegisterSection';
import ExtraSection from './sections/ExtraSection';
import { useState } from 'react';
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import GptButton from './components/GptButton';

type AnimalViewRouteProp = RouteProp<RootStackParamList, 'AnimalView'>;
type TabSection = 'events' | 'notes' | 'registers' | 'extra';

const AnimalView = () => {
  const route = useRoute<AnimalViewRouteProp>();
  const { animals } = useAnimalStore();
  const [animal, setAnimal] = useState(route.params.animal);
  const [activeTab, setActiveTab] = useState<TabSection>('events');

  // Fetch the latest animal data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const currentAnimal = animals.find(a => a.id === route.params.animal.id) || route.params.animal;
      setAnimal(currentAnimal);
    }, [animals, route.params.animal])
  );

  const TabButton = ({ title, section }: { title: string; section: TabSection }) => (
    <TouchableOpacity
      onPress={() => setActiveTab(section)}
      style={{
        flex: 1,
        padding: 12,
        backgroundColor: activeTab === section ? newColors.fondo_secundario : newColors.fondo_principal,
        marginHorizontal: 4,
        alignItems: 'center',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
      }}
    >
      <Text
        style={{
          color: activeTab === section ? 'white' : newColors.fondo_secundario,
          fontWeight: activeTab === section ? 'bold' : 'normal',
          fontFamily: constants.FontTitle,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'events':
        return <EventSection events={animal.events!} animalId={animal.id} animalName={animal.nombre} />;
      case 'notes':
        return <NoteSection notes={animal.notes!} animalId={animal.id} animalName={animal.nombre} />;
      case 'registers':
        return <RegisterSection animal={animal}/>;
      case 'extra':
        return <ExtraSection animal={animal} />;
      default:
        return null;
    }
  };

  return (
    <GlobalContainer style={{ backgroundColor: newColors.fondo_secundario }}>
      <CustomScrollView>
        <HeaderAnimalView
          title={animal.nombre}
          id={animal.identificador}
          image1={animal.image}
          image2={animal.image2}
          image3={animal.image3}
        />
        <BasicDataAnimalView animal={animal} />
        <ExtraDataAnimalView description={animal.descripcion} ubicacion={animal.ubicacion} />
        <GptButton animal={animal} />
        {/* Tab Navigation */}
        <View style={{ flexDirection: 'row' }}>
          <TabButton title="Eventos" section="events" />
          <TabButton title="Notas" section="notes" />
          <TabButton title="Registros" section="registers" />
          <TabButton title="..." section="extra" />
        </View>

        {/* Active Section */}
        {renderActiveSection()}

      </CustomScrollView>
    </GlobalContainer>
  );
};

export default AnimalView;
