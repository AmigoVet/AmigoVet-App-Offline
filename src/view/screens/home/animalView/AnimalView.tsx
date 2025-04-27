import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigator/navigationTypes';
import HeaderAnimalView from './components/HeaderAnimalView';
import GlobalContainer from '../../../components/GlobalContainer';
import { ScrollView } from 'react-native-gesture-handler';
import BasicDataAnimalView from './components/BasicDataAnimalView';
import ExtraDataAnimalView from './components/ExtraDataAnimalView';
import EventSection from './sections/EventSection';
import NoteSection from './sections/NoteSection';
import Register from '../../auth/register/Register';
import RegisterSection from './sections/RegisterSection';
import { newColors } from '../../../styles/colors';
import Separator from '../../../components/Separator';

type AnimalViewRouteProp = RouteProp<RootStackParamList, 'AnimalView'>;
type TabSection = 'events' | 'notes' | 'registers';

const AnimalView = () => {
  const route = useRoute<AnimalViewRouteProp>();
  const { animal } = route.params;
  const [activeTab, setActiveTab] = useState<TabSection>('events');

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
      <Text style={{
        color: activeTab === section ? 'white' : newColors.fondo_secundario,
        fontWeight: activeTab === section ? 'bold' : 'normal',
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'events':
        return <EventSection events={animal.events!} />;
      case 'notes':
        return <NoteSection notes={animal.notes!} />;
      case 'registers':
        return <RegisterSection registers={animal.registers!} />;
      default:
        return null;
    }
  };

  return (
    <GlobalContainer style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView>
        <HeaderAnimalView 
            title={animal.nombre} 
            id={animal.identificador} 
            image1={animal.image} 
            image2={animal.image2} 
            image3={animal.image3}
        />
        <BasicDataAnimalView animal={animal} />
        <ExtraDataAnimalView description={animal.descripcion} ubicacion={animal.ubicacion}/>


        {/* Tab Navigation */}
        <View style={{
          flexDirection: 'row',
        }}>
          <TabButton title="Eventos" section="events" />
          <TabButton title="Notas" section="notes" />
          <TabButton title="Registros" section="registers" />
        </View>

        {/* Active Section */}
        {renderActiveSection()}

        <Separator height={100} bg={newColors.fondo_secundario} />

      </ScrollView>
    </GlobalContainer>
  );
};

export default AnimalView