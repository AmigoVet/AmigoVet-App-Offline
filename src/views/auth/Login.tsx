import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '../Welcome';
import { CustomButton, CustomInput, LogoContainer } from '../../assets/components';
import { colors, GlobalStyles } from '../../assets/styles';

import { appFirebase } from '../../credenciales';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../credenciales'; // Importa Firestore desde tu archivo de configuración
import useAuthStore from '../../assets/store/authStore';

type User = {
  nombre: string;
  correo: string;
  telefono: string;
  userId: string;
};

const auth = getAuth(appFirebase);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const setUser = useAuthStore((state) => state.setUser); // Obtén la función para actualizar el usuario

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos vacíos', 'Por favor, llena todos los campos.');
      return;
    }

    try {
      // Inicia sesión con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Obtén el usuario autenticado

      // Obtén los datos adicionales del usuario desde Firestore
      const userDocRef = doc(db, 'users', user.uid); // Referencia al documento del usuario
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as User; // Cast explícito a `User`
        setUser(userData); // Guarda los datos del usuario en el estado global
        Alert.alert('Iniciado sesión', `Bienvenido, ${userData.nombre}`);
        // navigate('Home'); // Redirige a la pantalla principal
      } else {
        Alert.alert('Error', 'No se encontraron datos del usuario en Firestore.');
      }
    } catch (error) {
      let errorMessage = 'Ocurrió un error. Inténtalo de nuevo.';
      if (error === 'auth/user-not-found') {
        errorMessage = 'Usuario no encontrado. Por favor, regístrate.';
      } else if (error === 'auth/wrong-password') {
        errorMessage = 'Contraseña incorrecta.';
      } else if (error === 'auth/invalid-email') {
        errorMessage = 'Formato de correo inválido.';
      }
      Alert.alert('Error al iniciar sesión', errorMessage);
    }
  };

  return (
    <View style={[GlobalStyles.container, { alignItems: 'flex-start' }]}>
      <LogoContainer />
      <Text style={[GlobalStyles.title, { fontSize: 35 }]}>Ingresa tu usuario</Text>
      <View style={styles.formContainer}>
        <CustomInput
          label="Correo Electrónico"
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          label="Contraseña"
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <CustomButton onPress={handleLogin} text="Ingresar" />
        <Pressable onPress={() => navigate('Register')} style={styles.link}>
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
