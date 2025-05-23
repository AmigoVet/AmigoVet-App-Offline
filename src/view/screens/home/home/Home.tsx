import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
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

const Home = () => {
  const { user } = useAuthStore();
  const {
    animals,
    events,
    loadAnimals,
    loadEvents,
    loadNotes,
    loadRegisters,
  } = useAnimalStore();
  const limit = 10;

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          loadAnimals(1, limit),
          loadEvents(1, limit, { Reciente: true }),
          loadNotes(1, limit, { Reciente: true }),
          loadRegisters(1, limit, { Reciente: true }),
        ]);
      } catch (error) {
        console.error('[ERROR] Error al cargar datos:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos. Inténtalo de nuevo.');
      }
    };
    loadData();
  }, [ loadAnimals, loadEvents, loadNotes, loadRegisters]);

  const favoriteAnimals = animals.filter((animal) => animal.favorito);

  return (
    <GlobalContainer style={{ backgroundColor: newColors.fondo_secundario }}>
      <CustomScrollView>
        <HeaderHome userName={user?.fullName ?? 'Usuario'} animals={animals} />
        {animals.length === 0 ? (
          <View>
            <Text style={{ fontSize: 16, color: '#888', textAlign: 'center', marginTop: 60 }}>
              No tienes animales registrados.
            </Text>
          </View>
          ) : <Separator height={0} />}
        <FilterBarHome onChange={() => {}} />

        <ProgramerHome events={events} />

        <Text style={{ fontSize: 20, fontWeight: 'bold', color: newColors.fondo_principal, margin: 0 }}>
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
        <Separator height={50} />
      </CustomScrollView>
    </GlobalContainer>
  );
};

export default Home;
