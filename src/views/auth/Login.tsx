import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';


import { RootStackParamList } from '../Welcome';

import { CustomButton, CustomInput, LogoContainer } from '../../assets/components';
import { colors, GlobalStyles } from '../../assets/styles';

import appFirebase from '../../credenciales';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
const auth = getAuth(appFirebase);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async() => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Iniciado sesión', 'Accediendo...');
      navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };
  


  return (
    <View style={[GlobalStyles.container, { alignItems: 'flex-start' }]}> 
      <LogoContainer />
      <Text style={[GlobalStyles.title, {fontSize: 35}]}>Ingresa tu usuario</Text>
      <View style={styles.formContainer}>
        <CustomInput
          label="Gmail"
          placeholder="Correo electronico"
          value={email}
          onChangeText={setEmail} 
        />
        <CustomInput
          label="Contraseña"
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton onPress={handleLogin} text="Ingresar" />
        <Pressable onPress={() => { navigate('Register') }} style={styles.link}>
          <Text style={{ color: colors.blanco }}>¿No tienes cuenta?</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between', 
    width: '100%',
    height: 300,
    marginTop: 20,
    borderColor: colors.blanco,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  link: {
    alignSelf: 'center', 
    marginTop: 'auto', 
  },
});

export default Login;
