// **Librerías externas**
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// **Interfaces y tipos**

// **Contexto y estilos**
import { getDynamicColors } from '../../assets/styles/colors';
import { createGlobalStyles } from '../../assets/styles/styles';

// **Funciones utilitarias**
import { changePassword } from '../../lib/functions/changePassword ';

// **Componentes locales**
import { CustomInput, CustomButton } from '../../components/Customs';
import { RootStackParamList } from '../../lib/interfaces/navigate';


const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const GlobalStyles = createGlobalStyles();


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

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'La nueva contraseña y su confirmación no coinciden');
      return;
    }

    const missingElements = validatePassword(newPassword);
    if (missingElements.length > 0) {
      Alert.alert(
        'Error',
        `La nueva contraseña debe contener al menos ${missingElements.join(', ')}`
      );
      return;
    }

    setLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      Alert.alert('Éxito', 'Tu contraseña ha sido cambiada correctamente');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      navigate('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo cambiar la contraseña. Verifica los datos ingresados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Cambiar Contraseña</Text>

      <CustomInput
        label="Contraseña actual"
        placeholder="Ingresa tu contraseña actual"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        password
      />
      <CustomInput
        label="Nueva contraseña"
        placeholder="Ingresa tu nueva contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        password
      />
      <CustomInput
        label="Confirmar nueva contraseña"
        placeholder="Confirma tu nueva contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        password
      />

      <CustomButton
        text={loading ? 'Cambiando...' : 'Cambiar Contraseña'}
        onPress={handlePasswordChange}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default ChangePasswordScreen;
