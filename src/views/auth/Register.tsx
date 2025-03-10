import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { db } from '../../lib/utils/FirebaseConfig';
import useAuthStore from '../../lib/store/authStore';
import { newColors } from '../../assets/styles/colors';
import { CustomInput, CustomButton } from '../../components/Customs';
import Separator from '../../components/global/Separator';
import AssetIcons from './AssetIcons';
import { RootStackParamList } from '../../lib/interfaces/navigate';
import { verticalScale } from '../../lib/functions/scale';

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
  const [error, setError] = useState<string[] | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
    // Limpiar errores previos
    setError(null);
    setSuccess(null);
    
    if (password !== confirmPassword) {
      setError(['Las contraseñas no coinciden']);
      return;
    }

    const missingElements = validatePassword(password);
    if (missingElements.length > 0) {
      setError([`La contraseña debe incluir ${missingElements.join(', ')}.`]);
      return;
    }

    if (!email || !password || !username || !phone) {
      setError(['Todos los campos son obligatorios']);
      return;
    }

    if (!validatePhone(phone)) {
      setError(['El número de teléfono debe tener 10 dígitos y ser válido en Colombia.']);
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
      
      // Mostrar mensaje de éxito y navegar después de un breve retraso
      setSuccess('¡Registro exitoso! El usuario ha sido creado');
      
      // Navegar después de un breve retraso para que el usuario vea el mensaje de éxito
      setTimeout(() => {
        navigate('Home');
      }, 1500);
      
    } catch (error) {
      console.error(error);
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const firebaseError = error as { code: string };
        if (firebaseError.code === 'auth/email-already-in-use') {
          setError(['El correo electrónico ya está en uso']);
        } else {
          setError(['Algo salió mal. Inténtalo de nuevo.']);
        }
      } else {
        setError(['Se produjo un error desconocido.']);
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
          <Separator height={verticalScale(110)} />
          
          {/* Encabezado */}
          <View style={{ width: '100%', alignItems: 'flex-start' }}>
            <Text style={styles.title}>¡Regístrate!</Text>
            <Text style={[styles.title, { fontSize: width * 0.06 }]}>
              Bienvenid@ a AmigoVet
            </Text>
            <Text style={styles.minitext}>Estamos felices de tenerte aquí</Text>
          </View>
          <Text style={styles.minitext}>Completa el formulario para crear tu cuenta</Text>
          {/* Mensajes de error o éxito */}
          {error && (
            <View style={styles.messageContainer}>
              {error.map((err, index) => (
                <Text key={index} style={styles.errorText}>{err}</Text>
              ))}
            </View>
          )}
          
          {success && (
            <View style={styles.messageContainer}>
              <Text style={styles.successText}>{success}</Text>
            </View>
          )}
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
  messageContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: 'left',
    fontSize: width * 0.01,
  },
  errorText: {
    color: newColors.rojo || '#ff0000',
    fontSize: width * 0.03,
    textAlign: 'left',
    fontWeight: '300',
  },
  successText: {
    color: '#4CAF50',
    fontSize: width * 0.04,
    textAlign: 'center',
    fontWeight: '500',
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