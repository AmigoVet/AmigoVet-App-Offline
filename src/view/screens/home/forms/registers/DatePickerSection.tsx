import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from '@react-native-vector-icons/ionicons';
import CustomButton from '../../../../components/customs/CustomButton';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';

interface DatePickerSectionProps {
  date: Date;
  onDateChange: (date: Date) => void;
  label: string;
}

const DatePickerSection: React.FC<DatePickerSectionProps> = ({ date, onDateChange, label }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const onConfirm = (selectedDate: Date) => {
    setPickerVisible(false);
    onDateChange(selectedDate);
  };

  const onCancel = () => {
    setPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      {date && (
        <View style={styles.dataContainer}>
          <Text style={styles.text}>
            <Icon name="calendar-outline" size={20} color={newColors.fondo_secundario} />
            {' Fecha: '}
            <Text style={styles.textDate}>
              {date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </Text>
          <Text style={styles.text}>
            <Icon name="time-outline" size={20} color={newColors.fondo_secundario} />
            {' Hora: '}
            <Text style={styles.textDate}>
              {date.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Text>
        </View>
      )}
      <CustomButton
        text={`Seleccionar ${label}`}
        icon="calendar-outline"
        onPress={() => setPickerVisible(true)}
        width="100%"
        backgroundColor={newColors.verde_light}
        textColor="white"
      />
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="datetime"
        date={date}
        onConfirm={onConfirm}
        onCancel={onCancel}
        locale="es-ES"
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: constants.borderWidth,
    borderColor: newColors.fondo_secundario,
    borderRadius: constants.borderRadius / 1.5,
    padding: 10,
    alignItems: 'center',
  },
  dataContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '75%',
    marginBottom: 10,
  },
  textDate: {
    color: newColors.fondo_secundario,
    fontSize: 14,
    fontFamily: constants.FontText,
    fontWeight: '500',
  },
  text: {
    color: newColors.fondo_secundario,
    fontSize: 16,
    fontFamily: constants.FontText,
    fontWeight: 'bold',
  },
});

export default DatePickerSection;