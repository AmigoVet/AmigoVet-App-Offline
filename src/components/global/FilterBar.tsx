import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { generos, Especie, especiesRazasMap, propositosPorEspecie } from '../../lib/interfaces/animal';
import { newColors } from '../../assets/styles/colors';
import { constants } from '../../assets/styles/constants';

type Filter = {
  id: string;
  label: string;
  options: string[];
  selectedOption?: string;
};

const FilterBar: React.FC = () => {
  const [filters, setFilters] = useState<Filter[]>([
    { id: '1', label: 'Género', options: generos },
    { id: '2', label: 'Especie', options: Object.keys(especiesRazasMap) },
    { id: '3', label: 'Raza', options: Object.values(especiesRazasMap).flat() },
    { id: '4', label: 'Propósito', options: Object.values(propositosPorEspecie).flat() },
    { id: '5', label: 'Reciente', options: [] },
    { id: '6', label: 'Antiguo', options: [] },
    { id: '7', label: 'Edad', options: [] },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (filter: Filter) => {
    setSelectedFilter(filter);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedFilter(null);
  };

  const selectOption = (option: string) => {
    if (selectedFilter) {
      setFilters((prevFilters) =>
        prevFilters.map((filter) =>
          filter.id === selectedFilter.id
            ? { ...filter, selectedOption: option === 'Ninguno' ? undefined : option }
            : filter
        )
      );
      closeModal();
    }
  };

  const renderFilterItem = ({ item }: { item: Filter }) => (
    <TouchableOpacity style={styles.filterButton} onPress={() => openModal(item)}>
      <Text style={styles.filterText}>{item.selectedOption || item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filters}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderFilterItem}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedFilter?.label}</Text>
            {selectedFilter?.options.length ? (
              <FlatList
                data={['Ninguno', ...selectedFilter.options]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => selectOption(item)}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text style={styles.noOptionsText}>No hay opciones disponibles</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  filterButton: {
    backgroundColor: newColors.verde,
    borderRadius: constants.borderRadius,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    color: newColors.fondo_principal,
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: newColors.fondo_principal,
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: newColors.principalLight,
  },
  optionText: {
    fontSize: 16,
    color: newColors.fondo_secundario,
  },
  noOptionsText: {
    fontSize: 16,
    color: newColors.rojo,
    textAlign: 'center',
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: newColors.rojo,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: newColors.principal,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FilterBar;
