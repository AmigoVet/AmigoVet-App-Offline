import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/view/navigator/AppNavigator';

const AmigoVet = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default AmigoVet;