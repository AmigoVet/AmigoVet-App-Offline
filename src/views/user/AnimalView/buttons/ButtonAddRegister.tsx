import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../../../../lib/context/ThemeContext';
import { getDynamicColors, newColors } from '../../../../assets/styles/colors';
import { CustomIcon } from '../../../../components/Customs';
import { Animal } from '../../../../lib/interfaces/animal';

interface ButtonAddRegisterProps {
    animal: Animal;
    onPress: () => void;
}

const ButtonAddRegister = ({onPress, animal}: ButtonAddRegisterProps) => {

    const styles = dynamicStyles();

    return (
        <Pressable style={styles.button} onPress={onPress}>
            <CustomIcon name="book-outline" size={30} color={newColors.fondo_principal} />
        </Pressable>
    )
}

const dynamicStyles = () =>
  StyleSheet.create({
    button: {
      backgroundColor: newColors.verde,
      position: 'absolute',
      zIndex: 10,
      bottom: 80,
      right: 20,
      borderRadius: 50,
      padding: 10,
      height: 50,
      width: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default ButtonAddRegister