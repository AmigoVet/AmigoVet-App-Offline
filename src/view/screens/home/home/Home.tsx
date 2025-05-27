import React, { useEffect } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import GlobalContainer from '../../../components/GlobalContainer';
import CustomScrollView from '../../../components/customs/CustomScrollView';
import HeaderHome from './components/HeaderHome';
import { useAuthStore } from '../../../../lib/store/authStore';
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';
import FilterBarHome from './components/FilterBarHome';
import ProgramerHome from './components/ProgramerHome';
import { newColors } from '../../../styles/colors';
import Separator from '../../../components/Separator';
import PrivateAnimalCard from '../local/components/PrivateAnimalCard';
import { Animal } from '../../../../lib/interfaces/Animal';

const Home = () => {
  const { user } = useAuthStore();
  const { animals, events, loadAnimals, loadEvents, loadNotes, loadRegisters } = useAnimalStore();
  const limit = 10;

  // Test Supabase connection

  // Existing data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Cargar los animales
        await loadAnimals(1, limit, user!.id);
        const animalsIds = animals.map((animal: Animal) => animal.id);
        if (animalsIds.length > 0) {
          await Promise.all([
            loadEvents(1, limit, { Reciente: true }, animalsIds),
            loadNotes(1, limit, { Reciente: true }, animalsIds),
            loadRegisters(1, limit, { Reciente: true }, animalsIds),
          ]);
        }
      } catch (error) {
        console.error('[ERROR] Error al cargar datos:', error);
      }
    };

    if (user?.id) {
      loadData();
    }
  }, [loadAnimals, loadEvents, loadNotes, loadRegisters, user]);

  const favoriteAnimals = animals.filter((animal) => animal.favorito);

  return (
    <GlobalContainer style={{ backgroundColor: newColors.fondo_secundario }}>
      <CustomScrollView>
        <HeaderHome userName={user!.name ?? 'Usuario'} animals={animals} />
        {animals.length === 0 ? (
          <View>
            <Text style={styles.noAnimalsText}>No tienes animales registrados.</Text>
          </View>
        ) : (
          <Separator height={0} />
        )}
        <FilterBarHome onChange={() => {}} />
        <ProgramerHome events={events} />
        <Text style={styles.favoriteTitle}>Animales Favoritos</Text>
        {favoriteAnimals.length === 0 ? (
          <Text style={styles.noFavoritesText}>No tienes animales favoritos.</Text>
        ) : (
          <FlatList
            data={favoriteAnimals}
            renderItem={({ item }) => <PrivateAnimalCard animal={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.flatList}
          />
        )}
        <Separator height={50} />
      </CustomScrollView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  noAnimalsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 60,
  },
  favoriteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: newColors.fondo_principal,
    margin: 0,
  },
  noFavoritesText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  flatList: {
    marginBottom: 10,
  },
});

export default Home;
