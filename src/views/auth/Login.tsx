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
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors } from '../../assets/styles/colors';
import { createGlobalStyles } from '../../assets/styles/styles';
import { CustomInput, CustomButton } from '../../components/Customs';
import { FromDevora, LogoContainer } from '../../components/global';

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
  const [resetEmail, setResetEmail] = useState(''); // Estado para el correo de recuperación

  const modalizeRef = useRef<Modalize>(null); // Referencia para Modalize

  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const setUser = useAuthStore((state) => state.setUser);

  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const GlobalStyles = createGlobalStyles(isDarkTheme);

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
      modalizeRef.current?.close(); // Cierra el modal después de enviar el correo
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar el correo. Revisa el correo ingresado.');
    }
  };

  const styles = StyleSheet.create({
    title: {
      fontSize: width * 0.08,
      textAlign: 'center',
    },
    formContainer: {
      width: '100%',
      padding: width * 0.05,
      borderColor: colors.blanco,
      borderWidth: 1,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: height * 0.03,
    },
    linkText: {
      color: colors.blanco,
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
      color: colors.fondo,
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[GlobalStyles.container, { alignItems: 'center' }]}>
          <LogoContainer />
          <Text style={[GlobalStyles.title, styles.title]}>Ingresa tu usuario</Text>
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
              password
            />
            <CustomButton onPress={handleLogin} text="Ingresar" loading={loading} disabled={loading} />
            <Pressable onPress={() => navigate('Register')}>
              <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
            </Pressable>
            <Pressable onPress={() => modalizeRef.current?.open()}>
              <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
            </Pressable>
          </View>
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
          />
        </View>
      </Modalize>
    </KeyboardAvoidingView>
  );
};

export default Login;
