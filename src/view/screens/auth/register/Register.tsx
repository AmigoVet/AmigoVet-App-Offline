import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import FooterLogin from '../login/sections/FooterLogin';
import HeaderLogin from '../login/sections/HeaderLogin';
import CustomButton from '../../../components/customs/CustomButton';
import CustomInput from '../../../components/customs/CustomImput';
import GlobalContainer from '../../../components/GlobalContainer';
import WithLove from '../../../components/WithLove';
import { AuthStackParamList } from '../../../navigator/navigationTypes';
import { newColors } from '../../../styles/colors';
import { useAuthStore } from '../../../../lib/store/authStore';

type RegisterScreenNavigationProp = NavigationProp<AuthStackParamList, 'Register'>;

const Register = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, loading, error } = useAuthStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleRegister = async () => {
    setLocalError(null);

    // Validate form inputs
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
      setLocalError('Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Las contraseñas no coinciden.');
      return;
    }

    // Password requirements
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setLocalError(
        'La contraseña debe incluir al menos una letra mayúscula, un número, un símbolo y tener mínimo 6 caracteres.'
      );
      return;
    }

    // Phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setLocalError('El número telefónico debe tener 10 dígitos.');
      return;
    }

    try {
      await register({ name, email, phone, password, confirmPassword });
      Alert.alert('Registro exitoso', 'Cuenta creada correctamente', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (err: any) {
      let errorMessage = 'Ocurrió un error al registrarse';
      if (err.message.includes('email-already-in-use')) {
        errorMessage = 'El correo electrónico ya está en uso.';
      } else if (err.message.includes('invalid-email')) {
        errorMessage = 'El correo electrónico no es válido.';
      } else if (err.message.includes('weak-password')) {
        errorMessage = 'La contraseña es demasiado débil.';
      } else {
        errorMessage = err.message;
      }
      setLocalError(errorMessage);
    }
  };

  const validateForm = () => {
    return name.trim() !== '' && 
           email.trim() !== '' && 
           phone.trim() !== '' && 
           password.trim() !== '' && 
           confirmPassword.trim() !== '';
  };

  return (
    <GlobalContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <HeaderLogin />
        <Text style={styles.text}>Completa el formulario para crear tu cuenta</Text>
        
        {/* Mostrar errores de la tienda si existen */}
        {error && error.length > 0 && (
          <View style={styles.errorContainer}>
            {error.map((err, index) => (
              <Text key={index} style={styles.errorText}>{err}</Text>
            ))}
          </View>
        )}
        
        {/* Mostrar errores locales */}
        {localError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{localError}</Text>
          </View>
        )}
        
        <View style={styles.form}>
          <CustomInput
            placeholder="Nombre Completo"
            value={name}
            onChangeText={setName}
            iconName="person-outline"
          />
          <CustomInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            iconName="mail-outline"
            keyboardType="email-address"
          />
          <CustomInput
            placeholder="Número telefónico (10 dígitos)"
            value={phone}
            onChangeText={setPhone}
            iconName="call-outline"
            keyboardType="phone-pad"
          />
          <CustomInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            iconName="lock-closed-outline"
            password
          />
          <CustomInput
            placeholder="Repite la contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            iconName="lock-closed-outline"
            password
          />
          
          <Text style={styles.passwordRequirements}>
            La contraseña debe incluir al menos una letra mayúscula, un número, un símbolo y tener mínimo 6 caracteres.
          </Text>
          
          {loading ? (
            <ActivityIndicator size="large" color={newColors.fondo_principal} style={styles.loader} />
          ) : (
            <CustomButton
              text="Regístrate"
              onPress={handleRegister}
              textColor={newColors.fondo_secundario}
              disabled={!validateForm()}
            />
          )}
          
          <Text style={[styles.text, styles.centeredText]}>¿Ya tienes una cuenta?</Text>
          
          <CustomButton
            text="Inicia Sesión"
            onPress={() => navigation.navigate('Login')}
            textColor={newColors.fondo_principal}
            backgroundColor={newColors.fondo_secundario}
          />
          
          <View style={styles.divider} />
          <WithLove />
        </View>
        <FooterLogin />
      </ScrollView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  text: {
    marginLeft: 30,
    fontSize: 16,
    color: newColors.fondo_secundario,
    fontFamily: 'Chillax-Extralight',
  },
  centeredText: {
    textAlign: 'center',
    marginLeft: 0,
    width: '100%',
    paddingVertical: 10,
  },
  form: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  errorContainer: {
    width: '85%',
    padding: 10,
    marginHorizontal: 30,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: newColors.rojo || '#ff0000',
    fontSize: 14,
    fontFamily: 'Chillax-Extralight',
    marginBottom: 2,
  },
  passwordRequirements: {
    fontSize: 12,
    color: newColors.fondo_secundario,
    fontFamily: 'Chillax-Extralight',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: newColors.fondo_secundario,
    marginVertical: 15,
  },
  loader: {
    marginVertical: 20,
  }
});

export default Register;