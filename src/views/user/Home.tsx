import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors, newColors } from '../../assets/styles/colors';
import { createGlobalStyles } from '../../assets/styles/styles';
import { Animal, AnimalWithNotes } from '../../lib/interfaces/animal';
import useAuthStore from '../../lib/store/authStore';
import { getLenghtAnimal, getSimplificatedDataAnimalsWithNotes } from '../../lib/db/getDataAnimal';
import { deleteDataAnimal } from '../../lib/db/animals/deleteDataAnimal';
import PrivateAnimalCard from '../../components/AnimalCard/PrivateAnimalCard';
import CustomSwitch from '../../components/Customs/CustomSwitch';
import SearchButton from '../../components/global/SearchButton';
import { constants } from '../../assets/styles/constants';
import FilterBar from '../../components/global/FilterBar';
import ContentModalHome from '../../components/modals/Home/ContentModalHome';
import { HomeViewStyles } from '../../assets/styles/HomeViewStyles';

const Home = () => {
  const user = useAuthStore((state) => state.user);
  const [animals, setAnimals] = useState<AnimalWithNotes[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>({} as Animal);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const modalRef = useRef<Modalize>(null);
  
  // Animation refs for each animal card and hidden item
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
      
      // Create animated values for each animal's card and hidden item
      animatedValues.current = animales.map(() => ({
        card: new Animated.Value(0),
        hiddenItem: new Animated.Value(0)
      }));
      
      setTotalAnimals(lengthAnimals);
      setAnimals(animales);

      // Animate cards first
      const cardAnimations = animales.map((_, index) => 
        Animated.timing(animatedValues.current[index].card, {
          toValue: 1,
          duration: 800,
          delay: index * 150,
          useNativeDriver: true
        })
      );

      // Animate hidden items after cards are done
      Animated.sequence([
        Animated.parallel(cardAnimations),
        Animated.parallel(
          animales.map((_, index) => 
            Animated.timing(animatedValues.current[index].hiddenItem, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true
            })
          )
        )
      ]).start();

    } catch (error) {
      console.error("Error loading animals:", error);
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

  const renderItem = ({ item, index }: { item: AnimalWithNotes, index: number }) => {
    // Animated style for card with smoother fade and scale
    const animatedStyle = {
      opacity: animatedValues.current[index].card.interpolate({
        inputRange: [0, 0.3, 1],
        outputRange: [0, 0.3, 1]
      }),
      transform: [
        {
          scale: animatedValues.current[index].card.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.9, 0.95, 1]
          })
        }
      ]
    };

    return (
      <Animated.View style={animatedStyle}>
        <PrivateAnimalCard animal={item} />
      </Animated.View>
    );
  };

  const renderHiddenItem = ({ item, index }: { item: AnimalWithNotes, index: number }) => {
    // Animated style for hidden item
    const animatedStyle = {
      opacity: animatedValues.current[index].hiddenItem.interpolate({
        inputRange: [0, 0.3, 1],
        outputRange: [0, 0.3, 1]
      })
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

  const onSwitchFilter = (value: string) => {
    console.log(value);
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
            leftOpenValue={0}
            rightOpenValue={-85}
            refreshing={refreshing}
            disableRightSwipe
            onRefresh={handleRefresh}
            disableLeftSwipe={false}
            ListFooterComponent={<Text style={styles.footer}>{`Registros disponibles: ${constants.cantidadPosiblesAnimales - totalAnimals}`}</Text>}
            ListHeaderComponent={
              <>
                <View style={styles.searchContainer}>
                  <View style={styles.customSwitch}>
                    <CustomSwitch option1="Privado" option2="Público" onSwitch={onSwitchFilter} />
                  </View>
                  <View style={styles.searchButton}>
                    <SearchButton />
                  </View>
                </View>
                <FilterBar onChange={(value) => console.log(value)} />
              </>
            }
          />
        ) : (
          <Text style={[GlobalStyles.error, { color: colors.rojo }]}>No hay animales registrados</Text>
        )}
      </View>

      <Modalize ref={modalRef} modalHeight={200} modalStyle={{ backgroundColor: colors.fondo }}>
        <ContentModalHome selectedAnimal={selectedAnimal!} modalRef={modalRef} onPress={loadAnimal} />
      </Modalize>
    </>
  );
};

export default Home;