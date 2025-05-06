import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { Events } from '../../../../../lib/interfaces/Events';
import { newColors } from '../../../../styles/colors';
import { styleSections } from './styles';
import MiniButton from '../../../../components/MiniButton';
import { Modalize } from 'react-native-modalize';
import CustomButton from '../../../../components/customs/CustomButton';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import CustomDatePicker from '../../../../components/customs/CustomDatePicker';
import { v4 as uuidv4 } from 'uuid';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import Separator from '../../../../components/Separator';
import CustomInput from '../../../../components/customs/CustomImput';

interface EventSectionProps {
  events: Events[];
  animalId: string;
  animalName: string;
}

const EventSection = ({ events: initialEvents, animalId, animalName }: EventSectionProps) => {
  const modalizeRef = useRef<Modalize>(null);
  const [comentario, setComentario] = useState('');
  const [fecha, setFecha] = useState<Date | null>(null);
  const [notificationTime, setNotificationTime] = useState<string | null>(null); // Nueva variable de estado
  const [editingEvent, setEditingEvent] = useState<Events | null>(null);
  const { addEvent, updateEvent, deleteEvent, animals } = useAnimalStore();
  console.log('Eventos desde el store', initialEvents);

  // Obtener los eventos del animal desde el store
  const animalEvents = animals.find((animal) => animal.id === animalId)?.events || initialEvents;

  const openModal = (event?: Events) => {
    if (event) {
      setEditingEvent(event);
      setComentario(event.comentario);
      setFecha(new Date(event.fecha));
      setNotificationTime(event.notificationTime || null);
    } else {
      setEditingEvent(null);
      setComentario('');
      setFecha(null);
      setNotificationTime(null);
    }
    modalizeRef.current?.open();
  };

  const closeModal = () => {
    modalizeRef.current?.close();
    setComentario('');
    setFecha(null);
    setNotificationTime(null);
    setEditingEvent(null);
  };

  const handleSaveEvent = async () => {
    if (!comentario.trim()) {
      Alert.alert('Error', 'El comentario no puede estar vacío.');
      return;
    }
    if (!fecha) {
      Alert.alert('Error', 'Por favor, selecciona una fecha.');
      return;
    }
    if (!animalId || !animalName) {
      Alert.alert('Error', 'Faltan datos del animal (ID o nombre).');
      return;
    }

    const eventData: Events = {
      id: editingEvent ? editingEvent.id : uuidv4(),
      animalId,
      animalName,
      comentario: comentario.trim(),
      fecha: fecha.toISOString().split('T')[0],
      created_at: new Date().toISOString(),
      notificationTime: notificationTime || undefined, // Incluir notificationTime
    };

    try {
      if (editingEvent) {
        await updateEvent(eventData);
        Alert.alert('Éxito', 'Evento actualizado correctamente.');
      } else {
        await addEvent(eventData);
        Alert.alert('Éxito', 'Evento creado correctamente.');
      }
      closeModal();
    } catch (error: any) {
      Alert.alert('Error', `No se pudo guardar el evento: ${error.message || 'Error desconocido'}`);
      console.error('Error al guardar evento:', error);
    }
  };

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
          <MiniButton text="Agregar" icon="add-outline" onPress={() => openModal()} />
        </View>
        {animalEvents.length === 0 ? (
          <Text style={styleSections.noDataText}>No hay eventos</Text>
        ) : (
          animalEvents.map((event) => (
            <View key={event.id} style={styleSections.itemContainer}>
              <TouchableOpacity style={styles.eventItem} onPress={() => openModal(event)}>
                <Text style={styles.itemText}>{event.comentario}</Text>
                <Text style={styles.itemDate}>{event.fecha}</Text>
                {event.notificationTime && (
                  <Text style={styles.notificationTime}>
                    Notificación a las {event.notificationTime}
                  </Text>
                )}
              </TouchableOpacity>
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

      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={GlobalStyles.modalContainer}
        handlePosition="outside"
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <View style={GlobalStyles.modalHeader}>
          <Text style={[styleSections.title, { color: newColors.fondo_secundario }]}>
            {editingEvent ? 'Editar Evento' : 'Agregar Evento'}
          </Text>
          <MiniButton
            text="Cerrar"
            icon="close-outline"
            backgroundColor={newColors.rojo}
            onPress={closeModal}
            color={newColors.fondo_principal}
          />
        </View>
        <View style={GlobalStyles.padding20}>
          <CustomInput
            value={comentario}
            onChangeText={setComentario}
            label="Comentario"
            placeholder="Escribe una descripción del evento"
            multiline
          />
          <CustomDatePicker
            label="Fecha del evento"
            value={fecha}
            onDateChange={setFecha}
            allowFutureDates={true}
            allowPastDates={true}
          />
          <CustomInput
            value={notificationTime || ''}
            onChangeText={setNotificationTime}
            label="Hora de Notificación (HH:MM)"
            placeholder="Ejemplo: 14:30"
            keyboardType="numeric"
          />
          <Separator height={20} />
          <CustomButton text={editingEvent ? 'Actualizar' : 'Guardar'} onPress={handleSaveEvent} />
        </View>
      </Modalize>
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