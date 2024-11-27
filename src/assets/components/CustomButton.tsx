import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { colors } from '../styles/colors';

interface CustomButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

const CustomButton = ({ text, onPress, disabled }: CustomButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.naranja,
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
});

export default CustomButton;
