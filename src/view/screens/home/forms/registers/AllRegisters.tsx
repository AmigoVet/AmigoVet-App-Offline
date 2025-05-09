import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../../../../navigator/navigationTypes';
import GlobalContainer from '../../../../components/GlobalContainer';
import Header from '../../../../components/Header';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import RegisterCard from '../../../../components/cards/RegisterCard';
import CustomInput from '../../../../components/customs/CustomImput';
import { newColors } from '../../../../styles/colors';
import MiniButton from '../../../../components/MiniButton';
import { constants } from '../../../../styles/constants';
import { Register } from '../../../../../lib/interfaces/Register';

type AllRegistersRouteProp = RouteProp<RootStackParamList, 'AllRegisters'>;

const AllRegisters = () => {
  const route = useRoute<AllRegistersRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { animalId, animalName } = route.params || {};
  const { registers, totalRegisters, loadRegisters } = useAnimalStore();


  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 7;
  const totalPages = Math.ceil(totalRegisters / limit);

  useEffect(() => {
    const fetchRegisters = async () => {
      if (!animalId) {
        console.error('[AllRegisters] animalId is undefined');
        return;
      }

      try {
        console.log('[AllRegisters] Loading registers with:', { page, limit, animalId, searchQuery });
        await loadRegisters(page, limit, {
          animalId: animalId,
          comentario: searchQuery ? `%${searchQuery}%` : undefined,
        });
        console.log('[AllRegisters] Loaded registers:', registers.length, 'Total:', totalRegisters);
      } catch (error) {
        console.error('[AllRegisters] Error loading registers:', error);
      }
    };

    fetchRegisters();
  }, [page, searchQuery, animalId, loadRegisters]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setPage(1); // Reset to first page when searching
  };

  const renderRegister = ({ item }: { item: Register }) => (
    <RegisterCard register={item} />
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
        title={'Registros de ' + animalName}
        iconOnPress="chevron-back-outline"
        onPress={() => navigation.goBack()}
      />
      <CustomInput
        placeholder="Buscar por comentario..."
        value={searchQuery}
        onChangeText={handleSearch}
        iconName="search-outline"
      />
      {registers.length === 0 ? (
        <Text style={styles.noRegistersText}>No hay registros disponibles</Text>
      ) : (
        <>
          <FlatList
            data={registers}
            renderItem={renderRegister}
            keyExtractor={(item) => item.id}
            style={styles.registerList}
          />
          {totalPages > 1 && renderPagination()}
        </>
      )}
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  registerList: {
    flex: 1,
  },
  noRegistersText: {
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

export default AllRegisters;