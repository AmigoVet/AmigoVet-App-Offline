import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Register } from '../../../../../lib/interfaces/Register';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';

import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';

interface RegisterSectionCardProps {
    register: Register;
}

const RegisterdSectionCard = ({register}:  RegisterSectionCardProps) => {

  const registerDate = parse(register.fecha, 'yyyy-MM-dd', new Date());

  // Format date in natural language (e.g., "Martes, 19 de octubre")
  const formattedDate = format(registerDate, "EEEE, d 'de' MMMM", { locale: es });


  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{register.comentario}</Text>
      </View>
      <Text style={styles.action}>
        Acción: <Text style={styles.actionInfo}>{register.accion}</Text>
      </Text>
      <Text style={styles.date}>
        Fecha del registro: <Text style={styles.dateInfo}>{formattedDate}</Text>
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
  action: {
    fontSize: 14,
    color: newColors.fondo_principal,
    marginBottom: 4,
    fontFamily: constants.FontTitle,
    fontWeight: '600',
  },
  actionInfo: {
    fontSize: 14,
    color: newColors.fondo_principal,
    fontFamily: constants.FontTitle,
    fontWeight: '400',
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
  miniButtonContainer: {
    maxWidth: '40%',
  },
});


export default RegisterdSectionCard;
