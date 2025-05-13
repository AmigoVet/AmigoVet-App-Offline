import React from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { Events, sendNotifi } from '../../../lib/interfaces/Events';
import { format, parseISO, isBefore } from 'date-fns';
import { es } from 'date-fns/locale';
import { constants } from '../../styles/constants';
import { newColors } from '../../styles/colors';
import { useAnimalStore } from '../../../lib/store/useAnimalStore';
import MiniButton from '../MiniButton';

interface EventCardProps {
  event: Events;
}

const EventCard = ({ event }: EventCardProps) => {
  const { deleteEvent } = useAnimalStore();

  let eventDateTime: Date;
  try {
    eventDateTime = parseISO(event.dateEvent);
  } catch (error) {
    console.warn(`Invalid dateEvent for event ${event.id}: ${event.dateEvent}`);
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{event.comentario}</Text>
        <Text style={styles.error}>Fecha inválida</Text>
      </View>
    );
  }

  const formattedDate = format(eventDateTime, "EEEE, d 'de' MMMM", { locale: es });
  const formattedTime = format(eventDateTime, 'HH:mm', { locale: es });

  const hasPassed = isBefore(eventDateTime, new Date());

  const sendNotifiDisplayMap: { [key in sendNotifi]: string } = {
    '1d': 'un día',
    '2d': '2 días',
    '3d': '3 días',
    '4d': '4 días',
    '5d': '5 días',
    '1w': 'una semana',
    '2w': '2 semanas',
  };

  const notificationText = event.sendNotifi
    ? `Se te notificará en ${sendNotifiDisplayMap[event.sendNotifi]}`
    : 'Sin notificación programada';

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
      <Text style={styles.time}>
        Hora: <Text style={styles.dateInfo}>{formattedTime}</Text>
      </Text>
      <Text style={styles.notification}>
        {notificationText}
      </Text>
      <View style={styles.miniButtonContainer}>
        <MiniButton
          icon="trash-outline"
          text="Eliminar"
          onPress={handleDelete}
          backgroundColor={newColors.rojo}
          color={newColors.fondo_principal}
        />
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
    color: newColors.fondo_secundario,
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
    color: newColors.fondo_secundario,
    marginBottom: 4,
    fontFamily: constants.FontTitle,
    fontWeight: '600',
  },
  notification: {
    fontSize: 13,
    color: newColors.fondo_secundario,
    marginBottom: 4,
    fontFamily: constants.FontText,
    fontStyle: 'italic',
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
  error: {
    fontSize: 14,
    color: newColors.rojo,
    marginBottom: 4,
    fontFamily: constants.FontTitle,
  },
});

export default EventCard;