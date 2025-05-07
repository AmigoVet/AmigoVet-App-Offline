import React, { useState, useEffect } from 'react';
import { Text, Alert, Platform } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { useRoute } from '@react-navigation/native';
import notifee, { AndroidImportance, TimestampTrigger, TriggerType } from '@notifee/react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Events } from '../../../../lib/interfaces/Events';
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';
import CustomButton from '../../../components/customs/CustomButton';
import CustomInput from '../../../components/customs/CustomImput';
import Separator from '../../../components/Separator';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { styleSections } from '../animalView/sections/styles';
import CustomScrollView from '../../../components/customs/CustomScrollView';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigator/navigationTypes';

type CreateEventFormRouteProp = RouteProp<RootStackParamList, 'CreateEventForm'>;

const CreateEventForm: React.FC = () => {
  const route = useRoute<CreateEventFormRouteProp>();
  const { animalId, animalName } = route.params || {};

  const [comentario, setComentario] = useState('');
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [notificationDate, setNotificationDate] = useState<Date | null>(null);
  const [showEventPicker, setShowEventPicker] = useState(false);
  const [showNotificationPicker, setShowNotificationPicker] = useState(false);
  const { addEvent } = useAnimalStore();

  // Configurar el canal de notificaciones
  useEffect(() => {
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

  // Handle event date/time picker changes
  const onEventDateChange = (event: any, date?: Date) => {
    const currentDate = date || eventDate || new Date();
    setShowEventPicker(Platform.OS === 'ios');
    setEventDate(currentDate);
  };

  // Handle notification date/time picker changes
  const onNotificationDateChange = (event: any, date?: Date) => {
    const currentDate = date || notificationDate || new Date();
    setShowNotificationPicker(Platform.OS === 'ios');
    setNotificationDate(currentDate);
  };

  // Save event and schedule notification
  const handleSaveEvent = async () => {
    if (!comentario.trim()) {
      Alert.alert('Error', 'El comentario no puede estar vacío.');
      return;
    }
    if (!eventDate) {
      Alert.alert('Error', 'Por favor, selecciona una fecha para el evento.');
      return;
    }
    if (!notificationDate) {
      Alert.alert('Error', 'Por favor, selecciona una fecha para la notificación.');
      return;
    }
    if (!animalId || !animalName) {
      Alert.alert('Error', 'Faltan datos del animal (ID o nombre).');
      return;
    }

    const eventData: Events = {
      id: uuidv4(),
      animalId,
      animalName,
      comentario: comentario.trim(),
      fecha: eventDate.toISOString().split('T')[0],
      created_at: new Date().toISOString(),
      horaDeseada: notificationDate.getHours(),
      minutosDeseado: notificationDate.getMinutes(),
      DiaDeseado: notificationDate.getDate(),
      MesDeseado: notificationDate.getMonth() + 1, // Months are 0-based in JS
      AnioDeseado: notificationDate.getFullYear(),
      horaEvento: eventDate.getHours(),
      minutosEvento: eventDate.getMinutes(),
      DiaEvento: eventDate.getDate(),
      MesEvento: eventDate.getMonth() + 1,
      AnioEvento: eventDate.getFullYear(),
    };

    try {
      // Save to database
      await addEvent(eventData);

      // Schedule notification
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: notificationDate.getTime(),
      };

      await notifee.createTriggerNotification(
        {
          id: eventData.id,
          title: `Evento para ${eventData.animalName}`,
          body: eventData.comentario,
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

      Alert.alert('Éxito', 'Evento creado y notificación programada correctamente.');
      setComentario('');
      setEventDate(null);
      setNotificationDate(null);
    } catch (error: any) {
      Alert.alert('Error', `No se pudo guardar el evento: ${error.message || 'Error desconocido'}`);
      console.error('Error al guardar evento:', error);
    }
  };

  return (
    <CustomScrollView style={GlobalStyles.padding20}>
      <Text style={styleSections.title}>Crear Evento</Text>
      <CustomInput
        value={comentario}
        onChangeText={setComentario}
        label="Comentario"
        placeholder="Escribe una descripción del evento"
        multiline
      />
      <Separator height={20} />
      <CustomButton
        text="Seleccionar Fecha del Evento"
        onPress={() => setShowEventPicker(true)}
      />
      {eventDate && (
        <Text style={styleSections.noDataText}>
          Fecha del Evento: {eventDate.toLocaleString()}
        </Text>
      )}
      {showEventPicker && (
        <DateTimePicker
          value={eventDate || new Date()}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onEventDateChange}
        />
      )}
      <Separator height={20} />
      <CustomButton
        text="Seleccionar Fecha de Notificación"
        onPress={() => setShowNotificationPicker(true)}
      />
      {notificationDate && (
        <Text style={styleSections.noDataText}>
          Fecha de Notificación: {notificationDate.toLocaleString()}
        </Text>
      )}
      {showNotificationPicker && (
        <DateTimePicker
          value={notificationDate || new Date()}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onNotificationDateChange}
        />
      )}
      <Separator height={20} />
      <CustomButton text="Guardar Evento" onPress={handleSaveEvent} />
      <Separator height={200} />
    </CustomScrollView>
  );
};

export default CreateEventForm;
