import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GlobalStyles } from '../../assets/styles/styles';
import CustomInput from '../../assets/components/CustomInput';
import CustomButton from '../../assets/components/CustomButton';
import LogoContainer from '../../assets/components/LogoContainer';
import { colors } from '../../assets/styles/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Welcome';

// Firebase imports
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../credenciales'; // Importa Firestore desde tu archivo de configuración
import useAuthStore from '../../assets/store/authStore';

const Register = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const auth = getAuth();
  const setUser = useAuthStore((state) => state.setUser); // Obtén la función para guardar el usuario en el estado global

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (!email || !password || !username || !phone) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      // Crea el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guarda los datos adicionales en Firestore
      const userData = {
        nombre: username,
        correo: email,
        telefono: phone,
        userId: user.uid,
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      // Guarda los datos en el estado global
      setUser(userData);

      Alert.alert('Registro exitoso', 'El usuario ha sido creado');
      navigate('Home'); // Redirige al Home después del registro
    } catch (error) {
      console.error('Error al registrar:', error);
      Alert.alert('Error al registrar');
    }
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
        <Pressable onPress={() => { navigate('Login'); }} style={styles.link}>
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
