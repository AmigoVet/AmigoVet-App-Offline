import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Notes } from '../../../../../lib/interfaces/Notes';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';

interface NoteCardProps {
  note: Notes;
}

const NoteSectionCard = ({ note }: NoteCardProps) => {
 // Parse the fecha field (assumed format: YYYY-MM-DD)
 const noteDate = parse(note.fecha, 'yyyy-MM-dd', new Date());

 // Format date in natural language (e.g., "Martes, 19 de octubre")
 const formattedDate = format(noteDate, "EEEE, d 'de' MMMM", { locale: es });
 return (
   <View style={styles.card}>
     <View style={styles.header}>
       <Text style={styles.title}>• {note.nota}</Text>
     </View>
     <Text style={styles.date}>
       Fecha de la nota: <Text style={styles.dateInfo}>{formattedDate}</Text>
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

export default NoteSectionCard;
