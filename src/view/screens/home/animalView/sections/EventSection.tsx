import { View, Text, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { Events } from '../../../../../lib/interfaces/Events';
import { newColors } from '../../../../styles/colors';
import { styleSections } from './styles';
import MiniButton from '../../../../components/MiniButton';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../../../navigator/navigationTypes';
import notifee, { AndroidImportance } from '@notifee/react-native';

interface EventSectionProps {
  events: Events[];
  animalId: string;
  animalName: string;
}

const EventSection = ({ events: initialEvents, animalId, animalName }: EventSectionProps) => {
  const navigation = useNavigation<NavigationProp>();

  const {  deleteEvent, animals } = useAnimalStore();

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


  const handleDeleteEvent = async (eventId: string) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este evento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEvent(eventId);
              await notifee.cancelNotification(eventId);
              Alert.alert('Éxito', 'Evento eliminado correctamente.');
            } catch (error: any) {
              Alert.alert('Error', `No se pudo eliminar el evento: ${error.message || 'Error desconocido'}`);
              console.error('Error al eliminar evento:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <>
      <View style={styleSections.container}>
        <View style={styleSections.header}>
          <Text style={styleSections.title}>Eventos</Text>
          <MiniButton text="Agregar" icon="add-outline" onPress={() => navigation.navigate('CreateEventForm', { animalId, animalName })} />
        </View>
        {animalEvents.length === 0 ? (
          <Text style={styleSections.noDataText}>No hay eventos</Text>
        ) : (
          animalEvents.map((event) => (
            <View key={event.id} style={styleSections.itemContainer}>
                <Text style={styles.itemText}>{event.comentario}</Text>
                <Text style={styles.itemDate}>{event.fecha}</Text>
                {event.horaDeseada && (
                  <Text style={styles.notificationTime}>
                    Notificación: {event.DiaDeseado}/{event.MesDeseado}/{event.AnioDeseado} {event.horaDeseada}:{event.minutosDeseado.toString().padStart(2, '0')}
                  </Text>
                )}
                <Text style={styles.notificationTime}>
                  Hora del evento: {event.DiaEvento}/{event.MesEvento}/{event.AnioEvento} {event.horaEvento}:{event.minutosEvento.toString().padStart(2, '0')}
                </Text>
              <MiniButton
                text=""
                icon="trash-outline"
                backgroundColor={newColors.rojo}
                color={newColors.fondo_principal}
                onPress={() => handleDeleteEvent(event.id)}
              />
            </View>
          ))
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemText: {
    fontSize: 14,
    color: newColors.fondo_secundario,
  },
  itemDate: {
    fontSize: 12,
    color: newColors.fondo_secundario,
    marginTop: 5,
  },
  eventItem: {
    flex: 1,
    padding: 10,
  },
  notificationTime: {
    fontSize: 12,
    color: newColors.verde_light,
    marginTop: 5,
  },
});

export default EventSection;
