import { View, Text, Button } from 'react-native';
import React, { useEffect } from 'react';
import GlobalContainer from '../../../components/GlobalContainer';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Events } from '../../../../lib/interfaces/Events';

const Feed = () => {
  // Configurar el canal de notificaciones al iniciar el componente (necesario para Android)
  useEffect(() => {
    const setupNotifications = async () => {
      // Solicitar permisos para notificaciones
      await notifee.requestPermission();

      // Crear un canal para Android (requerido en Android 8.0+)
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    };

    setupNotifications();
  }, []);

  // Función para enviar una notificación
  const sendNotification = async () => {
    // Ejemplo de datos basados en tu interfaz Events
    const event: Events = {
      id: '1',
      animalId: 'animal_123',
      animalName: 'Pepito',
      comentario: '¡Es hora de la cita veterinaria!',
      fecha: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    // Enviar la notificación
    await notifee.displayNotification({
      id: event.id, // Usar el ID del evento para identificar la notificación
      title: `Evento para ${event.animalName}`,
      body: event.comentario,
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        sound: 'default',
      },
    });
  };

  return (
    <GlobalContainer>
      <Text>Feed</Text>
      <Button title="Enviar Notificación" onPress={sendNotification} />
    </GlobalContainer>
  );
};

export default Feed;