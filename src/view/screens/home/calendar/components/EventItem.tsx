import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Events } from '../../../../../lib/interfaces/Events';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';
import Icon from '@react-native-vector-icons/ionicons';

const EventItem = ({ item }: { item: Events }) => {
  const { animals } = useAnimalStore();
  const animal = animals.find((a) => a.id === item.animalId);
  const animalImage = animal?.image ?? 'https://example.com/default-image.png';
  console.log('Evento desde el Calendar', item);

  return (
    <TouchableOpacity style={styles.eventItem}>
      <View style={styles.eventContent}>
        <Image source={{ uri: animalImage }} style={styles.eventImage} />
        <View style={styles.textContainer}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventTitle}>{animal?.nombre || 'Desconocido'}</Text>
            <Text style={styles.eventDate}>
              {item.notificationTime}
            </Text>
          </View>
          <Text style={styles.eventDescription}>{item.comentario || 'Sin comentario'}</Text>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Icon
            name="notifications-outline"
            size={25}
            color={newColors.fondo_secundario}
          />
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
    justifyContent: 'flex-start',
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
    marginTop: 4,
    opacity: 0.8,
  },
  eventDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: newColors.verde_light,
    fontFamily: constants.FontText,
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
