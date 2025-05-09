import React from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { Events } from '../../../lib/interfaces/Events';
import { format, parse, isBefore } from 'date-fns';
import { es } from 'date-fns/locale';
import { constants } from '../../styles/constants';
import { newColors } from '../../styles/colors';
import { useAnimalStore } from '../../../lib/store/useAnimalStore';
import MiniButton from '../MiniButton';

interface EventCardProps {
  event: Events;
}

const EventCard = ({ event }: EventCardProps) => {
  // Parse the fecha field (assumed format: YYYY-MM-DD)
  const eventDate = parse(event.fecha, 'yyyy-MM-dd', new Date());
  const { deleteEvent } = useAnimalStore();

  // Format date in natural language (e.g., "Martes, 19 de octubre")
  const formattedDate = format(eventDate, "EEEE, d 'de' MMMM", { locale: es });

  // Determine if the event has passed
  let eventDateTime = eventDate;
  if (event.horaEvento && event.minutosEvento !== undefined) {
    eventDateTime = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate(),
      event.horaEvento,
      event.minutosEvento
    );
  }
  const hasPassed = isBefore(eventDateTime, new Date());

  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de eliminar este evento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteEvent(event.id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{event.comentario}</Text>
        <Text style={[styles.status, hasPassed ? styles.passed : styles.upcoming]}>
          {hasPassed ? 'Evento pasado' : 'Evento próximo'}
        </Text>
      </View>
      <Text style={styles.date}>
        Fecha del evento: <Text style={styles.dateInfo}>{formattedDate}</Text>
      </Text>
      {event.horaEvento && (
        <Text style={styles.time}>
          Hora Evento: {event.horaEvento}:{event.minutosEvento.toString().padStart(2, '0')}
        </Text>
      )}
      <View style={styles.miniButtonContainer}>
      <MiniButton icon="trash-outline" text="Eliminar" onPress={handleDelete} backgroundColor={newColors.rojo} color={newColors.fondo_principal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 5,
    borderBottomWidth: constants.borderWidth,
    borderRadius: constants.borderRadius,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 30,
    borderColor: newColors.fondo_secundario,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
    fontFamily: constants.FontTitle,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: newColors.fondo_secundario,
    marginBottom: 4,
    fontFamily: constants.FontTitle,
    fontWeight: '600',
  },
  dateInfo: {
    fontSize: 14,
    color: newColors.fondo_secundario,
    marginBottom: 4,
    fontFamily: constants.FontTitle,
    fontWeight: '400',
  },
  time: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  passed: {
    color: newColors.fondo_principal,
    backgroundColor: newColors.rojo,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: constants.borderRadius,
  },
  upcoming: {
    color: newColors.fondo_principal,
    backgroundColor: newColors.verde_light,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: constants.borderRadius,
  },
  miniButtonContainer: {
    maxWidth: '40%',
  },
});

export default EventCard;
