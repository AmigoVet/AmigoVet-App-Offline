import { View, Text } from 'react-native';
import React from 'react';
import { Animal } from '../../../../../lib/interfaces/Animal';
import { styleSections } from './styles';
import MiniButton from '../../../../components/MiniButton';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../../../navigator/navigationTypes';
import RegisterdSectionCard from '../cards/RegisterdSectionCard';

interface RegistersProps {
  animal?: Animal;
}

const RegisterSection = ({ animal }: RegistersProps) => {
  const navigation = useNavigation<NavigationProp>();
  const { animals } = useAnimalStore();
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

  return (
    <View style={styleSections.container}>
      <View style={styleSections.header}>
        <Text style={styleSections.title}>Registros</Text>
        <View style={styleSections.buttonsContainer}>
          <MiniButton
            text="Agregar"
            icon="add-outline"
            onPress={() => navigation.navigate('CreateRegisterForm', { animal })}
          />
          <MiniButton
            text="Ver todos"
            icon="book-outline"
            onPress={() => navigation.navigate('AllRegisters', { animalId, animalName })}
          />
        </View>
      </View>
      {animalRegisters.length === 0 ? (
        <Text style={styleSections.noDataText}>No hay registros</Text>
      ) : (
        animalRegisters.map((register) => (
          <RegisterdSectionCard key={register.id} register={register} />
        ))
      )}
    </View>
  );
};

export default RegisterSection;
