import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { RootStackParamList } from '../Welcome';
import { db } from '../../lib/utils/FirebaseConfig';
import useAuthStore from '../../lib/store/authStore';
import { newColors } from '../../assets/styles/colors';
import { CustomInput, CustomButton } from '../../components/Customs';
import Separator from '../../components/global/Separator';
import { constants } from '../../assets/styles/constants';
import AssetIcons from './AssetIcons';

const auth = getAuth();
const { width, height } = Dimensions.get('window');

const Register = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: newColors.fondo_principal }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      {/* ScrollView para el formulario */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: height,
        }}
      >
        <AssetIcons />

        {/* Formulario */}
        <View style={styles.formContainer}>
          <Separator height={90} />
          {/* Encabezado */}
          <View style={{ width: '100%', alignItems: 'flex-start' }}>
            <Text style={styles.title}>¡Regístrate!</Text>
            <Text style={[styles.title, { fontSize: width * 0.06 }]}>
              Bienvenid@ a AmigoVet
            </Text>
            <Text style={styles.minitext}>Estamos felices de tenerte aquí</Text>
          </View>
          <Text style={styles.minitext}>Completa el formulario para crear tu cuenta</Text>
          <CustomInput
            placeholder="Nombre completo"
            value={username}
            onChangeText={setUsername}
            iconName="person-outline"
          />
          <CustomInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            iconName="mail-outline"
          />
          <CustomInput
            placeholder="Teléfono (+57 XXX XXX XXXX)"
            value={phone}
            onChangeText={setPhone}
            type="number"
            iconName="call-outline"
          />
          <CustomInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            password
            iconName="lock-closed-outline"
          />
          <CustomInput
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            password
            iconName="lock-closed-outline"
          />
          <CustomButton
            onPress={handleRegister}
            text="Registrarse"
            loading={loading}
            textColor={newColors.fondo_secundario}
            disabled={loading}
          />
          <Text style={{ fontWeight: 'bold', fontSize: width * 0.05 }}>o</Text>
          <Text style={styles.minitext}>¿Ya tienes cuenta?</Text>
          <CustomButton
            onPress={() => navigate('Login')}
            text="Iniciar sesión"
            loading={false}
            disabled={false}
            backgroundColor={newColors.fondo_secundario}
          />
          <View
            style={{
              height: 2,
              borderWidth: 1,
              borderColor: newColors.fondo_secundario,
              width: '100%',
              marginTop: 10,
              borderRadius: 10,
            }}
          />
          <Text style={styles.minitext}>Echo con 💚 por Juan Mera</Text>
        </View>
        <Separator height={140} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  svgContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  formContainer: {
    width: '100%',
    padding: width * 0.05,
    alignItems: 'center',
    zIndex: 2,
  },
  minitext: {
    color: newColors.fondo_secundario,
    fontSize: width * 0.04,
    marginTop: height * 0.02,
    textAlign: 'center',
    fontWeight: '200',
  },
  title: {
    fontSize: width * 0.1,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default Register;