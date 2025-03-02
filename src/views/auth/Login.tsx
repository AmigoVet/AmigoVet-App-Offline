import React, { useState, useRef } from 'react';
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
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getAuth,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Modalize } from 'react-native-modalize';

import { RootStackParamList } from '../Welcome';
import { appFirebase, db } from '../../lib/utils/FirebaseConfig';
import useAuthStore from '../../lib/store/authStore';
import { newColors } from '../../assets/styles/colors';
import { CustomInput, CustomButton } from '../../components/Customs';
import { FromDevora } from '../../components/global';
import CatSvg from '../../assets/svgs/animals/CatSvg';
import CowSvg from '../../assets/svgs/animals/CowSvg';
import DogSvg from '../../assets/svgs/animals/DogSvg';
import Iconlogo from '../../assets/svgs/Iconlogo';

type User = {
  nombre: string;
  correo: string;
  telefono: string;
  userId: string;
};

const auth = getAuth(appFirebase);
const { width, height } = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const modalizeRef = useRef<Modalize>(null);

  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos vacíos', 'Por favor, llena todos los campos.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        Alert.alert('Error', 'No se encontró la información del usuario.');
        setLoading(false);
        return;
      }

      const userData = userDoc.data() as User;
      setUser(userData);
      Alert.alert('Iniciado sesión', `Bienvenido, ${userData.nombre}`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar sesión. Revisa tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      Alert.alert('Campo vacío', 'Por favor, ingresa un correo electrónico.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert('Correo enviado', 'Se ha enviado un enlace para recuperar tu contraseña.');
      modalizeRef.current?.close();
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar el correo. Revisa el correo ingresado.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: newColors.fondo_principal,
          alignItems: 'center', 
          justifyContent: 'center',
        }}
      >
        {/* Contenedor para los SVGs */}
        <View style={styles.svgContainer}>
          <Iconlogo 
            style={{
              height: width * 0.4,
              width: width * 0.4,
              position: 'absolute',
              top: 0,
              left: 30,
            }}
          />
          <CatSvg
            style={{
              width: width * 0.5,
              height: width * 0.5,
              position: 'absolute',
              top: 0,
              right: -5,
            }}
          />
          <CowSvg
            style={{
              width: width * 0.5,
              height: width * 0.5,
              position: 'absolute',
              bottom: -25,
              left: 0,
            }}
          />
          <DogSvg
            style={{
              width: width * 0.5,
              height: width * 0.5,
              position: 'absolute',
              bottom: -50,
              right: -50,
            }}
          />
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          <CustomInput
            placeholder="Email"
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
          <CustomButton
            onPress={handleLogin}
            text="Ingresar"
            loading={loading}
            disabled={loading || email.trim() === '' || password.trim() === ''}
          />
          <Pressable onPress={() => navigate('Register')}>
            <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
          </Pressable>
          <Pressable onPress={() => modalizeRef.current?.open()}>
            <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
          </Pressable>
        </View>

        <FromDevora />
      </ScrollView>

      {/* Modalize para recuperación */}
      <Modalize ref={modalizeRef} adjustToContentHeight>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Recuperar Contraseña</Text>
          <CustomInput
            label="Correo Electrónico"
            placeholder="Correo electrónico"
            value={resetEmail}
            onChangeText={setResetEmail}
          />
          <CustomButton
            onPress={handleResetPassword}
            text="Enviar correo"
            loading={false}
            disabled={!resetEmail}
          />
          <CustomButton
            onPress={() => modalizeRef.current?.close()}
            text="Cancelar"
            loading={false}
            red
          />
        </View>
      </Modalize>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  svgContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%', 
    zIndex: 0, 
  },
  formContainer: {
    width: '100%',
    padding: width * 0.05,
    alignItems: 'center',
    backgroundColor: newColors.fondo_principal, 
    zIndex: 1, 
  },
  linkText: {
    color: newColors.verde,
    fontSize: width * 0.045,
    marginTop: height * 0.02,
    textAlign: 'center',
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});