import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

interface CustomInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
        secureTextEntry={secureTextEntry}
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
    color: colors.blancoLight
  },
});

export default CustomInput;
