import React from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAnimalStore } from '../../../lib/store/useAnimalStore';
import { newColors } from '../../styles/colors';
import { constants } from '../../styles/constants';
import MiniButton from '../MiniButton';
import { Notes } from '../../../lib/interfaces/Notes';

interface NoteCardProps {
  note: Notes;
}

const NoteCard = ({ note }: NoteCardProps) => {
  // Parse the fecha field (assumed format: YYYY-MM-DD)
  const noteDate = parse(note.fecha, 'yyyy-MM-dd', new Date());
  const { deleteNote } = useAnimalStore();

  // Format date in natural language (e.g., "Martes, 19 de octubre")
  const formattedDate = format(noteDate, "EEEE, d 'de' MMMM", { locale: es });

  // Determine if the note has passed

  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de eliminar esta nota?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteNote(note.id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{note.nota}</Text>
      </View>
      <Text style={styles.date}>
        Fecha de la nota: <Text style={styles.dateInfo}>{formattedDate}</Text>
      </Text>
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

export default NoteCard;
