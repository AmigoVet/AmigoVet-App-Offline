import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { newColors } from '../../styles/colors';
import { constants } from '../../styles/constants';
import Icon from '@react-native-vector-icons/ionicons';

interface CustomDatePickerProps {
  label: string;
  value: Date | null;
  onDateChange: (date: Date | null) => void;
  allowFutureDates?: boolean; // Nueva prop para permitir fechas futuras
  allowPastDates?: boolean; // Nueva prop para permitir fechas pasadas
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onDateChange,
  allowFutureDates = true,
  allowPastDates = true,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [inputText, setInputText] = useState<string>(
    value
      ? value.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
      : ''
  );

  const parseDate = (text: string): Date | null => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(text)) return null;

    const [day, month, year] = text.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    if (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    ) {
      const now = new Date();
      if (!allowFutureDates && date > now) return null;
      if (!allowPastDates && date < now) return null;
      return date;
    }
    return null;
  };

  const handleInputChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9/]/g, '');
    let formattedText = cleanedText;

    // Autoformatear mientras se escribe
    if (cleanedText.length === 2 || cleanedText.length === 5) {
      formattedText = `${cleanedText}/`;
    }
    if (cleanedText.length > 2 && cleanedText[2] !== '/') {
      formattedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`;
    }
    if (cleanedText.length > 5 && cleanedText[5] !== '/') {
      formattedText = `${cleanedText.slice(0, 5)}/${cleanedText.slice(5)}`;
    }
    if (formattedText.length > 10) {
      formattedText = formattedText.slice(0, 10);
    }

    setInputText(formattedText);

    const parsedDate = parseDate(formattedText);
    onDateChange(parsedDate);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false); // Cerrar el picker después de seleccionar o cancelar
    if (selectedDate) {
      const formattedText = selectedDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      setInputText(formattedText);
      onDateChange(selectedDate);
    } else if (event.type === 'dismissed' || !selectedDate) {
      // Mantener el valor actual si se cancela
      setInputText(
        value
          ? value.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
          : ''
      );
      onDateChange(value);
    }
  };

  const openPicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.dateInput}
          value={inputText}
          onChangeText={handleInputChange}
          placeholder="dd/mm/aaaa"
          placeholderTextColor={newColors.gris}
          keyboardType="numeric"
          maxLength={10}
        />
        <TouchableOpacity style={styles.iconButton} onPress={openPicker}>
          <Icon name="calendar-outline" size={20} color={newColors.fondo_secundario} />
        </TouchableOpacity>
      </View>
      {showPicker && (
        <Modal transparent animationType="fade" visible={showPicker}>
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                textColor={newColors.fondo_secundario}
                value={value ?? new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                maximumDate={allowFutureDates ? undefined : new Date()}
                minimumDate={allowPastDates ? undefined : new Date()}
                onChange={handleDateChange}
              />
              {Platform.OS === 'ios' && (
                <TouchableOpacity style={styles.closeButton} onPress={() => setShowPicker(false)}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: newColors.fondo_secundario,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: newColors.fondo_secundario,
    borderWidth: 2,
    borderRadius: constants.borderRadius / 2,
    paddingHorizontal: 10,
  },
  dateInput: {
    flex: 1,
    paddingVertical: 10,
    color: newColors.fondo_secundario,
    fontWeight: '500',
  },
  iconButton: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: constants.borderRadius
  },
  pickerContainer: {
    backgroundColor: newColors.fondo_principal,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: newColors.fondo_secundario,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomDatePicker;