import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../../lib/context/ThemeContext";
import { getDynamicColors } from "../../assets/styles/colors";
import { createGlobalStyles } from "../../assets/styles/styles";

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
  miniText?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, options, onValueChange, miniText }) => {
  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const GlobalStyles = createGlobalStyles(isDarkTheme);
  const { width } = Dimensions.get("window");

  const fontSize = width * 0.04;

  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    label: {
      fontSize: fontSize,
      fontWeight: "500",
      color: colors.blanco,
      marginBottom: 5,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: colors.verdeLight,
      borderRadius: 8,
      overflow: "hidden",
      backgroundColor: colors.fondo,
    },
    picker: {
      height: 50,
      width: "100%",
    },
    pickerItemDefault: {
      color: colors.rowBgLight, // Color para el primer elemento
      fontSize: fontSize,
    },
    pickerItemOption: {
      color: colors.blanco, // Color para el resto de opciones
      fontSize: fontSize,
    },
  });

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
          dropdownIconColor={colors.blanco}
        >
          <Picker.Item
            label={`Seleccione ${label.toLowerCase()}`}
            value=""
            style={styles.pickerItemDefault} // Estilo para el primer elemento
          />
          {options.map((option) => (
            <Picker.Item
              key={option}
              label={option}
              value={option}
              style={styles.pickerItemOption} // Estilo para los demás elementos
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default CustomSelect;
