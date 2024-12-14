import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions, Pressable, Dimensions } from 'react-native';
import { getDynamicColors } from '../styles/colors';
import { useTheme } from '../context/ThemeContext';
import CustomIcon from './CustomIcon';

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

  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme); // Obtén los colores dinámicos
  const styles = createStyles(colors); // Genera estilos dinámicos

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
        <Text style={styles.miniText}>{miniText ? ` (${miniText})` : ''}</Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.naranja}
          secureTextEntry={password && !isPasswordVisible}
          multiline={multiline}
          keyboardType={getKeyboardType()}
          editable={editable}
          onFocus={onFocus}
          autoCapitalize="none"
          autoCorrect={false}
          textAlignVertical="center"
        />
        {password && (
          <Pressable onPress={togglePasswordVisibility} style={styles.icon}>
            <CustomIcon
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

// Estilos dinámicos
const createStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
    container: {
      marginVertical: 10,
      width: '100%',
    },
    label: {
      fontSize: width * 0.04,
      fontWeight: '500',
      marginBottom: 5,
      color: colors.naranja,
    },
    miniText: {
      fontSize: width * 0.03,
      color: colors.rowBgLight,
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
      minHeight: 40,
      fontSize: width * 0.04,
      color: colors.blancoLight,
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
