import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { staticColors } from '../styles/colors';

interface CustomButtonProps {
  text: string | JSX.Element;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean; 
  red?: boolean;
}

const CustomButton = ({ text, onPress, disabled = false, loading = false, red = false }: CustomButtonProps) => {
  const backgroundColor = disabled
    ? staticColors.blanco
    : red
    ? staticColors.rojo
    : staticColors.naranja;

  const pressedStyle = disabled ? null : styles.pressedContainer;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor },
        pressed && pressedStyle,
      ]}
      onPress={() => {
        if (!disabled && !loading) onPress();
      }}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={staticColors.negroDark} /> 
      ) : (
        <Text style={[styles.text, (disabled || loading) && styles.disabledText]}>{text}</Text>
      )}
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
    backgroundColor: staticColors.naranjaDark,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledText: {
    color: staticColors.negro,
  },
});

export default CustomButton;
