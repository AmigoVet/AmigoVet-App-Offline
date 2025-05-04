import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';

interface Props {
    name: any
    size: number
    color: string
}

const CustomIonicIcon = ({ name, size, color }: Props) => {
  return (
    <Icon name={name} size={size} color={color} />
  );
};

export default CustomIonicIcon;
