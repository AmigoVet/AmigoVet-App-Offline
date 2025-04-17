import React, { JSX } from 'react';
import { Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { newColors } from '../../styles/colors';
import { constants } from '../../styles/constants';

interface CustomButtonProps {
  text: string | JSX.Element;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  backgroundColor?: string;
  textColor?: string;      
}

const CustomButton = ({
  text,
  onPress,
  disabled = false,
  loading = false,
  backgroundColor = newColors.verde_light,
  textColor = 'white',                    
}: CustomButtonProps) => {
  const buttonBackgroundColor = disabled ? newColors.gris : backgroundColor;

  const pressedStyle = disabled ? null : styles.pressedContainer;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: buttonBackgroundColor },
        pressed && pressedStyle,
      ]}
      onPress={() => {
        if (!disabled && !loading) onPress();
      }}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={newColors.fondo_secundario} />
      ) : (
        <Text style={[styles.text, { color: disabled ? newColors.fondo_principal : textColor }]}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '80%',
    borderRadius: constants.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedContainer: {
    backgroundColor: newColors.verde, 
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 2,
    fontFamily: 'Chillax-SemiBold',
  },
});

export default CustomButton;