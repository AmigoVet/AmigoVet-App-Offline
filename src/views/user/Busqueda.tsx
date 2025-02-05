// **Librerías externas**
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// **Interfaces y tipos**
import { Animal } from '../../lib/interfaces/animal';

// **Contexto y estilos**
import { useTheme } from '../../lib/context/ThemeContext';
import { createGlobalStyles } from '../../assets/styles/styles';

// **Componentes locales**
import { AnimalCard } from '../../components/AnimalDataView';
import { CustomInput } from '../../components/Customs';

// **Funciones utilitarias**
import { searchAnimals } from '../../lib/utils/asyncStorage';
import { Header } from '../../components/global';
import { newColors } from '../../assets/styles/colors';
import PrivateAnimalCard from '../../components/AnimalCard/PrivateAnimalCard';
import FeedCard from './feed/components/FeedCard';


const Busqueda = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Animal[]>([]);

  const { isDarkTheme } = useTheme();
  const GlobalStyles = createGlobalStyles(isDarkTheme);

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
      <Header title='Buscar animales' />

      <View style={styles.container}>
        <CustomInput
          label="Buscar"
          placeholder="Ingresa algún dato del animal"
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <ScrollView>
          {searchResults.map(animal => (
            <FeedCard key={animal.id} animal={animal} />
          ))}
          {searchResults.length === 0 && searchQuery.trim() !== '' && (
            <Text style={styles.textNotFound}>No se encontraron resultados.</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: newColors.fondo_principal,
    padding: 20,
  },
  textNotFound:{
    fontSize: 16,
    color: newColors.rojo,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  textSearch:{

  }
});

export default Busqueda;
