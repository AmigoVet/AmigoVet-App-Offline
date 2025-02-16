import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../../lib/context/ThemeContext";
import { getDynamicColors, newColors } from "../../assets/styles/colors";
import { createGlobalStyles } from "../../assets/styles/styles";
import { constants } from "../../assets/styles/constants";

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
  const GlobalStyles = createGlobalStyles();
  const { width } = Dimensions.get("window");

  const fontSize = width * 0.04;

  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    label: {
      fontSize: fontSize,
      fontWeight: "500",
      color: newColors.fondo_secundario,
      marginBottom: 5,
    },
    pickerContainer: {
      borderWidth: 2,
      borderColor: newColors.fondo_secundario,
      borderRadius: constants.borderRadius / 2,
      overflow: "hidden",
      zIndex: 9999,
      elevation: 1000,
    },
    picker: {
      height: 50,
      width: "100%",
      color: newColors.fondo_secundario,
    },
    pickerItemDefault: {
      color: newColors.fondo_principal,
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    pickerItemOption: {
      color: newColors.fondo_principal, 
      fontSize: fontSize,
      textAlign: "center",
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
