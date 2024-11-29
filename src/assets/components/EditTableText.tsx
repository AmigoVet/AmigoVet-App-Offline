import { View, Text, TextInput, KeyboardTypeOptions, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../styles';

interface EditTableTextProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'password' | 'number';
}

const EditTableText = ({placeholder, value, onChangeText, type}: EditTableTextProps) => {
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
    <TextInput 
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
        keyboardType={getKeyboardType()}
        style={styles.dataCell}
    />
  )
}

const styles = StyleSheet.create({
    dataCell: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
        color: colors.blanco
      },
})

export default EditTableText