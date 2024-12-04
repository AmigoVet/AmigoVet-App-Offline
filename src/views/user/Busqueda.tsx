import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AnimalCard, CustomInput, Header } from '../../assets/components';
import { GlobalStyles } from '../../assets/styles';
import { searchAnimals } from '../../assets/utils/asyncStorage';
import { Animal } from '../../assets/interfaces/animal';

const Busqueda = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Animal[]>([]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const results = await searchAnimals(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <Header />

      <View style={GlobalStyles.container}>
        <CustomInput
          label="Buscar"
          placeholder="Ingresa algún dato del animal"
          value={searchQuery}
          onChangeText={handleSearch} // Llama a la función de búsqueda al cambiar el texto
        />

        <ScrollView>
          {searchResults.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
          {searchResults.length === 0 && searchQuery.trim() !== '' && (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No se encontraron resultados.</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default Busqueda;
