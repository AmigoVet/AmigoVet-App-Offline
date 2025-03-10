import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { loadAllDataAnimal } from '../functions/loadAllDataAnimal';
import { Animal, Notes } from '../../../lib/interfaces/animal';
import { Events } from '../../../lib/interfaces/events';
import { ButtonAddEvent, ButtonAddRegister, ButtonEditData, ButtonRequestGPT } from './buttons';
import Header from './sections/Header';
import BasicData from './sections/BasicData';
import RegisterSection from './sections/Registers';
import { Register } from '../../../lib/interfaces/registers';
import ExtraData from './sections/ExtraData';
import {default as NotesSection} from './sections/Notes';
import { newColors } from '../../../assets/styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import Separator from '../../../components/global/Separator';
import EventsSection from './sections/EventsSection';
import { RootStackParamList } from '../../../lib/interfaces/navigate';

export const defaultAnimal: Animal = {
  ownerId: "",
  id: "",
  identificador: "",
  nombre: "Desconocido",
  especie: "Desconocida",
  raza: "Desconocida",
  edad: "",
  nacimiento: "",
  genero: "Desconocido",
  peso: "0",
  color: "Desconocido",
  descripcion: "Sin descripción",
  image: "",
  image2: "",
  image3: "",
  proposito: "No definido",
  ubicacion: "No definida",
  created_at: "",
  updated_at: "",
  embarazada: false,
};

type TabSection = 'events' | 'notes' | 'registers';

const AnimalView = () => {
  const id = useRoute<RouteProp<RootStackParamList, "AnimalView">>().params.id;
  const [activeTab, setActiveTab] = useState<TabSection>('events');

  const [animalData, setAnimalData] = useState<{
    animal: Animal;
    registers: Register[];
    notes: Notes[];
    events: Events[];
  }>({
    animal: defaultAnimal,
    registers: [],
    notes: [],
    events: [],
  });

  const fetchData = async () => {
    try {
      const data = await loadAllDataAnimal(id);
      setAnimalData({
        animal: data.animal || defaultAnimal, 
        registers: data.registers || [],
        notes: data.notes || [],
        events: data.events || [],
      });
    } catch (error) {
      console.error("Error cargando los datos:", error);
      setAnimalData({
        animal: defaultAnimal,
        registers: [],
        notes: [],
        events: [],
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

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
        return <EventsSection events={animalData.events} />;
      case 'notes':
        return <NotesSection notes={animalData.notes} />;
      case 'registers':
        return <RegisterSection registers={animalData.registers} />;
      default:
        return null;
    }
  };

  return (
    <>
      <ScrollView style={{backgroundColor: newColors.fondo_principal, flex: 1}}>
        <Header 
          title={animalData.animal.nombre} 
          id={animalData.animal.identificador} 
          image1={animalData.animal.image} 
          image2={animalData.animal.image2} 
          image3={animalData.animal.image3}
        />
        <BasicData animal={animalData.animal} />
        <ExtraData description={animalData.animal.descripcion} ubicacion={animalData.animal.ubicacion}/>
        
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
        
        <Separator height={500} />
      </ScrollView>

      <ButtonAddEvent animalId={id} animalName={animalData.animal.nombre} onPress={() => {}} />
      <ButtonEditData id={id} animal={animalData.animal} onPress={() => {}} />
      <ButtonAddRegister animalId={id} animal={animalData.animal} onPress={() => {}} />
      <ButtonRequestGPT animal={animalData.animal} registers={animalData.registers} notes={animalData.notes} />
    </>
  );
};


export default AnimalView;
