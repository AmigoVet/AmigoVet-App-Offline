import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useAuthStore } from '../../../../lib/store/authStore';
import CustomButton from '../../../components/customs/CustomButton';
import GlobalContainer from '../../../components/GlobalContainer';
import { newColors } from '../../../styles/colors';

const Profile = () => {
  const { user, logout, resetPassword } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo cerrar sesión. Intenta de nuevo.');
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) {
      Alert.alert('Error', 'No se encontró un correo electrónico para este usuario.');
      return;
    }
    try {
      await resetPassword(user.email);
      Alert.alert(
        'Correo enviado',
        'Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico.'
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo enviar el enlace de restablecimiento.');
    }
  };

  return (
    <GlobalContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        {user ? (
          <View style={styles.infoContainer}>
            <Text style={styles.label}>ID Completo:</Text>
            <Text style={styles.value}>{user.id}</Text>
            <Text style={styles.label}>Nombre Completo:</Text>
            <Text style={styles.value}>{user.name}</Text>
            <Text style={styles.label}>Correo Electrónico:</Text>
            <Text style={styles.value}>{user.email}</Text>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>{user.phone || 'No disponible'}</Text>
            <Text style={styles.label}>Rol:</Text>
            <Text style={styles.value}>{user.role || 'No especificado'}</Text>
          </View>
        ) : (
          <Text style={styles.noUserText}>No se encontraron datos del usuario.</Text>
        )}
        <CustomButton
          text="Restablecer Contraseña"
          onPress={handleResetPassword}
          textColor={newColors.fondo_principal}
          backgroundColor={newColors.verde_light}
        />
        <CustomButton
          text="Cerrar Sesión"
          onPress={handleLogout}
          textColor={newColors.fondo_principal}
          backgroundColor={newColors.rojo || '#ff0000'}
        />
      </View>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Chillax-Extralight',
    color: newColors.fondo_secundario,
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: newColors.fondo_principal || '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Chillax-Extralight',
    color: newColors.fondo_secundario,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontFamily: 'Chillax-Extralight',
    color: newColors.fondo_secundario,
    marginBottom: 5,
  },
  noUserText: {
    fontSize: 16,
    fontFamily: 'Chillax-Extralight',
    color: newColors.rojo || '#ff0000',
    textAlign: 'center',
    marginVertical: 20,
  },
  resetButton: {
    marginBottom: 10,
  },
});

export default Profile;