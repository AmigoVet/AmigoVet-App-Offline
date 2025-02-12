import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { constants } from '../../../../../assets/styles/constants'
import { newColors } from '../../../../../assets/styles/colors'

interface MessageInputProps {
  value: string;
  onChangeText: (text: string) => void;
  editable: boolean;
}

const MessageInput = ({ value, onChangeText, editable }: MessageInputProps) => {
  return (
    <TextInput 
      placeholder="Que consulta tienes?..."
      multiline
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      placeholderTextColor={newColors.fondo_secundario}
      editable={editable}
    />
  )
}

const styles = StyleSheet.create({
  input:{
    height: 50,
    width: '80%',
    backgroundColor: newColors.fondo_principal,
    borderRadius: constants.borderRadius,
    padding: 10,
    borderWidth: 1,
    borderColor: newColors.verde,
  }
})

export default MessageInput