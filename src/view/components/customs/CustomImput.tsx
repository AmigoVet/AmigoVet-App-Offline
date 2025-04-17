import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions, Pressable, Dimensions } from 'react-native';
import { newColors } from '../../styles/colors';
import { constants } from '../../styles/constants';
import Icon from '@react-native-vector-icons/ionicons';
import CustomIonicIcon from './CustomIonicIcon';

const { width } = Dimensions.get('window');

interface CustomInputProps {
  label?: string;
  miniText?: string;
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  type?: 'text' | 'password' | 'number';
  multiline?: boolean;
  editable?: boolean;
  onFocus?: () => void;
  password?: boolean;
  iconName?: string; // Nueva prop para el ícono personalizado
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
  iconName, // Añadimos la prop al destructuring
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
      <Text style={styles.label}>
        {label}
        <Text style={styles.miniText}>{miniText ? ` (${miniText})` : ''}</Text>
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
  label: {
    fontSize: width * 0.04,
    fontWeight: '500',
    marginBottom: 5,
    color: newColors.fondo_secundario,
  },
  miniText: {
    fontSize: width * 0.03,
    color: newColors.fondo_secundario,
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
    fontSize: width * 0.042,
    fontWeight: 'bold',
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