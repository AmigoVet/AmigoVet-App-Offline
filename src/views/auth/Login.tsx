// **Librerías externas**
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// **Interfaces y tipos**
import { RootStackParamList } from '../Welcome';

// **Configuración y almacenamiento**
import { appFirebase, db } from '../../lib/utils/FirebaseConfig';
import useAuthStore from '../../lib/store/authStore';

// **Contexto y estilos**
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors } from '../../assets/styles/colors';
import { createNewStyles } from '../../assets/styles/NewStyles';
import { createGlobalStyles } from '../../assets/styles/styles';

// **Componentes locales**
import { CustomInput, CustomButton } from '../../components/Customs';
import { LogoContainer } from '../../components/global';


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

    setLoading(true); // Inicia el loading

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      const userData = userDoc.data() as User;
      setUser(userData);
      Alert.alert('Iniciado sesión', `Bienvenido, ${userData.nombre}`);
    } catch (error) {
      if (error instanceof Error && 'code' in error) {
        const firebaseError = error as { code: string };
        let errorMessage = 'Ups, algo salió mal. Inténtalo de nuevo.';

        switch (firebaseError.code) {
          case 'auth/invalid-credential':
            errorMessage = 'Revisa que los datos ingresados sean correctos.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'El correo electrónico no es válido.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Esta cuenta ha sido deshabilitada.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No se encontró un usuario con este correo.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'La contraseña es incorrecta.';
            break;
          default:
            errorMessage = 'Verifica las crendenciales';
            break;
        }

        Alert.alert('Ups, algo salió mal', errorMessage);
      } else {
        Alert.alert('Error', 'Se produjo un error desconocido.');
      }
    } finally {
      setLoading(false); 
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
    messageContainer: {
      marginTop: height * 0.03,
      width: '90%',
    },
    message: {
      color: colors.rojo,
      fontSize: width * 0.04,
      textAlign: 'center',
      fontWeight: 'bold',
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
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              Recuerda tener acceso a internet para crear tu usuario o ingresar a tu cuenta la primera vez.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};



export default Login;
