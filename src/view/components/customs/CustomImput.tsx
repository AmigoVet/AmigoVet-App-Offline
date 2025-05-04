import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions, Pressable } from 'react-native';
import { newColors } from '../../styles/colors';
import { constants } from '../../styles/constants';
import CustomIonicIcon from './CustomIonicIcon';
import { GlobalStyles } from '../../styles/GlobalStyles';


interface CustomInputProps {
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  type?: 'text' | 'password' | 'number';
  multiline?: boolean;
  editable?: boolean;
  onFocus?: () => void;
  password?: boolean;
  iconName?: string; // Nueva prop para el ícono personalizado
  required?: boolean;
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
  password = false,
  iconName, // Añadimos la prop al destructuring
  required = false,
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
      {label &&
      <Text style={GlobalStyles.subtitle}>
        {label}
        {required && <Text style={{color: newColors.rojo}}>*</Text>}
      </Text>
      }
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={newColors.fondo_secundario}
          secureTextEntry={password && !isPasswordVisible}
          multiline={multiline}
          keyboardType={getKeyboardType()}
          editable={editable}
          onFocus={onFocus}
          autoCapitalize="none"
          autoCorrect={false}
          textAlignVertical="center"

        />
        {/* Renderizado condicional del ícono */}
        {password || iconName ? (
          <Pressable
            onPress={password ? togglePasswordVisibility : undefined}
            style={styles.icon}
          >
            <CustomIonicIcon
              name={
                password
                  ? isPasswordVisible
                    ? 'eye-outline'
                    : 'eye-off-outline'
                  : iconName || 'alert-circle-outline'
              }
              size={20}
              color={newColors.fondo_secundario}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

// Estilos dinámicos
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: newColors.fondo_secundario,
    borderWidth: 2,
    borderRadius: constants.borderRadius / 1.5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    minHeight: 50,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: constants.FontText,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  icon: {
    marginLeft: 10,
  },
});

export default CustomInput;
