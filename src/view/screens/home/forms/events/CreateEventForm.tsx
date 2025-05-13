import React, { useState, useEffect } from 'react';
import { Text, Alert, StyleSheet, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation, useRoute } from '@react-navigation/native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Events, sendNotifi as typeSendNotifi } from '../../../../../lib/interfaces/Events';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import CustomButton from '../../../../components/customs/CustomButton';
import CustomInput from '../../../../components/customs/CustomImput';
import CustomSelect from '../../../../components/customs/CustomSelect';
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
import { calculateNotificationDate } from '../../../../../lib/utils/notifi/calculateNotificacionDate';

type CreateEventFormRouteProp = RouteProp<RootStackParamList, 'CreateEventForm'>;


const CreateEventForm: React.FC = () => {
  const route = useRoute<CreateEventFormRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { animalId, animalName } = route.params || {};

  const [comentario, setComentario] = useState('');
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [sendNotifi, setSendNotifi] = useState<typeSendNotifi | ''>('');
  const [isEventPickerVisible, setEventPickerVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { addEvent } = useAnimalStore();

  // Configurar el canal de notificaciones
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        await notifee.requestPermission();
        await notifee.createChannel({
          id: 'events',
          name: 'Event Notifications',
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
    // Reset sendNotifi if it’s no longer valid for the new date
    if (sendNotifi && date) {
      const notifiDate = calculateNotificationDate(date, sendNotifi);
      if (notifiDate.getTime() <= new Date().getTime()) {
        setSendNotifi('');
      }
    }
  };

  const onEventDateCancel = () => {
    setEventPickerVisible(false);
  };

  // Save event
  const handleSaveEvent = async () => {
    if (!comentario.trim()) {
      Alert.alert('Error', 'El comentario no puede estar vacío.');
      return;
    }
    if (!eventDate) {
      Alert.alert('Error', 'Por favor, selecciona una fecha y hora para el evento.');
      return;
    }
    if (!sendNotifi) {
      Alert.alert('Error', 'Por favor, selecciona un período de notificación válido.');
      return;
    }
    if (!animalId || !animalName) {
      Alert.alert('Error', 'Faltan datos del animal (ID o nombre).');
      return;
    }

    setIsSaving(true);
    const eventData: Omit<Events, 'dateNotifi' | 'created_at'> = {
      id: uuidv4(),
      animalId,
      animalName,
      comentario: comentario.trim(),
      dateEvent: eventDate.toISOString(),
      sendNotifi,
    };

    try {
      await addEvent(eventData);
      Alert.alert('Éxito', 'Evento creado correctamente.');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', `No se pudo guardar el evento: ${error.message || 'Error desconocido'}`);
      console.error('Error al guardar evento:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Options for sendNotifi (for CustomSelect)
  const allSendNotifiOptions = [
    { label: '1 día antes', value: '1d' },
    { label: '2 días antes', value: '2d' },
    { label: '3 días antes', value: '3d' },
    { label: '4 días antes', value: '4d' },
    { label: '5 días antes', value: '5d' },
    { label: '1 semana antes', value: '1w' },
    { label: '2 semanas antes', value: '2w' },
  ];

  // Filter sendNotifi options based on eventDate
  const sendNotifiOptions = eventDate
    ? allSendNotifiOptions
        .filter(({ value }) => {
          const notifiDate = calculateNotificationDate(eventDate, value as typeSendNotifi);
          return notifiDate.getTime() > new Date().getTime();
        })
        .map(({ label }) => label)
    : allSendNotifiOptions.map(({ label }) => label);

  // Map display labels to sendNotifi values
  const sendNotifiValueMap: { [key: string]: typeSendNotifi } = {
    '1 día antes': '1d',
    '2 días antes': '2d',
    '3 días antes': '3d',
    '4 días antes': '4d',
    '5 días antes': '5d',
    '1 semana antes': '1w',
    '2 semanas antes': '2w',
  };

  // Reverse map for displaying the selected value
  const sendNotifiDisplayMap: { [key in typeSendNotifi]: string } = {
    '1d': '1 día antes',
    '2d': '2 días antes',
    '3d': '3 días antes',
    '4d': '4 días antes',
    '5d': '5 días antes',
    '1w': '1 semana antes',
    '2w': '2 semanas antes',
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
            text="Seleccionar Fecha y Hora del Evento"
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
            minimumDate={new Date()}
          />
        </View>

        <Separator height={20} />

        {/* Notification Period Select Section */}
        <View style={styles.miniContainer}>
          <CustomSelect
            label="Notificar"
            value={sendNotifi ? sendNotifiDisplayMap[sendNotifi] : ''}
            options={sendNotifiOptions}
            onChange={(text) => setSendNotifi(text ? sendNotifiValueMap[text] : '')}
            required
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
        <Separator height={300} />
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
});

export default CreateEventForm;
