import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { generos, especiesRazasMap, propositosPorEspecie } from '../../../../../lib/interfaces/Animal';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';
import Icon from '@react-native-vector-icons/ionicons';

const { height: screenHeight } = Dimensions.get('window');

type Filter = {
  id: string;
  label: string;
  options: string[];
  selectedOption?: string | number | boolean;
};

type FilterBarProps = {
  onChange: (selectedValues: { [key: string]: string | number | boolean | undefined }) => void;
};

const FilterBarHome: React.FC<FilterBarProps> = ({ onChange }) => {
  const [filters, setFilters] = useState<Filter[]>([
    { id: '1', label: 'Género', options: generos },
    { id: '2', label: 'Especie', options: Object.keys(especiesRazasMap) },
    { id: '3', label: 'Raza', options: Object.values(especiesRazasMap).flat() },
    { id: '4', label: 'Propósito', options: Object.values(propositosPorEspecie).flat() },
    { id: '5', label: 'Reciente', options: [] },
    { id: '6', label: 'Antiguo', options: [] },
    { id: '7', label: 'Edad', options: ['1 años', '2 años', '3 años', '4 años', '5 años', '6 años', '7 años', '8 años', '9 años', '10 años+'] },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const selectedValues = filters.reduce((acc, filter) => {
      acc[filter.label] = filter.selectedOption;
      return acc;
    }, {} as { [key: string]: string | number | boolean | undefined });
    onChange(selectedValues);
  }, [filters]);

  const openModal = (filter: Filter) => {
    if (filter.label === 'Reciente' || filter.label === 'Antiguo') {
      setFilters((prevFilters) =>
        prevFilters.map((f) =>
          f.id === filter.id ? { ...f, selectedOption: !f.selectedOption } : f
        )
      );
    } else {
      setSelectedFilter(filter);
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedFilter(null);
  };

  const selectOption = (option: string) => {
    if (selectedFilter) {
      const parsedOption =
        selectedFilter.label === 'Edad'
          ? option === '10 años+' ? 10 : option === 'Ninguno' ? undefined : parseInt(option.split(' ')[0], 10)
          : option === 'Ninguno'
          ? undefined
          : option;

      setFilters((prevFilters) =>
        prevFilters.map((filter) =>
          filter.id === selectedFilter.id
            ? { ...filter, selectedOption: parsedOption }
            : filter
        )
      );
      closeModal();
    }
  };

  const resetFilters = () => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) => ({ ...filter, selectedOption: undefined }))
    );
  };

  const renderFilterItem = ({ item }: { item: Filter }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        (item.label === 'Reciente' || item.label === 'Antiguo') && item.selectedOption
          ? { backgroundColor: newColors.fondo_secundario, borderColor: newColors.fondo_principal }
          : item.selectedOption
          ? { backgroundColor: newColors.fondo_secundario, borderColor: newColors.fondo_principal }
          : { backgroundColor: newColors.fondo_principal, borderColor: newColors.fondo_secundario },
      ]}
      onPress={() => openModal(item)}
    >
      <Text style={[
        styles.filterText,
        (item.label === 'Reciente' || item.label === 'Antiguo') && item.selectedOption
          ? { color: newColors.fondo_principal }
          : item.selectedOption
          ? { color: newColors.fondo_principal }
          : { color: newColors.fondo_secundario },
      ]}>
        {item.selectedOption !== undefined && item.label !== 'Reciente' && item.label !== 'Antiguo'
          ? String(item.selectedOption)
          : item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ id: '0', label: 'X', options: [] }, ...filters]}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <View style={styles.width20} />}
        ListFooterComponent={() => <View style={styles.width20} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          item.id === '0' ? (
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Icon name="options" size={30} color={newColors.fondo_principal} />
            </TouchableOpacity>
          ) : (
            renderFilterItem({ item })
          )
        }
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: screenHeight * 0.9 }]}>
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
    height: 80,
  },
  listContainer: {
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: newColors.fondo_principal,
    borderRadius: constants.borderRadius,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: newColors.fondo_secundario,
  },
  filterText: {
    color: newColors.fondo_secundario,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: constants.FontText
  },
  resetButton: {
    backgroundColor: newColors.verde_light,
    borderRadius: constants.borderRadius ,
    paddingVertical: 0,
    paddingHorizontal: 10,
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
    borderBottomWidth: 0.5,
    borderBottomColor: newColors.fondo_secundario,

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
  width20: {
    width: 20,
  },
});

export default FilterBarHome;
