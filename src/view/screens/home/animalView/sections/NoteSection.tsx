import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Notes } from '../../../../../lib/interfaces/Notes';
import { newColors } from '../../../../styles/colors';
import { styleSections } from './styles';

interface NotesProps {
  notes: Notes[];
}

const NoteSection = ({ notes }: NotesProps) => {
  return (
    <View style={styleSections.container}>
      <Text style={styleSections.title}>Notas</Text>
      {notes.length === 0 ? (
        <Text style={styleSections.noDataText}>No hay notas</Text>
      ) : (
        notes.map((note) => (
          <View key={note.id} style={styleSections.itemContainer}>
            <Text style={styles.itemText}>{note.nota}</Text>
            <Text style={styles.itemDate}>{note.fecha}</Text>
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

export default NoteSection;