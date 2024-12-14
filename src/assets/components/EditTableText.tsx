import React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  StyleSheet,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from '../context/ThemeContext'; 
import { getDynamicColors } from '../styles/colors'; 
import { createGlobalStyles } from '../styles/styles'; 

interface EditTableTextProps {
  placeholder: string;
  value: string;
  label?: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'password' | 'number';
  editable?: boolean;
  style?: StyleProp<TextStyle>;
}

const EditTableText = ({
  placeholder,
  value,
  onChangeText,
  type,
  editable = true,
  style,
  label,
}: EditTableTextProps) => {
  const getKeyboardType = (): KeyboardTypeOptions => {
    switch (type) {
      case 'number':
        return 'numeric';
      case 'password':
        return 'default'; 
      case 'text':
      default:
        return 'default'; 
    }
  };

  const { isDarkTheme } = useTheme(); 
  const colors = getDynamicColors(isDarkTheme); 
  const globalStyles = createGlobalStyles(isDarkTheme); 
  const styles = createStyles(colors);

  return (
    <>
      {label && (
        <Text style={[globalStyles.label, { marginBottom: 5 }]}>
          {label}:
        </Text>
      )}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.rowBgLight} 
        keyboardType={getKeyboardType()}
        style={[styles.dataCell, style]} 
        editable={editable}
      />
    </>
  );
};

const createStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
    dataCell: {
      flex: 1,
      padding: 10,
      textAlign: 'center',
      color: colors.blanco, 
      backgroundColor: colors.fondo,
      borderWidth: 1,
      borderColor: colors.naranja, 
      borderRadius: 5,
    },
  });

export default EditTableText;
