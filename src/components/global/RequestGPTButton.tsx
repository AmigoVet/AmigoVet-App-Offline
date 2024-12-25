import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { getDynamicColors } from '../../assets/styles/colors';
import { useTheme } from '../../lib/context/ThemeContext';
import { CustomIcon } from '../Customs';

interface props {
    onPress: () => void;
}

const RequestGPTButton = ({ onPress }: props) => {
    const { isDarkTheme } = useTheme();
    const colors = getDynamicColors(isDarkTheme);
    const styles = dymanycStyles(colors);
  return (
    <Pressable style={styles.button} onPress={() => onPress()}>
        <CustomIcon name="star-half-outline" size={30} color={colors.verdeLight} />
    </Pressable>
  )
}

const dymanycStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({ 
    button:{
        backgroundColor: colors.verdeDark,
        position: 'absolute',
        zIndex: 10,
        bottom: 20,
        right: 20,
        borderRadius: 50,
        padding: 10,
        height: 50,
        width: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
  });

export default RequestGPTButton