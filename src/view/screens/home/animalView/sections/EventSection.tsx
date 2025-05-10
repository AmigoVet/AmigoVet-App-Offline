import { View, Text } from 'react-native';
import React from 'react';
import { Events } from '../../../../../lib/interfaces/Events';
import { styleSections } from './styles';
import MiniButton from '../../../../components/MiniButton';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../../../navigator/navigationTypes';
import notifee, { AndroidImportance } from '@notifee/react-native';
import EventSectionCard from '../cards/EventSectionCard';

interface EventSectionProps {
  events: Events[];
  animalId: string;
  animalName: string;
}

const EventSection = ({ events: initialEvents, animalId, animalName }: EventSectionProps) => {
  const navigation = useNavigation<NavigationProp>();

  const { animals } = useAnimalStore();

  // Configurar el canal de notificaciones
  React.useEffect(() => {
    const setupNotifications = async () => {
      try {
        await notifee.requestPermission();
        await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
        });
      } catch (error) {
        console.error('Error setting up notifications:', error);
      }
    };
    setupNotifications();
  }, []);

  // Obtener los eventos del animal desde el store
  const animalEvents = animals.find((animal) => animal.id === animalId)?.events || initialEvents;

  return (
    <>
      <View style={styleSections.container}>
        <View style={styleSections.header}>
          <Text style={styleSections.title}>Eventos</Text>
          <View style={styleSections.buttonsContainer}>
          <MiniButton text="Agregar" icon="add-outline" onPress={() => navigation.navigate('CreateEventForm', { animalId, animalName })} />
          <MiniButton text="Ver todos" icon="book-outline" onPress={() => navigation.navigate('AllEvents', { animalId, animalName })} />
          </View>
        </View>
        {animalEvents.length === 0 ? (
          <Text style={styleSections.noDataText}>No hay eventos</Text>
        ) : (
          animalEvents.map((event) => (
            <EventSectionCard event={event} />
          ))
        )}
      </View>
    </>
  );
};

export default EventSection;
