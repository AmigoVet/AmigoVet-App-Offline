import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalContainer from '../../../components/GlobalContainer'
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';
import CustomImage from '../../../components/customs/CustomImage';
import PrivateAnimalCard from './components/PrivateAnimalCard';
import CustomSwitch from '../../../components/customs/CustomSwitch';
import SearchButton from '../../../components/SearchButton';
import FilterBar from './components/FilterBar';
import { calculateOldYears } from '../../../../lib/functions/CalculateOldYears';
import Header from '../../../components/Header';

const Local = () => {
  const { animals, loadAnimals } = useAnimalStore();
  const originalAnimals = animals;
  const [filters, setFilters] = useState<Record<string, string | undefined>>({});

  const handleFilterChange = (filterValues: Record<string, string | number | boolean | undefined>) => {
    // const stringFilterValues: Record<string, string | undefined> = {};
    // for (const key in filterValues) {
    //   if (filterValues[key] !== undefined) {
    //     stringFilterValues[key] = String(filterValues[key]);
    //   } else {
    //     stringFilterValues[key] = undefined;
    //   }
    // }
  
    // setFilters(stringFilterValues);
    // applyFilters(stringFilterValues);
  };

  const applyFilters = (filterValues: Record<string, string | undefined>) => {
    // const filteredAnimals = originalAnimals.filter((animal) => {
    //   const { Especie, Raza, Género, Propósito, Edad } = filterValues;
  
    //   if (Especie && animal.especie !== Especie) return false;
    //   if (Raza && animal.raza !== Raza) return false;
    //   if (Género && animal.genero !== Género) return false;
    //   if (Propósito && animal.proposito !== Propósito) return false;
  
    //   if (Edad) {
    //     const animalEdad = animal.nacimiento ? calculateOldYears(animal.nacimiento) : undefined;
    //     const edadFiltro = parseInt(Edad, 10);
  
    //     if (edadFiltro === 1) {
    //       if (animalEdad === undefined || animalEdad > 1) return false;
    //     } else if (edadFiltro === 10) {
    //       if (animalEdad === undefined || animalEdad < 10) return false;
    //     } else {
    //       if (animalEdad !== edadFiltro) return false;
    //     }
    //   }
  
    //   return true;
    // });
  }

  useEffect(() => {
    loadAnimals().catch((error) => {
      console.error('[ERROR] Error al cargar animales:', error);
    });
  }, [loadAnimals]);

  return (
    <GlobalContainer>
      <Header title="Animales"  onPress={() => {}} />
      <FlatList
        ListHeaderComponent={() => (
          <>
          <View style={styles.searchContainer}>
            <View style={styles.customSwitch}>
              <CustomSwitch option1="Privado" option2="Público" onSwitch={() => {}} />
            </View>
            <View style={styles.searchButton}>
              <SearchButton />
            </View>
          </View>
          <FilterBar onChange={(selectedValues) => handleFilterChange(selectedValues)} />
        </>
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


const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    gap: 10,
  },
  customSwitch: {
    flex: 3,
  },
  searchButton: {
    flex: 1,
  },
})

export default Local