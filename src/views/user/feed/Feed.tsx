import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createGlobalStyles } from '../../../assets/styles/styles'
import HeaderFeed from './components/HeaderFeed';
import FilterBarFeed from './components/FilterBarFeed';
import ProgramerFeed from './components/ProgramerFeed';
import NoticesFeed from './components/NoticesFeed';
import useAuthStore from '../../../lib/store/authStore';
import { ScrollView } from 'react-native-gesture-handler';
import { newColors } from '../../../assets/styles/colors';
import MiniAnimalList from './components/MiniAnimalList';
import { exampleEvents } from '../../../assets/texts/examplesDates';
import Separator from '../../../components/global/Separator';
import { getLastFiveAnimals } from '../../../lib/db/getDataAnimal';

const Feed = () => {
  const user = useAuthStore((state) => state.user);

  const [animals, setAnimals] = useState<{ nombre: string, especie: string, descripcion: string, image: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnimals = async () => {
      setIsLoading(true);
      const data = await getLastFiveAnimals(user!.userId);
      setAnimals(data);
      setIsLoading(false);
    };
    loadAnimals();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: newColors.fondo_principal }}>
      <HeaderFeed userName={user!.nombre} />
      <MiniAnimalList animals={animals} /> 
      <FilterBarFeed onChange={(value) => console.log(value)} />
      <ProgramerFeed events={exampleEvents} />
      <NoticesFeed animals={animals} />
      <Separator />
    </ScrollView>
  );
};


export default Feed