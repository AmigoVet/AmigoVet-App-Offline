import {  View} from 'react-native';
import React from 'react';

interface SeparatorProps {
  height?: number
  bg? : string
}

const Separator = ({ height, bg }: SeparatorProps) => {
  return (
    <View  style={{height: height, width: '100%', backgroundColor: bg}} />
  );
};


export default Separator;
