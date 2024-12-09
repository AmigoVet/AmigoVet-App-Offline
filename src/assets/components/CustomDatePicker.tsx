import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../styles/colors";

interface CustomDatePickerProps {
  label: string;
  value: Date | null;
  onDateChange: (date: Date) => void;
  onAgeChange?: (age: string) => void;
  ageValue?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onDateChange,
  onAgeChange,
  ageValue = "",
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showAgeInput, setShowAgeInput] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {!showAgeInput && (
        <>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.dateText}>
              {value ? value.toISOString().split("T")[0] : "Selecciona una fecha"}
            </Text>
            <Ionicons name="calendar-outline" size={20} color={colors.naranja} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setShowAgeInput(true)}
          >
            <Text style={styles.switchText}>No sé la fecha exacta</Text>
          </TouchableOpacity>
        </>
      )}

      {showAgeInput && onAgeChange && (
        <View>
          <TextInput
            style={styles.ageInput}
            placeholder="Ingresa la edad en años"
            keyboardType="numeric"
            value={ageValue}
            onChangeText={onAgeChange}
          />
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setShowAgeInput(false)}
          >
            <Text style={styles.switchText}>Seleccionar fecha</Text>
          </TouchableOpacity>
        </View>
      )}

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()} // Bloquear fechas futuras
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              onDateChange(selectedDate);
            }
          }}
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
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: colors.naranja,
  },
  datePickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: colors.naranja,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: colors.fondo,
  },
  dateText: {
    color: colors.blanco,
  },
  switchButton: {
    marginTop: 10,
  },
  switchText: {
    color: colors.naranja,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  ageInput: {
    borderColor: colors.naranja,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: colors.blancoLight,
    backgroundColor: colors.fondo,
  },
});

export default CustomDatePicker;
