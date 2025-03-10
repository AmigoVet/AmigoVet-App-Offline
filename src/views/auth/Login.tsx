import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getAuth,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Modalize } from 'react-native-modalize';

import { appFirebase, db } from '../../lib/utils/FirebaseConfig';
import useAuthStore from '../../lib/store/authStore';
import { newColors } from '../../assets/styles/colors';
import { CustomInput, CustomButton } from '../../components/Customs';
import AssetIcons from './AssetIcons';
import Separator from '../../components/global/Separator';
import { constants } from '../../assets/styles/constants';
import { RootStackParamList } from '../../lib/interfaces/navigate';
import { FONT_SIZES, horizontalScale, verticalScale } from '../../lib/functions/scale';

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
    <SafeAreaView style={styles.container}>
      {/* Fondo fijo con AssetIcons */}
      <View style={styles.background}>
        <AssetIcons />
      </View>

      {/* Contenido desplazable */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajuste para Android
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : verticalScale(20)} // Offset adicional si es necesario
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Formulario */}
          <View style={styles.formContainer}>
            <Separator height={verticalScale(100)} />
            {/* Encabezado */}
            <View style={{ width: '100%', alignItems: 'flex-start' }}>
              <Text style={[styles.title, { fontSize: FONT_SIZES.largeTitle *1.2 }]}>¡Hola!</Text>
              <Text style={[styles.title,]}>
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
              <Text
                style={[
                  styles.minitext,
                  {
                    marginBottom: verticalScale(10),
                    borderBottomColor: newColors.fondo_secundario,
                    borderBottomWidth: 0.5,
                  },
                ]}
              >
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
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: FONT_SIZES.xxl,
                marginVertical: verticalScale(10),
              }}
            >
              o
            </Text>
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
                height: 2,
                borderWidth: 1,
                borderColor: newColors.fondo_secundario,
                width: '100%',
                marginTop: verticalScale(15),
                borderRadius: 10,
              }}
            />
          </View>
          {/* Espacio adicional al final para evitar que el teclado tape el contenido */}
          <View style={{ height: verticalScale(100) }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modalize para recuperación */}
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={{ backgroundColor: newColors.fondo_principal }}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Recuperar Contraseña</Text>
          <CustomInput
            placeholder="Correo electrónico"
            value={resetEmail}
            onChangeText={setResetEmail}
            iconName="mail-outline"
          />
          <Separator height={verticalScale(40)} />
          <CustomButton
            onPress={handleResetPassword}
            text="Enviar correo"
            loading={false}
            disabled={!resetEmail}
            textColor={newColors.fondo_secundario}
          />
          <Separator height={verticalScale(10)} />
          <CustomButton
            onPress={() => modalizeRef.current?.close()}
            text="Cancelar"
            loading={false}
            backgroundColor={newColors.rojo}
          />
          <Separator height={verticalScale(20)} />
        </View>
      </Modalize>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: newColors.fondo_principal,
  },
  background: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 1, // Fondo detrás del contenido
  },
  keyboardAvoidingContainer: {
    flex: 1,
    zIndex: 1, 
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(20),
    minHeight: Dimensions.get('window').height, 
  },
  formContainer: {
    width: '90%',
    padding: horizontalScale(20),
    alignItems: 'center',
  },
  minitext: {
    color: newColors.fondo_secundario,
    fontSize: FONT_SIZES.lg,
    marginTop: verticalScale(15),
    textAlign: 'center',
    fontWeight: '200',
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalContent: {
    padding: horizontalScale(20),
    alignItems: 'center',
    backgroundColor: newColors.fondo_principal,
    borderRadius: constants.borderRadius,
  },
  modalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
  },
});