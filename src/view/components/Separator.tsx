import {  View} from 'react-native';
import React from 'react';

interface SeparatorProps {
  height?: number
  width?: number
  bg? : string
}

const Separator = ({ height = 100, width = 100, bg }: SeparatorProps) => {
  return (
    <View  style={{height: height, width: width, backgroundColor: bg}} />
  );
};


export default Separator;
