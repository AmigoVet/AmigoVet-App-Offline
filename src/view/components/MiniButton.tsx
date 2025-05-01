import { Text, Pressable } from 'react-native'
import React from 'react'
import Icon from '@react-native-vector-icons/ionicons';
import { constants } from '../styles/constants';
import { newColors } from '../styles/colors';

interface ButtonIconProps {
  icon: any;
  text: string
  onPress: () => void;
  bg?: string;
  color?: string;
  disabled?: boolean;
}
const MiniButton = ({icon, onPress, text, bg = newColors.verde_light, color = newColors.fondo_secundario}: ButtonIconProps, disable = false) => {
  return (
    <Pressable 
      onPress={onPress} 
      disabled={disable}
      style={{ 
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: constants.borderRadius / 3,
        backgroundColor: disable ? newColors.verde : bg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 'auto',
    }}>
      <Icon name={icon} size={20} color={color} />
      <Text style={{
        color: color,
        fontFamily: constants.FontText,
        fontWeight: 'bold',
      }}>{text}</Text>
    </Pressable>
  )
}

export default MiniButton