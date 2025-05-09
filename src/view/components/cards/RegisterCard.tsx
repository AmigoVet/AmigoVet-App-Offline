import React from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { Register } from '../../../lib/interfaces/Register';
import { useAnimalStore } from '../../../lib/store/useAnimalStore';
import { newColors } from '../../styles/colors';
import { constants } from '../../styles/constants';
import MiniButton from '../MiniButton';


interface RegisterCardProps {
  register: Register;
}

const RegisterCard = ({ register }: RegisterCardProps) => {
  // Parse the fecha field (assumed format: YYYY-MM-DD)
  const registerDate = parse(register.fecha, 'yyyy-MM-dd', new Date());
  const { deleteRegister } = useAnimalStore();

  // Format date in natural language (e.g., "Martes, 19 de octubre")
  const formattedDate = format(registerDate, "EEEE, d 'de' MMMM", { locale: es });

  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de eliminar este registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteRegister(register.id);
          },
        },
      ],
      { cancelable: true }
    );
  };

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
      <View style={styles.miniButtonContainer}>
        <MiniButton
          icon="trash-outline"
          text="Eliminar"
          onPress={handleDelete}
          backgroundColor={newColors.rojo}
          color={newColors.fondo_principal}
        />
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
  action: {
    fontSize: 14,
    color: newColors.fondo_secundario,
    marginBottom: 4,
    fontFamily: constants.FontTitle,
    fontWeight: '600',
  },
  actionInfo: {
    fontSize: 14,
    color: newColors.fondo_secundario,
    fontFamily: constants.FontTitle,
    fontWeight: '400',
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
  miniButtonContainer: {
    maxWidth: '40%',
  },
});

export default RegisterCard;