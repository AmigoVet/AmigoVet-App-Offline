import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../Welcome'
import { loadAllDataAnimal } from '../functions/loadAllDataAnimal'
import { Animal, Notes } from '../../../lib/interfaces/animal';
import { Register } from '@tanstack/react-query'
import { Events } from '../../../lib/interfaces/events'
import { ButtonAddEvent, ButtonAddRegister, ButtonEditData, ButtonRequestGPT } from './buttons'

const AnimalView = () => {
  const id = useRoute<RouteProp<RootStackParamList, "AnimalView">>().params.id;
  
  const [animalData, setAnimalData] = useState<{
    animal: Animal | null;
    registers: Register[] | null;
    notes: Notes[] | null;
    events: Events[] | null;
  }>({
    animal: null,
    registers: null,
    notes: null,
    events: null,
  });
  const fetchData = async () => {
    const data = await loadAllDataAnimal(id);
    setAnimalData(data);
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <ButtonAddEvent animalId={id} animalName={animalData.animal?.nombre || "Animal"} onPress={fetchData} />
      <ButtonEditData animal={animalData.animal!} onPress={fetchData} />
      <ButtonAddRegister animal={animalData.animal!} onPress={fetchData} />
      <ButtonRequestGPT animal={animalData.animal!} registers={animalData.registers!} notes={animalData.notes!} />
    </>
  )
}

export default AnimalView;
