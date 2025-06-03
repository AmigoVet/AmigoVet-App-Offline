import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../../../../navigator/navigationTypes';
import GlobalContainer from '../../../../components/GlobalContainer';
import Header from '../../../../components/Header';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import { Events } from '../../../../../lib/interfaces/Events';
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import EventCard from '../../../../components/cards/EventCard';
import CustomInput from '../../../../components/customs/CustomImput';
import { newColors } from '../../../../styles/colors';
import MiniButton from '../../../../components/MiniButton';
import { constants } from '../../../../styles/constants';

type AllEventsRouteProp = RouteProp<RootStackParamList, 'AllEvents'>;

const AllEvents = () => {
  const route = useRoute<AllEventsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { animalId, animalName } = route.params || {};
  const { events, totalEvents, loadEvents } = useAnimalStore();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 7;
  const totalPages = Math.ceil(totalEvents / limit);

  useEffect(() => {
    if (animalId) {
      loadEvents(
        page,
        limit,
        {
          comentario: searchQuery ? `%${searchQuery}%` : undefined,
        },
        [animalId] // Pass animalId as an array to animalsIds
      );
    }
  }, [page, searchQuery, animalId, loadEvents]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setPage(1); // Reset to first page when searching
  };

  const renderEvent = ({ item }: { item: Events }) => (
    <EventCard event={item} />
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      <MiniButton
        icon=""
        text="Anterior"
        disabled={page === 1}
        onPress={() => setPage(page - 1)}
      />
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
        <TouchableOpacity
          key={pageNum}
          onPress={() => setPage(pageNum)}
          style={[styles.pageNumber, pageNum === page && styles.activePageNumber]}
        >
          <Text style={styles.paginationText}>{pageNum}</Text>
        </TouchableOpacity>
      ))}
      <MiniButton
        disabled={page === totalPages}
        onPress={() => setPage(page + 1)}
        text="Siguiente"
        icon=""
      />
    </View>
  );

  return (
    <GlobalContainer>
      <Header
        title={'Eventos de ' + animalName}
        iconOnPress="chevron-back-outline"
        onPress={() => navigation.goBack()}
      />
      <CustomInput
        placeholder="Buscar por comentario..."
        value={searchQuery}
        onChangeText={handleSearch}
        iconName="search-outline"
      />
      {events.length === 0 ? (
        <Text style={styles.noEventsText}>No hay eventos disponibles</Text>
      ) : (
        <>
          <FlatList
            data={events}
            renderItem={renderEvent}
            keyExtractor={(item) => item.id}
            style={styles.eventList}
          />
          {totalPages > 1 && renderPagination()}
        </>
      )}
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  eventList: {
    flex: 1,
  },
  noEventsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  pageNumber: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: constants.borderRadius / 3,
    marginHorizontal: 5,
    backgroundColor: newColors.gris,
  },
  activePageNumber: {
    backgroundColor: newColors.fondo_secundario,
  },
  paginationText: {
    color: newColors.fondo_principal,
    fontSize: 14,
  },
});

export default AllEvents;
