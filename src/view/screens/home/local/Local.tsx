import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import GlobalContainer from '../../../components/GlobalContainer';
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';
import PrivateAnimalCard from './components/PrivateAnimalCard';
import CustomSwitch from '../../../components/customs/CustomSwitch';
import SearchButton from '../../../components/SearchButton';
import FilterBar from './components/FilterBar';
import Header from '../../../components/Header';
import { newColors } from '../../../styles/colors';
import { useAuthStore } from '../../../../lib/store/authStore';

const Local = () => {
  const { animals, totalAnimals, loadAnimals } = useAnimalStore();
  const { user } = useAuthStore();
  const [filters, setFilters] = useState<Record<string, string | number | boolean | undefined>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const handleFilterChange = useCallback((filterValues: Record<string, string | number | boolean | undefined>) => {
    setFilters(filterValues);
    setCurrentPage(1);
    loadAnimals(1, limit, user!.id ,filterValues).catch((error) => {
      console.error('[ERROR] Error al cargar animales:', error);
    });
  }, [loadAnimals, limit, user]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalAnimals / limit)) {
      setCurrentPage(newPage);
      loadAnimals(newPage, limit, user!.id,filters).catch((error) => {
        console.error('[ERROR] Error al cargar animales:', error);
      });
    }
  };

  useEffect(() => {
    loadAnimals(1, limit, user!.id,filters).catch((error) => {
      console.error('[ERROR] Error al cargar animales:', error);
    });
  }, [user, filters, limit, loadAnimals]); // Run only on mount

  return (
    <GlobalContainer>
      <Header title="Animales" onPress={() => {}} />
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
            <FilterBar onChange={handleFilterChange} />
          </>
        )}
        data={animals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PrivateAnimalCard animal={item} />
        )}
        ListFooterComponent={() => (
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
              onPress={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Text style={styles.paginationText}>Anterior</Text>
            </TouchableOpacity>
            <Text style={styles.pageInfo}>
              Página {currentPage} de {Math.ceil(totalAnimals / limit)}
            </Text>
            <TouchableOpacity
              style={[styles.paginationButton, currentPage === Math.ceil(totalAnimals / limit) && styles.disabledButton]}
              onPress={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(totalAnimals / limit)}
            >
              <Text style={styles.paginationText}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </GlobalContainer>
  );
};

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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  paginationButton: {
    backgroundColor: newColors.fondo_secundario,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: newColors.fondo_principal,
    opacity: 0.5,
  },
  paginationText: {
    color: newColors.fondo_principal,
    fontSize: 14,
  },
  pageInfo: {
    fontSize: 14,
    color: newColors.fondo_secundario,
  },
});

export default Local;
