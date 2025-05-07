import React, { useState, useEffect } from 'react';
import { Text, Alert, StyleSheet, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation, useRoute } from '@react-navigation/native';
import notifee, { AndroidImportance, TimestampTrigger, TriggerType } from '@notifee/react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Events } from '../../../../../lib/interfaces/Events';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import CustomButton from '../../../../components/customs/CustomButton';
import CustomInput from '../../../../components/customs/CustomImput';
import Separator from '../../../../components/Separator';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import CustomScrollView from '../../../../components/customs/CustomScrollView';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../../../../navigator/navigationTypes';
import GlobalContainer from '../../../../components/GlobalContainer';
import Header from '../../../../components/Header';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';
import Icon from '@react-native-vector-icons/ionicons';
import { textNotification } from './textNotification';

type CreateEventFormRouteProp = RouteProp<RootStackParamList, 'CreateEventForm'>;

const CreateEventForm: React.FC = () => {
  const route = useRoute<CreateEventFormRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { animalId, animalName } = route.params || {};

  const [comentario, setComentario] = useState('');
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [notificationDate, setNotificationDate] = useState<Date | null>(null);
  const [isEventPickerVisible, setEventPickerVisible] = useState(false);
  const [isNotificationPickerVisible, setNotificationPickerVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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
  const onEventDateConfirm = (date: Date) => {
    setEventPickerVisible(false);
    setEventDate(date);
  };

  const onEventDateCancel = () => {
    setEventPickerVisible(false);
  };

  // Handle notification date/time picker changes
  const onNotificationDateConfirm = (date: Date) => {
    setNotificationPickerVisible(false);
    setNotificationDate(date);
  };

  const onNotificationDateCancel = () => {
    setNotificationPickerVisible(false);
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

    setIsSaving(true);
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

      const triggerDayEvent: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: eventDate.getTime(),
      };

      await notifee.createTriggerNotification(
        {
          id: eventData.id,
          title: `Recordatorio de ${eventData.animalName}`,
          body: textNotification({
            yearNotification: String(notificationDate.getFullYear()),
            monthNotification: String(notificationDate.getMonth() + 1),
            dayNotification: String(notificationDate.getDate()),
            hourNotification: String(notificationDate.getHours()),
            minuteNotification: String(notificationDate.getMinutes()),
            yearEvent: String(eventDate.getFullYear()),
            monthEvent: String(eventDate.getMonth() + 1),
            dayEvent: String(eventDate.getDate()),
            hourEvent: String(eventData.horaEvento),
            minuteEvent: String(eventData.minutosEvento),
            description: eventData.comentario,
          }),
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

      await notifee.createTriggerNotification({
        id: eventData.id + 'event',
        title: `Evento de ${eventData.animalName}`,
        body: `La ${eventData.comentario} de ${eventData.animalName} es ahora!!`,
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
      }, triggerDayEvent);

      Alert.alert('Éxito', 'Evento creado');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', `No se pudo guardar el evento: ${error.message || 'Error desconocido'}`);
      console.error('Error al guardar evento:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <GlobalContainer>
      <Header title="Agregar Evento" iconOnPress="chevron-back-outline" onPress={() => navigation.goBack()} />
      <CustomScrollView style={GlobalStyles.padding20}>
        {animalName && (
          <Text style={styles.animalName}>
            Evento para: <Text style={styles.animalNameBold}>{animalName}</Text>
          </Text>
        )}
        <Separator height={20} />
        <CustomInput
          value={comentario}
          onChangeText={setComentario}
          label="Comentario"
          placeholder="Escribe una descripción del evento"
          multiline
        />
        <Separator height={20} />

        {/* Event Date Picker Section */}
        <View style={styles.miniContainer}>
          {eventDate && (
            <View style={styles.dataContainer}>
              <Text style={styles.text}>
                <Icon name="calendar-outline" size={20} color={newColors.fondo_secundario} />
                {' Fecha: '}
                <Text style={styles.textDate}>
                  {eventDate.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </Text>
              <Text style={styles.text}>
                <Icon name="time-outline" size={20} color={newColors.fondo_secundario} />
                {' Hora: '}
                <Text style={styles.textDate}>
                  {eventDate.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </Text>
            </View>
          )}
          <CustomButton
            text="Seleccionar Fecha del Evento"
            icon="calendar-outline"
            onPress={() => setEventPickerVisible(true)}
            width="100%"
            backgroundColor={newColors.verde_light}
            textColor="white"
          />
          <DateTimePickerModal
            isVisible={isEventPickerVisible}
            mode="datetime"
            date={eventDate || new Date()}
            onConfirm={onEventDateConfirm}
            onCancel={onEventDateCancel}
            locale="es-ES"
            confirmTextIOS="Confirmar"
            cancelTextIOS="Cancelar"
          />
        </View>

        <Separator height={20} />

        {/* Notification Date Picker Section */}
        <View style={styles.miniContainer}>
          {notificationDate && (
            <View style={styles.dataContainer}>
              <Text style={styles.text}>
                <Icon name="calendar-outline" size={20} color={newColors.fondo_secundario} />
                {' Fecha: '}
                <Text style={styles.textDate}>
                  {notificationDate.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </Text>
              <Text style={styles.text}>
                <Icon name="time-outline" size={20} color={newColors.fondo_secundario} />
                {' Hora: '}
                <Text style={styles.textDate}>
                  {notificationDate.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </Text>
            </View>
          )}
          <CustomButton
            text="Seleccionar Fecha de Notificación"
            icon="notifications-outline"
            onPress={() => setNotificationPickerVisible(true)}
            width="100%"
            backgroundColor={newColors.verde_light}
            textColor="white"
          />
          <DateTimePickerModal
            isVisible={isNotificationPickerVisible}
            mode="datetime"
            date={notificationDate || new Date()}
            onConfirm={onNotificationDateConfirm}
            onCancel={onNotificationDateCancel}
            locale="es-ES"
            confirmTextIOS="Confirmar"
            cancelTextIOS="Cancelar"
          />
        </View>

        <Separator height={20} />
        <CustomButton
          text="Guardar Evento"
          icon="save-outline"
          onPress={handleSaveEvent}
          loading={isSaving}
          disabled={isSaving}
          backgroundColor={newColors.verde_light}
          textColor="white"
          width="100%"
        />
        <Separator height={200} />
      </CustomScrollView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  miniContainer: {
    borderWidth: constants.borderWidth,
    borderColor: newColors.fondo_secundario,
    borderRadius: constants.borderRadius / 1.5,
    padding: 10,
    alignItems: 'center',
  },
  dataContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '75%',
    marginBottom: 10,
  },
  textDate: {
    color: newColors.fondo_secundario,
    fontSize: 14,
    fontFamily: constants.FontText,
    fontWeight: '500',
  },
  text: {
    color: newColors.fondo_secundario,
    fontSize: 16,
    fontFamily: constants.FontText,
    fontWeight: 'bold',
  },
  animalName: {
    fontSize: 18,
    fontFamily: constants.FontText,
    color: newColors.fondo_secundario,
  },
  animalNameBold: {
    fontWeight: 'bold',
  },
  notificationPreview: {
    marginTop: 20,
    padding: 10,
    borderWidth: constants.borderWidth,
    borderColor: newColors.fondo_secundario,
    borderRadius: constants.borderRadius,
    backgroundColor: newColors.fondo_principal,
  },
  notificationPreviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: newColors.fondo_secundario,
    fontFamily: constants.FontTitle,
    marginBottom: 5,
  },
  notificationPreviewText: {
    fontSize: 14,
    color: newColors.fondo_secundario,
    fontFamily: constants.FontText,
  },
});

export default CreateEventForm;
