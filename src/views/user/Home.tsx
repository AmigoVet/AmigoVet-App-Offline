import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors, newColors } from '../../assets/styles/colors';
import { createGlobalStyles } from '../../assets/styles/styles';
import { Animal, AnimalWithNotes } from '../../lib/interfaces/animal';
import useAuthStore from '../../lib/store/authStore';
import { getLenghtAnimal, getSimplificatedDataAnimalsWithNotes } from '../../lib/db/getDataAnimal';
import PrivateAnimalCard from '../../components/AnimalCard/PrivateAnimalCard';
import CustomSwitch from '../../components/Customs/CustomSwitch';
import SearchButton from '../../components/global/SearchButton';
import { constants } from '../../assets/styles/constants';
import FilterBar from '../../components/global/FilterBar';
import ContentModalHome from '../../components/modals/Home/ContentModalHome';
import { HomeViewStyles } from '../../assets/styles/HomeViewStyles';
import { calcularEdadAños } from '../../lib/functions/CalcularEdadAños';

const Home = () => {
  const user = useAuthStore((state) => state.user);
  const [animals, setAnimals] = useState<AnimalWithNotes[]>([]);
  const [originalAnimals, setOriginalAnimals] = useState<AnimalWithNotes[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>({} as Animal);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, string | undefined>>({});
  const modalRef = useRef<Modalize>(null);

  const animatedValues = useRef<{
    card: Animated.Value;
    hiddenItem: Animated.Value;
  }[]>([]);

  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const GlobalStyles = createGlobalStyles(isDarkTheme);
  const styles = HomeViewStyles(colors);

  const [totalAnimals, setTotalAnimals] = useState<number>(0);

  const loadAnimal = async () => {
    setIsLoading(true);
    try {
      const animales = await getSimplificatedDataAnimalsWithNotes(String(user?.userId));
      const lengthAnimals = await getLenghtAnimal(user!.userId);

      animatedValues.current = animales.map(() => ({
        card: new Animated.Value(0),
        hiddenItem: new Animated.Value(0),
      }));

      setTotalAnimals(lengthAnimals);
      setOriginalAnimals(animales); // Guarda los datos originales
      setAnimals(animales);

      const cardAnimations = animales.map((_, index) =>
        Animated.timing(animatedValues.current[index].card, {
          toValue: 1,
          duration: 800,
          delay: index * 150,
          useNativeDriver: true,
        })
      );

      Animated.sequence([
        Animated.parallel(cardAnimations),
        Animated.parallel(
          animales.map((_, index) =>
            Animated.timing(animatedValues.current[index].hiddenItem, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            })
          )
        ),
      ]).start();
    } catch (error) {
      console.error('Error loading animals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnimal();
  }, []);

  const openModal = (animal: Animal) => {
    setSelectedAnimal(animal);
    modalRef.current?.open();
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAnimal();
    setRefreshing(false);
  };

  const handleFilterChange = (filterValues: Record<string, string | undefined>) => {
    setFilters(filterValues);
    applyFilters(filterValues);
  };

  const applyFilters = (filterValues: Record<string, string | undefined>) => {
    const filteredAnimals = originalAnimals.filter((animal) => {
      const { Especie, Raza, Género, Propósito, Edad, Reciente, Antiguo } = filterValues;
  
      if (Especie && animal.especie !== Especie) return false;
      if (Raza && animal.raza !== Raza) return false;
      if (Género && animal.genero !== Género) return false;
      if (Propósito && animal.proposito !== Propósito) return false;
  
      if (Edad) {
        const animalEdad = animal.nacimiento ? calcularEdadAños(animal.nacimiento) : undefined;
        const edadFiltro = parseInt(Edad, 10);
  
        if (edadFiltro === 1) {
          if (animalEdad === undefined || animalEdad > 1) return false;
        } else if (edadFiltro === 10) {
          if (animalEdad === undefined || animalEdad < 10) return false;
        } else {
          if (animalEdad !== edadFiltro) return false;
        }
      }
  
      return true;
    });
  
    // Ordenar por reciente o antiguo
    if (filterValues.Reciente) {
      filteredAnimals.sort((a, b) => {
        const dateA = a.nacimiento ? new Date(a.nacimiento).getTime() : 0;
        const dateB = b.nacimiento ? new Date(b.nacimiento).getTime() : 0;
        return dateB - dateA; // Reciente primero
      });
    } else if (filterValues.Antiguo) {
      filteredAnimals.sort((a, b) => {
        const dateA = a.nacimiento ? new Date(a.nacimiento).getTime() : 0;
        const dateB = b.nacimiento ? new Date(b.nacimiento).getTime() : 0;
        return dateA - dateB; // Antiguo primero
      });
    }
  
    setAnimals(filteredAnimals);
  };
  

  const renderItem = ({ item, index }: { item: AnimalWithNotes; index: number }) => {
    const animatedStyle = {
      opacity: animatedValues.current[index].card.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };

    return (
      <Animated.View style={animatedStyle}>
        <PrivateAnimalCard animal={item} />
      </Animated.View>
    );
  };

  const renderHiddenItem = ({ item, index }: { item: AnimalWithNotes; index: number }) => {
    const animatedStyle = {
      opacity: animatedValues.current[index].hiddenItem.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };

    return (
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          style={[styles.deleteButton, styles.row]}
          onPress={() => openModal(item)}
        >
          <Text style={styles.hiddenText}>Eliminar</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };


  return (
    <>
      <View style={[GlobalStyles.container]}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={newColors.fondo_secundario} />
            <Text style={styles.loadingText}>Cargando animales...</Text>
          </View>
        ) : animals.length > 0 ? (
          <SwipeListView
            data={animals}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            keyExtractor={(item) => item.id}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            leftOpenValue={0}
            rightOpenValue={-85}
            disableRightSwipe
            ListFooterComponent={<Text style={styles.footer}>{`Registros disponibles: ${constants.cantidadPosiblesAnimales - totalAnimals}`}</Text>}
            ListHeaderComponent={
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
            }
          />
        ) : (
          <Text style={[GlobalStyles.error, { color: colors.rojo }]}>No hay animales registrados</Text>
        )}
      </View>

      <Modalize ref={modalRef} modalHeight={200} modalStyle={{ backgroundColor: colors.fondo }}>
        <ContentModalHome selectedAnimal={selectedAnimal} modalRef={modalRef} onPress={loadAnimal} />
      </Modalize>
    </>
  );
};

export default Home;
