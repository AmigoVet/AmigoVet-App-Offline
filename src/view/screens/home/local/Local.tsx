import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import GlobalContainer from '../../../components/GlobalContainer'
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';
import CustomImage from '../../../components/customs/CustomImage';
import PrivateAnimalCard from './components/PrivateAnimalCard';

const Local = () => {
  const { animals, loadAnimals } = useAnimalStore();

  useEffect(() => {
    loadAnimals().catch((error) => {
      console.error('[ERROR] Error al cargar animales:', error);
    });
  }, [loadAnimals]);

  return (
    <GlobalContainer>
      <FlatList
        ListHeaderComponent={() => (
          <Text>Animales en la base de datos</Text>
        )}
        data={animals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PrivateAnimalCard animal={item} />
        )}
      />
    </GlobalContainer>
  )
}

export default Local