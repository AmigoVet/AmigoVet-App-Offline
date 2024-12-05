import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { colors } from '../styles/colors';

interface CustomInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  type?: 'text' | 'password' | 'number';
  secureTextEntry?: boolean;
  multiline?: boolean;
  editable?: boolean;
  onFocus?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry, 
  type = 'text', 
  multiline = false ,
  editable = true,
  onFocus = () => {},
}) => {
  const getKeyboardType = (): KeyboardTypeOptions => {
    switch (type) {
      case 'number':
        return 'numeric'; // Teclado numérico
      case 'password':
        return 'default'; // `secureTextEntry`
      case 'text':
      default:
        return 'default'; // Teclado general
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input, 
          multiline && styles.multilineInput 
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        keyboardType={getKeyboardType()}
        editable={editable}
        onFocus={onFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: colors.naranja,
  },
  input: {
    height: 40,
    borderColor: colors.naranja,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    color: colors.blancoLight,
  },
  multilineInput: {
    height: 100, 
    textAlignVertical: 'top', 
  },
});

export default CustomInput;
