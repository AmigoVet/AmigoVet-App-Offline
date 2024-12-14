// **Librerías externas**
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// **Interfaces y tipos**
import { RootStackParamList } from '../Welcome';

// **Configuración y almacenamiento**
import { db } from '../../lib/utils/FirebaseConfig';
import useAuthStore from '../../lib/store/authStore';

// **Contexto y estilos**
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors } from '../../assets/styles/colors';
import { createGlobalStyles } from '../../assets/styles/styles';

// **Componentes locales**
import { CustomInput, CustomButton } from '../../components/Customs';
import { LogoContainer } from '../../components/global';

const Register = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const GlobalStyles = createGlobalStyles(isDarkTheme);
  const styles = dymanycStyles(colors);


  const auth = getAuth();
  const setUser = useAuthStore((state) => state.setUser);

  const validatePassword = (password: string) => {
    const missingElements: string[] = [];
    if (!/[A-Z]/.test(password)) {
      missingElements.push('una letra mayúscula');
    }
    if (!/\d/.test(password)) {
      missingElements.push('un número');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      missingElements.push('un símbolo');
    }
    return missingElements;
  };

  const validatePhone = (phone: string) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Verifica las contraseñas', 'Las contraseñas no coinciden');
      return;
    }

    const missingElements = validatePassword(password);
    if (missingElements.length > 0) {
      Alert.alert(
        'Contraseña no válida',
        `La contraseña debe incluir ${missingElements.join(', ')}.`
      );
      return;
    }

    if (!email || !password || !username || !phone) {
      Alert.alert('Rellena todos los campos', 'Todos los campos son obligatorios');
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert(
        'Número de teléfono no válido',
        'El número de teléfono debe tener 10 dígitos y ser válido en Colombia.'
      );
      return;
    }

    setLoading(true); // Inicia el loading

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        nombre: username,
        correo: email,
        telefono: phone,
        userId: user.uid,
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      setUser(userData);

      Alert.alert('Registro exitoso', 'El usuario ha sido creado');
      navigate('Home');
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const firebaseError = error as { code: string };
        if (firebaseError.code === 'auth/email-already-in-use') {
          Alert.alert('Ups..', 'El correo electrónico ya está en uso');
        } else {
          Alert.alert('Error', 'Algo salió mal. Inténtalo de nuevo.');
        }
      } else {
        Alert.alert('Error', 'Se produjo un error desconocido.');
      }
    } finally {
      setLoading(false); // Finaliza el loading
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <LogoContainer />
      <Text style={[GlobalStyles.title, { fontSize: 35 }]}>Rellena el formulario</Text>
      <View style={styles.formContainer}>
        <CustomInput
          label="Nombre"
          placeholder="Ingresa tu nombre completo"
          value={username}
          onChangeText={setUsername}
        />
        <CustomInput
          label="Correo electrónico"
          placeholder="ejemplo@ejemplo.com"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          label="Teléfono"
          placeholder="+57 XXX XXX XXXX"
          value={phone}
          onChangeText={setPhone}
          type="number"
        />
        <CustomInput
          label="Contraseña"
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          password
        />
        <CustomInput
          label="Confirmar contraseña"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          password
        />
        <CustomButton
          onPress={handleRegister}
          text={loading ? <ActivityIndicator color="white" /> : 'Registrarse'}
          disabled={loading} // Deshabilita el botón mientras carga
        />
        <Pressable onPress={() => navigate('Login')} style={styles.link}>
          <Text style={{ color: colors.blanco }}>¿Ya tienes una cuenta?</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const dymanycStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
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
