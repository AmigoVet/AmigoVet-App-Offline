import React from 'react';
import { Pressable, Text, StyleProp, ViewStyle } from 'react-native';
import { constants } from '../styles/constants';
import { newColors } from '../styles/colors';
import Icon from '@react-native-vector-icons/ionicons';

interface ButtonIconProps {
  icon: any;
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  color?: string;
  disabled?: boolean;
}

const MiniButton: React.FC<ButtonIconProps> = ({
  icon,
  text,
  onPress,
  backgroundColor = newColors.verde_light,
  color = newColors.fondo_secundario,
  disabled = false,
}) => {
  const buttonStyle: StyleProp<ViewStyle> = {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: constants.borderRadius / 3,
    backgroundColor: disabled ? newColors.gris : backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 'auto',
  };

  return (
    <Pressable onPress={onPress} disabled={disabled} style={buttonStyle}>
      <Icon name={icon} size={20} color={color} />
      <Text
        style={{
          color,
          fontFamily: constants.FontText,
          fontWeight: 'bold',
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default MiniButton;
