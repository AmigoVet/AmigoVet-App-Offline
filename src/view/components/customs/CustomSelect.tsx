import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { newColors } from '../../styles/colors';
import { constants } from '../../styles/constants';
import { GlobalStyles } from '../../styles/GlobalStyles';

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onOpenModal: (options: string[]) => void;
  required?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  options,
  onOpenModal,
  required = false,
}) => {
  const { width } = Dimensions.get('window');
  const fontSize = width * 0.04;

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
    pickerItem: {
      fontSize,
      color: newColors.fondo_principal,
      textAlign: 'center',
    },
    inputIOS: {
      fontSize,
      color: newColors.fondo_secundario,
      padding: 10,
    },
  });

  if (Platform.OS === 'ios') {
    return (
      <View style={styles.container}>
        <Text style={GlobalStyles.subtitle}>
          {label}
          {required && <Text style={{ color: newColors.rojo }}>*</Text>}
        </Text>
        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={() => onOpenModal(options)}
        >
          <Text style={styles.inputIOS}>
            {value || `Seleccione ${label.toLowerCase()}`}
          </Text>
        </TouchableOpacity>
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
          onValueChange={(itemValue) => onOpenModal([itemValue])}
          style={styles.picker}
          dropdownIconColor={newColors.verde}
        >
          <Picker.Item
            label={`Seleccione ${label.toLowerCase()}`}
            value=""
            style={styles.pickerItem}
          />
          {options.map((option) => (
            <Picker.Item
              key={option}
              label={option}
              value={option}
              style={styles.pickerItem}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default CustomSelect;