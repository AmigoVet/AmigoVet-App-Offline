import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useAuthStore } from '../../../lib/store/authStore';
import { newColors } from '../../styles/colors';
import { constants } from '../../styles/constants';
import MiniButton from '../../components/MiniButton';

const ContentDrawer = (props: DrawerContentComponentProps) => {
  const { user, logout, resetPassword } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
      props.navigation.closeDrawer();
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
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Encabezado del drawer */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>
          {user?.name || 'Usuario Invitado'}
        </Text>
        <Text style={styles.userEmail}>
          {user?.email || 'correo@ejemplo.com'}
        </Text>
      </View>

      {/* Lista de ítems del drawer (Profile, Idioma, Acerca de) */}
      <DrawerItemList {...props} />

      {/* Botón de cerrar sesión */}
      <View style={styles.footer}>
        <MiniButton
          icon="refresh-outline"
          text="Restablecer Contraseña"
          onPress={handleResetPassword}
          backgroundColor={newColors.verde_light}
          color={newColors.fondo_principal}
        />
        <MiniButton
          icon="log-out-outline"
          text="Cerrar Sesión"
          onPress={handleLogout}
          backgroundColor={newColors.rojo || '#ff0000'}
          color={newColors.fondo_principal}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: newColors.fondo_principal || '#ffffff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: newColors.fondo_secundario + '33', // Opacidad baja
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Chillax-Extralight',
    color: newColors.fondo_secundario,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    fontFamily: constants.FontText,
    fontWeight: '500',
    color: newColors.fondo_secundario + '99',
    marginTop: 5,
  },
  footer: {
    marginTop: 20,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: newColors.fondo_secundario + '33',
    gap: 10,
  },
  logoutButton: {
    marginTop: 10,
  },
});

export default ContentDrawer;
