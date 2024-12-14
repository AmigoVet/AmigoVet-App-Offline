import { Image } from 'react-native';
import React from 'react';

interface LogoContainerProps {
    height?: number;
    width?: number;
}

const LogoContainer = ({ height = 200, width = 100 }: LogoContainerProps) => {
  return (
    <Image 
      source={require('../../assets/img/logoAmigoVet.png')} 
      style={{ 
        width: width, 
        height: height,
        alignSelf: 'center',
      }} 
      resizeMode="contain" 
    />
  );
};

export default LogoContainer;
