import React from 'react';
import { View } from 'react-native';
import LabelNameDark from '../../assets/svgs/Icon(Dark).svg';
import LabelNameLight from '../../assets/svgs/Icon(Light).svg';

interface LogoSimpleProps {
  width?: number;
  height?: number;
  estatico?: 'dark' | 'light';
}

const LogoSimple: React.FC<LogoSimpleProps> = ({ width = 100, height = 50, estatico }) => {
  // Determinar qué logo mostrar, predeterminado: oscuro
  const LogoComponent = estatico === 'light' ? LabelNameLight : LabelNameDark;

  return (
    <View>
      <LogoComponent width={width} height={height} />
    </View>
  );
};

export default LogoSimple;
