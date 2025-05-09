import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../../../../navigator/navigationTypes';
import GlobalContainer from '../../../../components/GlobalContainer';
import Header from '../../../../components/Header';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import { Notes } from '../../../../../lib/interfaces/Notes';
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import NoteCard from '../../../../components/cards/NoteCard';
import CustomInput from '../../../../components/customs/CustomImput';
import { newColors } from '../../../../styles/colors';
import MiniButton from '../../../../components/MiniButton';
import { constants } from '../../../../styles/constants';

type AllNotesRouteProp = RouteProp<RootStackParamList, 'AllNotes'>;

const AllNotes = () => {
  const route = useRoute<AllNotesRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { animalId, animalName } = route.params || {};
  const { notes, totalNotes, loadNotes } = useAnimalStore();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 7;
  const totalPages = Math.ceil(totalNotes / limit);

  useEffect(() => {
    loadNotes(page, limit, {
      animalId,
      comentario: searchQuery ? `%${searchQuery}%` : undefined,
    });
  }, [page, searchQuery, animalId, loadNotes]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setPage(1); // Reset to first page when searching
  };

  const renderNote = ({ item }: { item: Notes }) => (
    <NoteCard note={item} />
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
          style={[
            styles.pageNumber,
            pageNum === page && styles.activePageNumber,
          ]}
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
        title={'Notas de ' + animalName}
        iconOnPress="chevron-back-outline"
        onPress={() => navigation.goBack()}
      />
      <CustomInput
        placeholder="Buscar por comentario..."
        value={searchQuery}
        onChangeText={handleSearch}
        iconName="search-outline"
      />
      {notes.length === 0 ? (
        <Text style={styles.noNotesText}>No hay notas disponibles</Text>
      ) : (
        <>
          <FlatList
            data={notes}
            renderItem={renderNote}
            keyExtractor={(item) => item.id}
            style={styles.noteList}
          />
          {totalPages > 1 && renderPagination()}
        </>
      )}
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  noteList: {
    flex: 1,
  },
  noNotesText: {
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

export default AllNotes;