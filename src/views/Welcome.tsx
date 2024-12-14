import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTheme } from '../lib/context/ThemeContext';
import { createGlobalStyles } from '../assets/styles/styles';
import { CustomButton } from '../components/Customs';
import { FromDevora } from '../components/global';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;   
  Register: undefined;
  Home: undefined;
  AnimalView: {id: string};

  Busqueda: undefined;
  ChangePassword: undefined;
  AnimalesEmbarazados: undefined;
  AnimalesHembras: undefined;
  AnimalesMachos: undefined;
  AnimalesJovenes: undefined;
};



const Welcome = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const login = () => {
    navigate('Login'); 
  };

  const { width, height } = Dimensions.get('window');

  const {isDarkTheme} = useTheme();
  const GlobalStyles = createGlobalStyles(isDarkTheme);

  return (
    <View style={[GlobalStyles.container, { alignItems: 'flex-start', justifyContent: 'center' }]}>
      <Text style={[GlobalStyles.title, { fontSize: width*0.08 }]}>Welcome to</Text>
      <Text style={[GlobalStyles.subTitle, { fontSize: width*0.2 }]}>AmigoVet</Text>
      <CustomButton onPress={login} text="Ingresa Ahora" />
      <FromDevora />
    </View>
  );
};

export default Welcome;
