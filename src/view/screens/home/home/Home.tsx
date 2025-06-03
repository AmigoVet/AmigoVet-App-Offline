import React, { useEffect } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import GlobalContainer from '../../../components/GlobalContainer';
import CustomScrollView from '../../../components/customs/CustomScrollView';
import HeaderHome from './components/HeaderHome';
import { useAuthStore } from '../../../../lib/store/authStore';
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';
import ProgramerHome from './components/ProgramerHome';
import { newColors } from '../../../styles/colors';
import Separator from '../../../components/Separator';
import PrivateAnimalCard from '../local/components/PrivateAnimalCard';
import { Animal } from '../../../../lib/interfaces/Animal';
import ListToolsHome from './components/ListToolsHome';

const Home = () => {
  const { user } = useAuthStore();
  const { animals, events, loadAnimals, loadEvents, loadNotes, loadRegisters } = useAnimalStore();
  const limit = 10;

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) {return;}

      try {
        // 1. Cargar los animales
        await loadAnimals(1, limit, user.id);
        // 2. Obtener el estado actualizado de animals desde el store
        const updatedAnimals = useAnimalStore.getState().animals;
        console.log('Animals after load:', updatedAnimals);

        // 3. Generar animalsIds
        const animalsIds = updatedAnimals.map((animal: Animal) => animal.id);
        console.log('animalsIds:', animalsIds);

        // 4. Cargar eventos, notas y registros si hay animales
        if (animalsIds.length > 0) {
          await Promise.all([
            loadEvents(1, 20, {}, animalsIds),
            loadNotes(1, limit, { Reciente: true }, animalsIds),
            loadRegisters(1, limit, { Reciente: true }, animalsIds),
          ]);
          // 5. Obtener el estado actualizado de events
          const updatedEvents = useAnimalStore.getState().events;
          console.log('Events after load:', updatedEvents);
        } else {
          console.log('No animals found, skipping events, notes, and registers load');
          useAnimalStore.getState();
        }
      } catch (error) {
        console.error('[ERROR] Error al cargar datos:', error);
      }
    };

    loadData();
  }, [loadAnimals, loadEvents, loadNotes, loadRegisters, user]);

  const favoriteAnimals = animals.filter((animal) => animal.favorito);

  return (
    <GlobalContainer style={{ backgroundColor: newColors.fondo_secundario }}>
      <CustomScrollView>
        <HeaderHome userName={user?.name ?? 'Usuario'} animals={animals} />
        {animals.length === 0 ? (
          <View>
            <Text style={styles.noAnimalsText}>No tienes animales registrados.</Text>
          </View>
        ) : (
          <Separator height={0} />
        )}
        <ListToolsHome />
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
