import { View, Text, TextInput, KeyboardTypeOptions, StyleSheet, TextStyle, StyleProp } from 'react-native'
import React from 'react'
import { colors } from '../styles';

interface EditTableTextProps {
  placeholder: string;
  value: string;
  label?: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'password' | 'number';
  editable?: boolean;
  style?: StyleProp<TextStyle>;
}

const EditTableText = ({placeholder, value, onChangeText, type, editable = true, style, label}: EditTableTextProps) => {
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
    <>
    {label && <Text>
      {label}: 
    </Text>}
    <TextInput 
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
        keyboardType={getKeyboardType()}
        style={[styles.dataCell, style]}
        editable={editable}
    />
    </>
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