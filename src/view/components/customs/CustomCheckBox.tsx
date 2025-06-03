import { View, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import { newColors } from '../../styles/colors';

interface CustomCheckBoxProps {
  isChecked?: boolean;
  onPress?: () => void;
}

const CustomCheckBox = ({ isChecked, onPress }: CustomCheckBoxProps) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.checkbox}>
        <AnimatedCheckbox
          checked={isChecked}
          highlightColor={newColors.verde_light}
          checkmarkColor={newColors.fondo_principal}
          boxOutlineColor={newColors.verde_light}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      checkbox: {
        width: 32,
        height: 32,
      },
});

export default CustomCheckBox;
