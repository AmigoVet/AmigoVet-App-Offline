import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { newColors } from '../../styles/colors';
import { constants } from '../../styles/constants';
import Icon from '@react-native-vector-icons/ionicons';

interface CustomButtonProps {
  text: string;
  icon?: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  backgroundColor?: string;
  textColor?: string;
  width?: string | number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  icon,
  onPress,
  disabled = false,
  loading = false,
  backgroundColor = newColors.verde_light,
  textColor = 'white',
  width = '80%',
}) => {
  const buttonBackgroundColor = disabled ? newColors.verde : backgroundColor;
  const contentColor = disabled ? newColors.fondo_principal : textColor;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: buttonBackgroundColor, width },
        pressed && !disabled && !loading && styles.pressedContainer,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={text}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color={newColors.fondo_secundario} />
        ) : (
          <>
            {icon && <Icon name={icon} size={20} color={contentColor} style={styles.icon} />}
            <Text style={[styles.text, { color: contentColor }]}>{text}</Text>
          </>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: constants.borderRadius / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedContainer: {
    backgroundColor: newColors.verde,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 2,
    fontFamily: 'Chillax-SemiBold',
  },
});

export default CustomButton;
