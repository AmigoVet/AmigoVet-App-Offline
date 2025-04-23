import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import GlobalContainer from '../../../components/GlobalContainer'
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';
import CustomImage from '../../../components/customs/CustomImage';

const Local = () => {
  const { animals, loadAnimals } = useAnimalStore();

  useEffect(() => {
    loadAnimals().catch((error) => {
      console.error('[ERROR] Error al cargar animales:', error);
    });
  }, [loadAnimals]);

  return (
    <GlobalContainer>
      <Text>Lista de Animales</Text>
      <FlatList
        data={animals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <CustomImage source={item.image} />
            <Text>{item.nombre} ({item.especie})</Text>
            <Text>Raza: {item.raza}</Text>
            <Text>Género: {item.genero}</Text>
          </View>
        )}
      />
    </GlobalContainer>
  )
}

export default Local