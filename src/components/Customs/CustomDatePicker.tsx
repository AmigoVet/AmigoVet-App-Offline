import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../../lib/context/ThemeContext";
import { getDynamicColors } from "../../assets/styles/colors";
import CustomIcon from "./CustomIcon";

interface CustomDatePickerProps {
  label: string;
  value: Date | null;
  onDateChange: (date: Date | null) => void;
  onAgeChange?: (age: string) => void;
  onBirthDateCalculated?: (birthDate: Date | null) => void;
  ageValue?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onDateChange,
  onAgeChange,
  onBirthDateCalculated,
  ageValue = "",
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showAgeInput, setShowAgeInput] = useState(false);

  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const styles = createStyles(colors);

  // Calcular texto de la edad según la fecha seleccionada
  const calculateAgeText = (birthDate: Date | null): string => {
    if (!birthDate) return "";
    const now = new Date();
    const diffMs = now.getTime() - birthDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 7) return `${diffDays} días`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses`;
    return `${Math.floor(diffDays / 365)} años`;
  };

  // Calcular fecha aproximada de nacimiento según la edad ingresada
  const approximateBirthDate = (): string => {
    if (!ageValue) return "";
    const now = new Date();
    const yearsAgo = parseInt(ageValue, 10);
    if (isNaN(yearsAgo)) return "";
    const approxDate = new Date();
    approxDate.setFullYear(now.getFullYear() - yearsAgo);
    return approxDate.toISOString().split("T")[0];
  };

  // Calcular la fecha de nacimiento solo si se ingresa una edad manualmente
  useEffect(() => {
    if (showAgeInput && onBirthDateCalculated && ageValue) {
      const yearsAgo = parseInt(ageValue, 10);
      if (!isNaN(yearsAgo)) {
        const now = new Date();
        const birthDate = new Date();
        birthDate.setFullYear(now.getFullYear() - yearsAgo);
        onBirthDateCalculated(birthDate);
      } else {
        onBirthDateCalculated(null);
      }
    }
  }, [ageValue, onBirthDateCalculated, showAgeInput]);

  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate && (!value || selectedDate.getTime() !== value.getTime())) {
      onDateChange(selectedDate);
    }
  };

  const handleSwitchMode = () => {
    setShowAgeInput((prev) => !prev);
    if (!showAgeInput) {
      onDateChange(null); // Limpiar la fecha al cambiar a modo de edad manual
    } else if (onAgeChange) {
      onAgeChange("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {showAgeInput ? "Ingresa la edad aproximada en años" : label}
      </Text>

      {!showAgeInput && (
        <>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.dateText}>
              {value ? value.toISOString().split("T")[0] : "Selecciona una fecha"}
            </Text>
            <CustomIcon name="calendar-outline" size={20} color={colors.naranja} />
          </TouchableOpacity>
          {value && (
            <Text style={styles.ageLabel}>{`Edad aproximada: ${calculateAgeText(value)}`}</Text>
          )}
          <TouchableOpacity style={styles.switchButton} onPress={handleSwitchMode}>
            <Text style={styles.switchText}>No sé la fecha exacta</Text>
          </TouchableOpacity>
        </>
      )}

      {showAgeInput && onAgeChange && (
        <>
          <TextInput
            style={styles.ageInput}
            placeholder="Ingresa la edad en años"
            placeholderTextColor={colors.rowBgLight}
            keyboardType="numeric"
            value={ageValue}
            onChangeText={(age) => {
              if (age !== ageValue) onAgeChange(age);
            }}
          />
          {ageValue && (
            <Text style={styles.ageLabel}>{`Fecha aproximada de nacimiento: ${approximateBirthDate()}`}</Text>
          )}
          <TouchableOpacity style={styles.switchButton} onPress={handleSwitchMode}>
            <Text style={styles.switchText}>Seleccionar fecha</Text>
          </TouchableOpacity>
        </>
      )}

      {showPicker && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            handleDateChange(selectedDate || null);
          }}
        />
      )}
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
    container: {
      marginVertical: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 5,
      color: colors.blanco,
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
    ageLabel: {
      marginTop: 5,
      fontSize: 14,
      color: colors.blanco,
    },
  });

export default CustomDatePicker;
