import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Welcome';
import { loadAllDataAnimal } from '../functions/loadAllDataAnimal';
import { Animal, Notes } from '../../../lib/interfaces/animal';
import { Register } from '@tanstack/react-query';
import { Events } from '../../../lib/interfaces/events';
import { ButtonAddEvent, ButtonAddRegister, ButtonEditData, ButtonRequestGPT } from './buttons';
import { CustomImage } from '../../../components/Customs';

export const defaultAnimal: Animal = {
  ownerId: "",
  id: "",
  identificador: "",
  nombre: "Desconocido",
  especie: "Desconocida",
  raza: "Desconocida",
  edad: "",
  nacimiento: "",
  genero: "Desconocido",
  peso: "0",
  color: "Desconocido",
  descripcion: "Sin descripción",
  image: "",
  image2: "",
  image3: "",
  proposito: "No definido",
  ubicacion: "No definida",
  created_at: "",
  updated_at: "",
  embarazada: false,
  celo: "",
};

const AnimalView = () => {
  const id = useRoute<RouteProp<RootStackParamList, "AnimalView">>().params.id;

  const [animalData, setAnimalData] = useState<{
    animal: Animal;
    registers: Register[];
    notes: Notes[];
    events: Events[];
  }>({
    animal: defaultAnimal,
    registers: [],
    notes: [],
    events: [],
  });

  const fetchData = async () => {
    try {
      const data = await loadAllDataAnimal(id);
      setAnimalData({
        animal: data.animal || defaultAnimal, 
        registers: data.registers || [],
        notes: data.notes || [],
        events: data.events || [],
      });
    } catch (error) {
      console.error("Error cargando los datos:", error);
      setAnimalData({
        animal: defaultAnimal,
        registers: [],
        notes: [],
        events: [],
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  console.log('🐾 AnimalDataView:', JSON.stringify(animalData, null, 2));


  return (
    <>
      <ButtonAddEvent animalId={id} animalName={animalData.animal.nombre} onPress={() => {}} />
      <ButtonEditData id={id} animal={animalData.animal} onPress={() => {}} />
      <ButtonAddRegister animalId={id} animal={animalData.animal} onPress={() => {}} />
      <ButtonRequestGPT animal={animalData.animal} registers={animalData.registers} notes={animalData.notes} />
    </>
  );
};

export default AnimalView;
