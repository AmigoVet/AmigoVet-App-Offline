import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { newColors } from '../../../../assets/styles/colors';
import { Notes } from '../../../../lib/interfaces/animal';

interface NotesProps {
  notes: Notes[];
}

const NotesSection = ({ notes }: NotesProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas</Text>
      {notes.length === 0 ? (
        <Text style={styles.noDataText}>No hay notas</Text>
      ) : (
        notes.map((note) => (
          <View key={note.id} style={styles.itemContainer}>
            <Text style={styles.itemText}>{note.nota}</Text>
            <Text style={styles.itemDate}>{note.fecha}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: newColors.fondo_secundario,
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: newColors.fondo_principal,
    borderBottomWidth: 1,
    borderColor: newColors.fondo_principal,
    alignSelf: 'center', // Centra el título horizontalmente
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 14,
    color: newColors.fondo_principal,
    textAlign: 'center',
    marginTop: 10,
  },
  itemContainer: {
    width: '90%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: newColors.fondo_principal,
    borderRadius: 5,
  },
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

export default NotesSection;