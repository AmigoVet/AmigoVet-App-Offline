import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Events, sendNotifi } from '../../../../../lib/interfaces/Events';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';
import Icon from '@react-native-vector-icons/ionicons';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const EventItem = ({ item }: { item: Events }) => {
  const { animals } = useAnimalStore();
  const animal = animals.find((a) => a.id === item.animalId);
  const animalImage = animal?.image ?? 'https://example.com/default-image.png';

  // Format event time from dateEvent
  let eventDateTime: Date;
  try {
    eventDateTime = parseISO(item.dateEvent);
  } catch (error) {
    console.warn(`Invalid dateEvent for event ${item.id}: ${item.dateEvent}`);
    eventDateTime = new Date();
  }
  const eventTime = format(eventDateTime, 'HH:mm', { locale: es });

  // Map sendNotifi to display text
  const sendNotifiDisplayMap: { [key in sendNotifi]: string } = {
    '1d': 'un dia antes',
    '2d': '2 días antes',
    '3d': '3 días antes',
    '4d': '4 días antes',
    '5d': '5 días antes',
    '1w': 'una semana antes',
    '2w': '2 semanas antes',
  };

  const notificationText = item.sendNotifi
    ? `Se te notificará ${sendNotifiDisplayMap[item.sendNotifi]}`
    : 'Sin notificación programada';

  return (
    <TouchableOpacity style={styles.eventItem}>
      <View style={styles.eventContent}>
        <Image source={{ uri: animalImage }} style={styles.eventImage} />
        <View style={styles.textContainer}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventTitle}>{animal?.nombre || 'Desconocido'}</Text>
          </View>
          <Text style={styles.eventDate}>Evento a las {eventTime}</Text>
          <Text style={styles.eventDescription}>{item.comentario || 'Sin comentario'}</Text>
          <Text style={styles.notificationText}>{notificationText}</Text>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Icon name="notifications-outline" size={25} color={newColors.fondo_secundario} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: constants.borderWidth,
    borderColor: newColors.fondo_secundario,
    borderRadius: constants.borderRadius,
  },
  eventContent: {
    flexDirection: 'row',
    gap: 10,
  },
  textContainer: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: newColors.fondo_secundario,
    fontFamily: constants.FontTitle,
  },
  eventDescription: {
    fontSize: 15,
    color: newColors.fondo_secundario,
    fontFamily: constants.FontText,
    opacity: 0.8,
    marginTop: 4,
  },
  eventDate: {
    fontSize: 14,
    fontWeight: '600',
    color: newColors.verde_light,
    fontFamily: constants.FontText,
    marginTop: 4,
  },
  notificationText: {
    fontSize: 13,
    color: newColors.fondo_secundario,
    fontFamily: constants.FontText,
    fontStyle: 'italic',
    marginTop: 4,
  },
  eventImage: {
    width: 75,
    height: 75,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: newColors.fondo_secundario,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationIcon: {
    paddingTop: 5,
  },
});

export default EventItem;
