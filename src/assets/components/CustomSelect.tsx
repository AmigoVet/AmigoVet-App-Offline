import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Importa el Picker correctamente
import { colors } from "../styles";

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, options, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={value} onValueChange={onValueChange} style={styles.picker}>
          <Picker.Item label={`Seleccione ${label.toLowerCase()}`} value="" />
          {options.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.blancoLight,
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.naranja,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.fondo,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default CustomSelect;
