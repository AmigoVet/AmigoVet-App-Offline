import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GlobalStyles } from '../../assets/styles/styles';
import CustomInput from '../../assets/components/CustomInput';
import CustomButton from '../../assets/components/CustomButton';
import LogoContainer from '../../assets/components/LogoContainer';
import { colors } from '../../assets/styles/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Welcome';

const Register = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }
    console.log('Usuario:', username);
    console.log('Correo:', email);
    console.log('Teléfono:', phone);
    console.log('Contraseña:', password);
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled" // Permite cerrar el teclado al tocar fuera
    >
      <LogoContainer />
      <Text style={[GlobalStyles.title, { fontSize: 35 }]}>Rellena el formulario</Text>
      <View style={styles.formContainer}>
        <CustomInput
          label="Usuario"
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />
        <CustomInput
          label="Correo electrónico"
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          label="Teléfono"
          placeholder="Número telefónico"
          value={phone}
          onChangeText={setPhone}
        />
        <CustomInput
          label="Contraseña"
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <CustomInput
          label="Confirmar contraseña"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <CustomButton onPress={handleRegister} text="Registrarse" />
        <Pressable onPress={() => { navigate('Login') }} style={styles.link}>
          <Text style={{ color: colors.blanco }}>¿Ya tienes una cuenta?</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.fondo, 
  },
  container: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  formContainer: {
    width: '90%',
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.blanco,
    borderRadius: 10,
  },
  link: {
    alignSelf: 'center', 
    marginTop: 40, 
  },
});

export default Register;
