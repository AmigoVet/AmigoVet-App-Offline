import React, { useEffect } from 'react';
import {  Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigator/navigationTypes';
import CustomButton from '../../components/customs/CustomButton';
import GlobalContainer from '../../components/GlobalContainer';
import { newColors } from '../../styles/colors';
import Separator from '../../components/Separator';

type WelcomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

const Welcome = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <GlobalContainer style={styles.contentContainer}>
        <Text style={styles.subtitle}>Bienvenido</Text>
        <Text style={styles.subtitle}>a</Text>
        <Text style={[styles.title]}>AmigoVet</Text>
        <CustomButton
          text="Iniciar Sesión"
          onPress={() => navigation.navigate('Login')}
          backgroundColor={newColors.fondo_secundario}
        />
        <Separator height={10} />
        <CustomButton
          text="Registrate"
          onPress={() => navigation.navigate('Register')}
          backgroundColor={newColors.fondo_secundario}
        />
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 45,
  },
  title: {
    fontSize: 68,
    fontWeight: '600',
    fontFamily: 'Chillax',
    textAlign: 'left',
    width: '107%',
    color: newColors.verde_light,
  },
  subtitle: {
    fontSize: 34,
    fontFamily: 'Synonym-Regular',
    textAlign: 'left',
    width: '100%',
    fontWeight: '600',
  },
});

export default Welcome;
