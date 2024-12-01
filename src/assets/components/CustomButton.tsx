import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { colors } from '../styles/colors';

interface CustomButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  red?: boolean;
}

const CustomButton = ({ text, onPress, disabled = false, red = false }: CustomButtonProps) => {
  const backgroundColor = disabled
    ? colors.blanco 
    : red
    ? colors.rojo
    : colors.naranja;

  const pressedStyle = disabled ? null : styles.pressedContainer;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor },
        pressed && pressedStyle,
      ]}
      onPress={() => {
        if (!disabled) onPress();
      }}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  pressedContainer: {
    backgroundColor: colors.naranjaDark,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledText: {
    color: colors.fondo, 
  },
});

export default CustomButton;
