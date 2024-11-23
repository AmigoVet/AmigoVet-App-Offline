import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../assets/components/CustomButton';
import { GlobalStyles } from '../assets/styles/styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import FromDevora from '../assets/components/FromDevora';
import Register from './auth/Register';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;   
  Register: undefined;
  Home: undefined;
};

const Welcome = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const login = () => {
    navigate('Login'); 
  };

  return (
    <View style={[GlobalStyles.container, { alignItems: 'flex-start', justifyContent: 'center' }]}>
      <Text style={[GlobalStyles.title, { fontSize: 30 }]}>Welcome to</Text>
      <Text style={[GlobalStyles.subTitle, { fontSize: 70 }]}>Animalia</Text>
      <CustomButton onPress={login} text="Ingresa Ahora" />
      <FromDevora />
    </View>
  );
};

export default Welcome;
