import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { act } from 'react'
import { newColors, staticColors } from '../../assets/styles/colors';
import { constants } from '../../assets/styles/constants';

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
        backgroundColor: red ? staticColors.rojo : newColors.verde_light,
        borderRadius: constants.borderRadius / 2,
      },
      modalOptionText: {
        fontSize: 16,
        color: staticColors.blancoLight,
        textAlign: 'center',
      },
  })

  if (text === 'Editar Descripción'){ actualData = '' }

  return (
    <TouchableOpacity style={styles.modalOption} onPress={() => onPress()}>
        <Text style={styles.modalOptionText}>{text}{actualData ? `: ${actualData}` : ''}</Text>
    </TouchableOpacity>
  )
}




export default ModalButton