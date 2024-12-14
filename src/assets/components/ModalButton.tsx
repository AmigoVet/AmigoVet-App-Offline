import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { staticColors } from '../styles/colors';

interface ModalButtonProps {
    text: string;
    actualData?: string;
    onPress: () => void;
    red?: boolean;
}

const ModalButton = ({ text, onPress, actualData, red }: ModalButtonProps) => {

  const styles = StyleSheet.create({
    modalOption: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 8,
        width: '70%',
        backgroundColor: red ? staticColors.rojo : staticColors.naranja,
        borderRadius: 8,
      },
      modalOptionText: {
        fontSize: 16,
        color: staticColors.blancoLight,
        textAlign: 'center',
      },
})

  return (
    <TouchableOpacity style={styles.modalOption} onPress={() => onPress()}>
        <Text style={styles.modalOptionText}>{text}{actualData ? `: ${actualData}` : ''}</Text>
    </TouchableOpacity>
  )
}




export default ModalButton