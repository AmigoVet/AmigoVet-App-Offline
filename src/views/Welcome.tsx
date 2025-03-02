import React, { useEffect } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTheme } from '../lib/context/ThemeContext';
import { createGlobalStyles } from '../assets/styles/styles';
import { CustomButton } from '../components/Customs';
import { FromDevora } from '../components/global';
import { getDynamicColors, staticColors } from '../assets/styles/colors';
import { createTables } from '../lib/db/createTable';

export type RootStackParamList = {
  Welcome: undefined;
  Feed: undefined;
  Login: undefined;   
  Register: undefined;
  Home: undefined;
  Nuevo: undefined;
  AnimalView: {id: string};

  Busqueda: undefined;
  Calendar: undefined;
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

    useEffect(() => {
      createTables();
    }, []);
  

  const { width, height } = Dimensions.get('window');

  const {isDarkTheme} = useTheme();
  const GlobalStyles = createGlobalStyles(isDarkTheme);
  const colors = getDynamicColors(isDarkTheme);

  return (
    <View style={[GlobalStyles.container, { alignItems: 'flex-start', justifyContent: 'center' }]}>
      <Text style={[GlobalStyles.title, { fontSize: width*0.10, color: colors.verde, marginBottom: -50 }]}>Bienvenido a</Text>
      <Image 
        source={require('../assets/img/HeaderLogo.png')}
        resizeMode="contain"
        style={{ 
          width: width*0.9,
          height: width*0.5, 
          alignSelf: 'center',

        }}
      />
      {/* <Text style={[GlobalStyles.subTitle, { fontSize: width*0.2, color: colors.verde, marginBottom: 30 }]}>AmigoVet</Text> */}
      <CustomButton onPress={login} text="Ingresa Ahora" />
      <FromDevora />
    </View>
  );
};

export default Welcome;
