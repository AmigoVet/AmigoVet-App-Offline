import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { format, parse, isBefore } from 'date-fns';
import { es } from 'date-fns/locale';
import { Events } from '../../../../../lib/interfaces/Events';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';

interface EventSectionCardProps {
  event: Events;
}

const EventSectionCard = ({ event }: EventSectionCardProps) => {
  // Parse the fecha field (assumed format: YYYY-MM-DD)
  const eventDate = parse(event.fecha, 'yyyy-MM-dd', new Date());

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

export default EventSectionCard;
