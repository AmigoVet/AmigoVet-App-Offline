import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions, Pressable, Dimensions } from 'react-native';
import { colors } from '../styles/colors';
import { GlobalStyles } from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface CustomInputProps {
  label: string;
  miniText?: string;
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  type?: 'text' | 'password' | 'number';
  multiline?: boolean;
  editable?: boolean;
  onFocus?: () => void;
  password?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  type = 'text',
  multiline = false,
  editable = true,
  onFocus = () => {},
  miniText,
  password = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!password);

  const getKeyboardType = (): KeyboardTypeOptions => {
    switch (type) {
      case 'number':
        return 'numeric';
      case 'text':
      default:
        return 'default';
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        <Text style={GlobalStyles.miniText}>{miniText ? ` (${miniText})` : ''}</Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#888"
          secureTextEntry={password && !isPasswordVisible}
          multiline={multiline}
          keyboardType={getKeyboardType()}
          editable={editable}
          onFocus={onFocus}
          autoCapitalize="none"
          autoCorrect={false}
          textAlignVertical="center" // Asegura alineación del texto
        />
        {password && (
          <Pressable onPress={togglePasswordVisibility} style={styles.icon}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.blancoLight}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    fontSize: width * 0.04, // Escala dinámica
    fontWeight: '500',
    marginBottom: 5,
    color: colors.naranja,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.naranja,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.fondo,
  },
  input: {
    flex: 1,
    minHeight: 40, // Usa minHeight en lugar de height
    fontSize: width * 0.04, // Tamaño dinámico del texto
    color: colors.blancoLight,
  },
  multilineInput: {
    minHeight: 100, // Asegura altura mínima
    textAlignVertical: 'top',
  },
  icon: {
    marginLeft: 10,
  },
});

export default CustomInput;
