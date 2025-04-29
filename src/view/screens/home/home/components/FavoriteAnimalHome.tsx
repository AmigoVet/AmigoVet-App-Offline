import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Animal } from '../../../../../lib/interfaces/Animal'
import { newColors } from '../../../../styles/colors'
import PrivateAnimalCard from '../../local/components/PrivateAnimalCard'

interface FavoriteAnimalHomeProps {
  animals: Animal[]
}

const FavoriteAnimalHome = ({animals}: FavoriteAnimalHomeProps) => {

  const favoriteAnimals = animals

  return (
    <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: newColors.fondo_principal, margin: 10 }}>
          Animales Favoritos
        </Text>
        {favoriteAnimals.length === 0 ? (
          <Text style={{ fontSize: 16, color: '#888', textAlign: 'center', marginBottom: 10 }}>
            No tienes animales favoritos.
          </Text>
        ) : (
          <FlatList
            data={favoriteAnimals}
            renderItem={({ item }) => <PrivateAnimalCard animal={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={{ marginBottom: 10 }}
          />
        )}
    </View>
  )
}

export default FavoriteAnimalHome