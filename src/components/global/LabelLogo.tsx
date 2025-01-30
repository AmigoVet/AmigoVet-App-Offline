import React from 'react';
import { View } from 'react-native';
import LabelNameDark from '../../assets/svgs/LabelName(Dark).svg';
import LabelNameLight from '../../assets/svgs/LabelName(Light).svg';
import { useTheme } from '../../lib/context/ThemeContext';

interface LabelLogoProps {
  width?: number;
  height?: number;
  estatico?: 'dark' | 'light';
}

const LabelLogo: React.FC<LabelLogoProps> = ({ width = 100, height = 50, estatico }) => {
  const { isDarkTheme } = useTheme();

  // Determinar qué logo mostrar
  const LogoComponent = estatico
    ? estatico === 'dark'
      ? LabelNameLight
      : LabelNameLight
    : isDarkTheme
    ? LabelNameLight
    : LabelNameLight;

  return (
    <View>
      <LogoComponent width={width} height={height} />
    </View>
  );
};

export default LabelLogo;
