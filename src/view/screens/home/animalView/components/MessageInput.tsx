import { TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';

interface MessageInputProps {
  value: string;
  onChangeText: (text: string) => void;
  editable: boolean;
}

const MessageInput = ({ value, onChangeText, editable }: MessageInputProps) => {
  return (
    <TextInput
      placeholder="Que consulta tienes?..."
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      placeholderTextColor={newColors.fondo_secundario}
      editable={editable}
    />
  );
};

const styles = StyleSheet.create({
  input:{
    height: 50,
    width: '80%',
    backgroundColor: newColors.fondo_principal,
    borderRadius: constants.borderRadius,
    fontFamily: constants.FontText,
    padding: 10,
    borderWidth: constants.borderWidth,
    borderColor: newColors.fondo_secundario,
    fontSize: 14,
  },
});

export default MessageInput;
