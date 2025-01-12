import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { CustomIcon } from '../Customs';
import { getDynamicColors } from '../../assets/styles/colors';
import { useTheme } from '../../lib/context/ThemeContext';

interface ButtonAddRegisterProps {
    onPress: () => void;
}

const ButtonAddRegister = ({onPress}: ButtonAddRegisterProps) => {

    const { isDarkTheme } = useTheme();
    const colors = getDynamicColors(isDarkTheme);
    const styles = dynamicStyles(colors);

    return (
        <Pressable style={styles.button} onPress={onPress}>
            <CustomIcon name="book-outline" size={30} color={colors.verdeLight} />
        </Pressable>
    )
}

const dynamicStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.verdeDark,
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