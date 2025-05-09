import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { Animal } from '../../../../../lib/interfaces/Animal';
import { newColors } from '../../../../styles/colors';
import { styleSections } from './styles';
import MiniButton from '../../../../components/MiniButton';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../../../navigator/navigationTypes';

interface RegistersProps {
  animal?: Animal;
}

const RegisterSection = ({ animal }: RegistersProps) => {
  const navigation = useNavigation<NavigationProp>();
  const {deleteRegister, animals } = useAnimalStore();
  const animalId = animal!.id;
  const animalName = animal!.nombre;
  // Guard clause for undefined animal
  if (!animal || !animal.id) {
    return (
      <View style={styleSections.container}>
        <Text style={styleSections.noDataText}>Error: No se proporcionó información del animal</Text>
      </View>
    );
  }

  // Obtener los registros del animal desde el store or props
  const animalRegisters = animals.find((a) => a.id === animal.id)?.registers || animal.registers || [];

  const handleDeleteRegister = (registerId: string) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteRegister(registerId);
              Alert.alert('Éxito', 'Registro eliminado correctamente.');
            } catch (error: any) {
              Alert.alert('Error', `No se pudo eliminar el registro: ${error.message || 'Error desconocido'}`);
              console.error('Error al eliminar registro:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <>
      <View style={styleSections.container}>
        <View style={styleSections.header}>
          <Text style={styleSections.title}>Registros</Text>
          <View style={styleSections.buttonsContainer}>
            <MiniButton text="Agregar" icon="add-outline" onPress={() => navigation.navigate('CreateRegisterForm', {animal})} />
            <MiniButton
              text="Ver todos"
              icon="book-outline"
              onPress={() => navigation.navigate('AllRegisters', {animalId, animalName})} />
          </View>
        </View>
        {animalRegisters.length === 0 ? (
          <Text style={styleSections.noDataText}>No hay registros</Text>
        ) : (
          animalRegisters.map((register) => (
            <View key={register.id} style={styleSections.itemContainer}>
              <TouchableOpacity style={styles.itemContainer}>
                <Text style={styles.itemText}>{register.comentario} ({register.accion})</Text>
                <Text style={styles.itemDate}>
                  {new Date(register.fecha).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </Text>
              </TouchableOpacity>
              <MiniButton
                text=""
                icon="trash-outline"
                backgroundColor={newColors.rojo}
                color={newColors.fondo_principal}
                onPress={() => handleDeleteRegister(register.id)}
              />
            </View>
          ))
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 10,
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

export default RegisterSection;
