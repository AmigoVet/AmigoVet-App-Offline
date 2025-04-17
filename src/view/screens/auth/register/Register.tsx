import { View, Text, Alert, Pressable, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { User } from '../../../../lib/interfaces/User';
import { useAuthStore } from '../../../../lib/store/authStore';
import CustomButton from '../../../components/customs/CustomButton';
import CustomInput from '../../../components/customs/CustomImput';
import GlobalContainer from '../../../components/GlobalContainer';
import WithLove from '../../../components/WithLove';
import { AuthStackParamList } from '../../../navigator/navigationTypes';
import { newColors } from '../../../styles/colors';
import FooterLogin from '../login/sections/FooterLogin';
import HeaderLogin from '../login/sections/HeaderLogin';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;


const Register = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (name && email && password) {
      await login({ name, email, password } as User);
    } else {
      Alert.alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <GlobalContainer>
      <ScrollView>
      <HeaderLogin />
      
      <Text style={styles.text}>Introduce tu correo electronico y contraseña</Text>

      <View style={styles.form}>
        <CustomInput
          placeholder="Nombre Completo"
          value={email}
          onChangeText={setEmail}
          iconName="person-outline"
        />
        <CustomInput
          placeholder="Correo electronico"
          value={email}
          onChangeText={setEmail}
          iconName="mail-outline"
        />
        <CustomInput
          placeholder="Numero telefonico"
          value={email}
          onChangeText={setEmail}
          iconName="call-outline"
        />
        <CustomInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          password
        />
        <CustomInput
          placeholder="Repite la contraseña"
          value={password}
          onChangeText={setPassword}
          password
        />

        <CustomButton
          text="Registrate"
          onPress={handleLogin}
          textColor={newColors.fondo_secundario}
        />
        <Text style={[styles.text, styles.centeredText]}>Ya tienes una cuenta?</Text>
        <CustomButton
          text="Inicia Sesion"
          onPress={() => navigation.goBack()}
          textColor={newColors.fondo_principal}
          backgroundColor={newColors.fondo_secundario}
        />
        <View style={{height: 2, width: '100%', backgroundColor: newColors.fondo_secundario, marginVertical: 10}} />
        <WithLove />
      </View>

      <FooterLogin />

      </ScrollView>
    </GlobalContainer>
  )
}

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
  input: {
    width: '100%', 
    marginVertical: 10, 
  },
  button: {
    width: '100%',
    marginVertical: 10, 
  },
  pressable: {
    width: '100%', 
    alignItems: 'center', 
    marginVertical: 10, 
  },
});

export default Register