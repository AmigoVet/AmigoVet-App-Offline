import React, { useEffect } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { createGlobalStyles } from '../assets/styles/styles';
import { CustomButton } from '../components/Customs';
import { FromDevora } from '../components/global';
import { getDynamicColors, newColors, staticColors } from '../assets/styles/colors';
import { createTables } from '../lib/db/createTable';
import { RootStackParamList } from '../lib/interfaces/navigate';

const Welcome = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const login = () => {
    navigate('Login'); 
  };

    useEffect(() => {
      createTables();
    }, []);
  

  const { width, height } = Dimensions.get('window');

  const GlobalStyles = createGlobalStyles();

  return (
    <View style={[GlobalStyles.container, { alignItems: 'flex-start', justifyContent: 'center' }]}>
      <Text style={[GlobalStyles.title, { fontSize: width*0.10, color: newColors.verde, marginBottom: -50 }]}>Bienvenido a</Text>
      {/* <Text style={[GlobalStyles.subTitle, { fontSize: width*0.2, color: colors.verde, marginBottom: 30 }]}>AmigoVet</Text> */}
      <CustomButton onPress={login} text="Ingresa Ahora" />
      <FromDevora />
    </View>
  );
};

export default Welcome;
