import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Events } from '../../../../../lib/interfaces/Events';
import { newColors } from '../../../../styles/colors';
import { styleSections } from './styles';

interface EventSectionProps {
  events: Events[];
}

const EventSection = ({ events }: EventSectionProps) => {
  return (
    <View style={styleSections.container}>
      <Text style={styleSections.title}>Eventos</Text>
      {events.length === 0 ? (
        <Text style={styleSections.noDataText}>No hay eventos</Text>
      ) : (
        events.map((event) => (
          <View key={event.id} style={styleSections.itemContainer}>
            <Text style={styles.itemText}>{event.comentario}</Text>
            <Text style={styles.itemDate}>{event.fecha}</Text>
          </View>
        ))
      )}
    </View>
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
});

export default EventSection;