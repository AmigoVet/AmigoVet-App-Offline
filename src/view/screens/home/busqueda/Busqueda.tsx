import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { debounce } from 'lodash';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import { NavigationProp } from '../../../navigator/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../../components/customs/CustomImput';
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';
import PrivateAnimalCard from '../local/components/PrivateAnimalCard';
import { Animal } from '../../../../lib/interfaces/Animal';
import { Notes } from '../../../../lib/interfaces/Notes';
import { Register } from '../../../../lib/interfaces/Register';
import { Events } from '../../../../lib/interfaces/Events';
import { newColors } from '../../../styles/colors';
import { constants } from '../../../styles/constants';

const Busqueda = () => {
  const navigation = useNavigation<NavigationProp>();
  const { animals, loadAnimals } = useAnimalStore();
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Memoized debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        setSearchText(text);
      }, 500),
    [] // Empty dependency array since setSearchText is stable
  );

  // Update input text and trigger debounced search
  const handleTextChange = (text: string) => {
    setInputText(text);
    debouncedSearch(text);
  };

  // Clean up debounce on component unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Load animals when debounced search text changes
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredAnimals([]);
      setHasSearched(false);
      return;
    }

    const fetchAnimals = async () => {
      setIsLoading(true);
      setHasSearched(true);
      try {
        await loadAnimals(1, 100); // Load up to 100 animals
      } catch (error) {
        console.error('[ERROR] Failed to load animals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimals();
  }, [searchText, loadAnimals]);

  // Filter animals based on debounced search text
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredAnimals([]);
      return;
    }

    const lowerSearchText = searchText.toLowerCase().trim();
    const filtered = animals.filter((animal) => {
      // Check top-level string fields
      const stringFields = [
        animal.nombre,
        animal.identificador,
        animal.especie,
        animal.raza,
        animal.color,
        animal.descripcion,
        animal.proposito,
        animal.ubicacion,
        animal.peso,
        animal.nacimiento,
        animal.created_at,
        animal.updated_at,
      ];

      if (stringFields.some((field) => field?.toLowerCase().includes(lowerSearchText))) {
        return true;
      }

      // Check boolean fields (convert to string)
      const booleanFields = [
        animal.embarazada ? 'embarazada' : '',
        animal.favorito ? 'favorito' : '',
        animal.isPublic ? 'public' : '',
        animal.isRespalded ? 'respalded' : '',
        animal.isChanged ? 'changed' : '',
      ];

      if (booleanFields.some((field) => field.toLowerCase().includes(lowerSearchText))) {
        return true;
      }

      // Check notes
      if (
        animal.notes?.some((note: Notes) =>
          [note.nota, note.fecha, note.created_at].some((field) =>
            field?.toLowerCase().includes(lowerSearchText)
          )
        )
      ) {
        return true;
      }

      // Check registers
      if (
        animal.registers?.some((register: Register) =>
          [register.comentario, register.accion, register.fecha].some((field) =>
            field?.toLowerCase().includes(lowerSearchText)
          )
        )
      ) {
        return true;
      }

      // Check events
      if (
        animal.events?.some((event: Events) =>
          [event.comentario, event.fecha, event.created_at, event.animalName].some((field) =>
            field?.toLowerCase().includes(lowerSearchText)
          )
        )
      ) {
        return true;
      }

      return false;
    });

    setFilteredAnimals(filtered);
  }, [searchText, animals]);

  const renderAnimal = ({ item }: { item: Animal }) => <PrivateAnimalCard animal={item} />;

  return (
    <GlobalContainer style={styles.container}>
      <Header
        title="Búsqueda de animales"
        onPress={() => navigation.goBack()}
        iconOnPress="chevron-back-outline"
      />
      <View style={styles.input}>
        <CustomInput
          placeholder="Buscar por cualquier dato (nombre, notas, ubicación, etc.)"
          value={inputText}
          onChangeText={handleTextChange}
          iconName="search-outline"
        />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={newColors.fondo_secundario} />
        </View>
      ) : !hasSearched ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Ingresa un término para buscar animales</Text>
        </View>
      ) : filteredAnimals.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No se encontraron animales</Text>
        </View>
      ) : (
        <FlatList
          data={filteredAnimals}
          renderItem={renderAnimal}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: newColors.gris,
    fontFamily: constants.FontText,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Busqueda;
