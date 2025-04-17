import React, { useState } from 'react';
import { StyleSheet, Alert, Text, View, Pressable } from 'react-native';
import { useAuthStore } from '../../../../lib/store/authStore';
import { User } from '../../../../lib/interfaces/User';
import GlobalContainer from '../../../components/GlobalContainer';
import HeaderLogin from './sections/HeaderLogin';
import { newColors } from '../../../styles/colors';
import CustomInput from '../../../components/customs/CustomImput';
import CustomButton from '../../../components/customs/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../../navigator/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import WithLove from '../../../components/WithLove';
import FooterLogin from './sections/FooterLogin';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const Login = () => {
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
          placeholder="Correo electronico"
          value={email}
          onChangeText={setEmail}
          iconName="mail-outline"
        />
        <CustomInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          password
        />
        <Pressable style={styles.pressable} onPress={() => Alert.alert('JAJA webon')}>
          <Text style={[styles.text, styles.centeredText]}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
        <CustomButton
          text="Iniciar sesión"
          onPress={handleLogin}
          textColor={newColors.fondo_secundario}
        />
        <Text style={[styles.text, styles.centeredText]}>¿No tienes una cuenta? Registrate</Text>
        <CustomButton
          text="Registrate"
          onPress={() => navigation.navigate('Register')}
          textColor={newColors.fondo_principal}
          backgroundColor={newColors.fondo_secundario}
        />
        <View style={{height: 2, width: '100%', backgroundColor: newColors.fondo_secundario, marginVertical: 10}} />
        <WithLove />
      </View>

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

export default Login;