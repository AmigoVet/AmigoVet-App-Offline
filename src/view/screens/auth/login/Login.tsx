import React, { useState } from 'react';
import { StyleSheet, Alert, Text, View, ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import FooterLogin from './sections/FooterLogin';
import { useAuthStore } from '../../../../lib/store/authStore';
import CustomButton from '../../../components/customs/CustomButton';
import CustomInput from '../../../components/customs/CustomImput';
import GlobalContainer from '../../../components/GlobalContainer';
import WithLove from '../../../components/WithLove';
import { AuthStackParamList } from '../../../navigator/navigationTypes';
import { newColors } from '../../../styles/colors';
import HeaderLogin from './sections/HeaderLogin';
import Separator from '../../../components/Separator';

type LoginScreenNavigationProp = NavigationProp<AuthStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuthStore();

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert('Iniciado sesión', 'Bienvenido');
    } catch {
      if (error) {
        Alert.alert('Error', error.join('\n'));
      }
    }
  };

  return (
    <GlobalContainer>
      <ScrollView>
        <HeaderLogin />
        <Text style={styles.text}>Introduce tu correo electrónico y contraseña</Text>
        {error && (
          <View style={styles.errorContainer}>
            {error.map((err, index) => (
              <Text key={index} style={styles.errorText}>{err}</Text>
            ))}
          </View>
        )}
        <View style={styles.form}>
          <CustomInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            iconName="mail-outline"
          />
          <CustomInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            password
            iconName="lock-closed-outline"
          />
          <CustomButton
            text="Iniciar sesión"
            onPress={handleLogin}
            textColor={newColors.fondo_secundario}
            disabled={loading}
          />
          <Text style={[styles.text, styles.centeredText]}>¿No tienes una cuenta? Regístrate</Text>
          <CustomButton
            text="Regístrate"
            onPress={() => navigation.navigate('Register')}
            textColor={newColors.fondo_principal}
            backgroundColor={newColors.fondo_secundario}
          />
          <View style={{ height: 2, width: '100%', backgroundColor: newColors.fondo_secundario, marginVertical: 10 }} />
          <WithLove />
        </View>
        <Separator height={100} />
        <FooterLogin />
      </ScrollView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 30,
    fontSize: 16,
    color: newColors.fondo_secundario,
    fontFamily: 'Chillax-Extralight',
  },
  centeredText: {
    textAlign: 'center',
    marginLeft: 0,
    width: '100%',
    paddingVertical: 10,
  },
  form: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  pressable: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  errorContainer: {
    width: '100%',
    padding: 10,
    marginLeft: 30,
  },
  errorText: {
    color: newColors.rojo || '#ff0000',
    fontSize: 14,
    fontFamily: 'Chillax-Extralight',
  },
});

export default Login;
