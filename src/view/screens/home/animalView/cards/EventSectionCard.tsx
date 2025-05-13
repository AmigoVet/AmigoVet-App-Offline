import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { format, isBefore, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Events, sendNotifi } from '../../../../../lib/interfaces/Events';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';

interface EventSectionCardProps {
  event: Events;
}

const EventSectionCard = ({ event }: EventSectionCardProps) => {
  // Parse dateEvent (ISO string, e.g., "2025-05-20T14:30:00.000Z")
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

  // Format date and time in natural language (e.g., "Martes, 19 de octubre", "14:30")
  const formattedDate = format(eventDateTime, "EEEE, d 'de' MMMM", { locale: es });
  const formattedTime = format(eventDateTime, 'HH:mm', { locale: es });

  // Determine if the event has passed
  const hasPassed = isBefore(eventDateTime, new Date());

  // Map sendNotifi to display text
  const sendNotifiDisplayMap: { [key in sendNotifi]: string } = {
    '1d': '1 día antes',
    '2d': '2 días antes',
    '3d': '3 días antes',
    '4d': '4 días antes',
    '5d': '5 días antes',
    '1w': '1 semana antes',
    '2w': '2 semanas antes',
  };

  // Get notification period text
  const notificationText = event.sendNotifi
    ? `Se te notificará ${sendNotifiDisplayMap[event.sendNotifi]}`
    : 'Sin notificación programada';

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
    borderColor: newColors.fondo_principal,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
    fontFamily: constants.FontTitle,
    color: newColors.fondo_principal,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: newColors.fondo_principal,
    marginBottom: 4,
    fontFamily: constants.FontTitle,
    fontWeight: '600',
  },
  dateInfo: {
    fontSize: 14,
    color: newColors.fondo_principal,
    marginBottom: 4,
    fontFamily: constants.FontTitle,
    fontWeight: '400',
  },
  time: {
    fontSize: 14,
    color: newColors.fondo_principal,
    marginBottom: 4,
    fontFamily: constants.FontTitle,
    fontWeight: '600',
  },
  notification: {
    fontSize: 14,
    color: newColors.fondo_principal,
    marginBottom: 4,
    fontFamily: constants.FontText,
    fontWeight: '400',
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
  error: {
    fontSize: 14,
    color: newColors.rojo,
    marginBottom: 4,
    fontFamily: constants.FontTitle,
  },
});

export default EventSectionCard;
