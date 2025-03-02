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
import AssetIcons from './AssetIcons';
import Separator from '../../components/global/Separator';

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
      style={{ flex: 1, backgroundColor: newColors.fondo_principal }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >


      {/* ScrollView para el formulario */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: height      
        }}
      >
              {/* Contenedor para los SVGs */}
        <AssetIcons />
        {/* Formulario */}
        <View style={styles.formContainer}>
          {/* Encabezado */}
          <View style={{ width: '100%', alignItems: 'flex-start' }}>
            <Text style={styles.title}>¡Hola!</Text>
            <Text style={[styles.title, { fontSize: width * 0.06 }]}>
              Bienvenid@ a AmigoVet
            </Text>
            <Text style={styles.minitext}>Estamos felices de tenerte aquí</Text>
          </View>
          <Text style={styles.minitext}>Introduce tu correo electrónico y contraseña</Text>
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
          <Pressable onPress={() => modalizeRef.current?.open()}>
            <Text style={[styles.minitext, { marginBottom: 10, borderBottomColor: newColors.fondo_secundario, borderBottomWidth: 0.5 }]}>
              ¿Olvidaste tu contraseña?
            </Text>
          </Pressable>
          <CustomButton
            onPress={handleLogin}
            text="iniciar sesión"
            loading={loading}
            textColor={newColors.fondo_secundario}
            disabled={loading || email.trim() === '' || password.trim() === ''}
          />
          <Text style={{ fontWeight: 'bold', fontSize: width * 0.05 }}>o</Text>
          <Text style={styles.minitext}>¿No tienes cuenta?</Text>
          <CustomButton
            onPress={() => navigate('Register')}
            text="Crear una cuenta"
            loading={false}
            disabled={false}
            backgroundColor={newColors.fondo_secundario}
          />
          <View
            style={{
              height: 3,
              borderWidth: 2,
              borderColor: newColors.fondo_secundario,
              width: '100%',
              marginTop: 10,
              borderRadius: 10,
            }}
          />
          <Text style={styles.minitext}>Echo con 💚 por Juan Mera</Text>
        </View>
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
            backgroundColor={newColors.rojo}
            textColor={newColors.fondo_principal}
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