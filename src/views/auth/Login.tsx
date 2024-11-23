import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GlobalStyles } from '../../assets/styles/styles';
import CustomInput from '../../assets/components/CustomInput';
import { colors } from '../../assets/styles/colors';
import CustomButton from '../../assets/components/CustomButton';
import LogoContainer from '../../assets/components/LogoContainer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Welcome';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
  };


  return (
    <View style={[GlobalStyles.container, { alignItems: 'flex-start' }]}> 
      <LogoContainer />
      <Text style={[GlobalStyles.title, {fontSize: 35}]}>Ingresa tu usuario</Text>
      <View style={styles.formContainer}>
        <CustomInput
          label="Usuario"
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername} 
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
