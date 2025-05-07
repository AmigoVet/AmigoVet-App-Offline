import { Text, Button, View, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalContainer from '../../../components/GlobalContainer';
import notifee, { AndroidImportance, TimestampTrigger, TriggerType } from '@notifee/react-native';
import { Events } from '../../../../lib/interfaces/Events';
import DateTimePicker from '@react-native-community/datetimepicker';

const Feed = () => {
  // State for selected date and time
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  // State for countdown
  const [countdown, setCountdown] = useState<string>('');

  // Configurar el canal de notificaciones al iniciar el componente
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        // Solicitar permisos para notificaciones
        await notifee.requestPermission();

        // Crear un canal para Android (requerido en Android 8.0+)
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

  // Update countdown timer
  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const targetTime = selectedDate.getTime();
      const timeDiff = targetTime - now;

      if (timeDiff <= 0) {
        setCountdown('Notification time reached!');
        clearInterval(interval);
        return;
      }

      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedDate]);

  // Función para enviar una notificación programada
  const sendNotification = async () => {
    if (!selectedDate) {
      console.warn('Please select a date and time');
      return;
    }

    try {
      // Crear el trigger para la notificación
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: selectedDate.getTime(),
      };

      // Ejemplo de datos basados en la interfaz Events
      const event: Events = {
        id: '1',
        animalId: 'animal_123',
        animalName: 'Pepito',
        comentario: '¡Es hora de la cita veterinaria!',
        fecha: selectedDate.toISOString(),
        created_at: new Date().toISOString(),
      };

      // Enviar la notificación programada
      await notifee.createTriggerNotification(
        {
          id: event.id,
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
        },
        trigger
      );

      // Log trigger notifications
      const triggerIds = await notifee.getTriggerNotificationIds();
      console.log('All trigger notifications: ', triggerIds);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  // Handle date/time picker changes
  const onChange = (event: any, date?: Date) => {
    const currentDate = date || selectedDate || new Date();
    setShowPicker(Platform.OS === 'ios'); // Keep picker open on iOS, close on Android
    setSelectedDate(currentDate);
  };

  return (
    <GlobalContainer>
      <Text>Feed</Text>
      <Button title="Select Date and Time" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
      {selectedDate && (
        <View>
          <Text>Selected: {selectedDate.toLocaleString()}</Text>
          <Text>Time until notification: {countdown}</Text>
        </View>
      )}
      <Button title="Enviar Notificación" onPress={sendNotification} />
    </GlobalContainer>
  );
};

export default Feed;
