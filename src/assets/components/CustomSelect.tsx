import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors, GlobalStyles } from "../styles";

const { width } = Dimensions.get("window");

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
  miniText?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, options, onValueChange, miniText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        <Text style={GlobalStyles.miniText}>{miniText ? ` (${miniText})` : ""}</Text>
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor={colors.blanco} // Cambia el color del ícono desplegable
        >
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
    fontSize: width * 0.04, // Escala dinámica
    fontWeight: "500",
    color: colors.naranja,
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
    fontSize: width * 0.04, // Ajuste dinámico del texto
    color: colors.blanco,
  },
});

export default CustomSelect;
