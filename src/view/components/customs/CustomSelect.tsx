import React, { useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Modalize } from 'react-native-modalize';
import { newColors } from '../../styles/colors';
import { constants } from '../../styles/constants';
import { GlobalStyles } from '../../styles/GlobalStyles';

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
  required?: boolean;
  onModalOpen?: () => void;
  onModalClose?: () => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  options,
  onValueChange,
  required = false,
  onModalOpen,
  onModalClose,
}) => {
  const { width } = Dimensions.get('window');
  const fontSize = width * 0.04;
  const modalizeRef = useRef<Modalize>(null);

  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    pickerContainer: {
      borderWidth: 2,
      borderColor: newColors.fondo_secundario,
      borderRadius: constants.borderRadius / 2,
      height: 50,
      justifyContent: 'center',
    },
    picker: {
      width: '100%',
      height: 50,
      color: newColors.fondo_secundario,
    },
    pickerItemDefault: {
      color: newColors.fondo_principal,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    pickerItemOption: {
      color: newColors.fondo_principal,
      fontSize: fontSize,
      textAlign: 'center',
    },
    inputIOS: {
      fontSize: fontSize,
      color: newColors.fondo_secundario,
      padding: 10,
    },
    modalContent: {
      backgroundColor: 'white',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      padding: 15,
    },
    modalOption: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    modalOptionText: {
      fontSize: fontSize,
      color: newColors.fondo_secundario,
      textAlign: 'center',
    },
    modalCancel: {
      padding: 15,
      backgroundColor: newColors.rojo,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
    },
    modalCancelText: {
      color: 'white',
      fontSize: fontSize,
      fontWeight: 'bold',
    },
    modalScrollView: {
      maxHeight: Dimensions.get('window').height * 0.4,
    },
    modalFooter: {
      paddingTop: 10,
    },
  });

  const openModal = useCallback(() => {
    if (modalizeRef.current) {
      modalizeRef.current.open();
    }
  }, []);

  const closeModal = useCallback(() => {
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
  }, []);

  const handleModalOpen = useCallback(() => {
    onModalOpen?.(); // Solo notificar al padre, sin abrir el modal nuevamente
  }, [onModalOpen]);

  const handleModalClose = useCallback(() => {
    onModalClose?.(); // Solo notificar al padre, sin cerrar el modal nuevamente
  }, [onModalClose]);

  const handleValueChange = useCallback(
    (item: string) => {
      try {
        onValueChange(item);
        closeModal();
      } catch (error) {
        console.error('Error in onValueChange:', error);
      }
    },
    [onValueChange, closeModal]
  );

  if (Platform.OS === 'ios') {
    return (
      <View style={styles.container}>
        <Text style={GlobalStyles.subtitle}>
          {label}
          {required && <Text style={{ color: newColors.rojo }}>*</Text>}
        </Text>
        <TouchableOpacity style={styles.pickerContainer} onPress={openModal}>
          <Text style={styles.inputIOS}>
            {value || `Seleccione ${label.toLowerCase()}`}
          </Text>
        </TouchableOpacity>
        <Modalize
          ref={modalizeRef}
          modalStyle={{
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          withOverlay
          disableScrollIfPossible
          onOpen={handleModalOpen} // Usar función separada para notificar
          onClose={handleModalClose} // Usar función separada para notificar
        >
          <View style={styles.modalContent}>
            <ScrollView
              style={styles.modalScrollView}
              showsVerticalScrollIndicator={false}
            >
              {options.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.modalOption}
                  onPress={() => handleValueChange(item)}
                  accessibilityRole="button"
                  accessibilityLabel={item}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={closeModal}
                accessibilityRole="button"
                accessibilityLabel="Cancelar"
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={GlobalStyles.subtitle}>
        {label}
        {required && <Text style={{ color: newColors.rojo }}>*</Text>}
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor={newColors.verde}
        >
          <Picker.Item
            label={`Seleccione ${label.toLowerCase()}`}
            value=""
            style={styles.pickerItemDefault}
          />
          {options.map((option) => (
            <Picker.Item
              key={option}
              label={option}
              value={option}
              style={styles.pickerItemOption}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default CustomSelect;