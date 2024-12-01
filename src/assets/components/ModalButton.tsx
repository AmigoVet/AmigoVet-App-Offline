import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../styles';

interface ModalButtonProps {
    text: string;
    actualData: string;
    onPress: () => void;
}

const ModalButton = ({ text, onPress, actualData }: ModalButtonProps) => {



  return (
    <TouchableOpacity style={styles.modalOption} onPress={() => onPress()}>
        <Text style={styles.modalOptionText}>{text}({actualData})</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    modalOption: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 8,
        width: '70%',
        backgroundColor: colors.naranja,
        borderRadius: 8,
      },
      modalOptionText: {
        fontSize: 16,
        color: colors.blancoLight,
        textAlign: 'center',
      },
})


export default ModalButton