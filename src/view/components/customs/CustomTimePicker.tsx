import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { newColors } from '../../styles/colors';

interface CustomTimePickerProps {
  label: string;
  value: string | null;
  onChange: (time: string | null) => void;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({ label, value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(
    value ? new Date(`1970-01-01T${value}:00`) : null
  );

  const handleTimeChange = (event: any, newTime?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (newTime) {
      const hours = newTime.getHours().toString().padStart(2, '0');
      const minutes = newTime.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      setSelectedTime(newTime);
      onChange(timeString);
    } else {
      onChange(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
        <Text style={styles.inputText}>
          {value || 'Selecciona una hora'}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: newColors.fondo_secundario,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: newColors.gris_light,
    borderRadius: 5,
    padding: 10,
  },
  inputText: {
    fontSize: 16,
    color: newColors.fondo_secundario,
  },
});

export default CustomTimePicker;