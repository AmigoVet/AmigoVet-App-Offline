import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import React, { useEffect } from 'react';
import useAuthStore from '../../lib/store/authStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/interfaces/navigate';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

interface ProfileProps {
  navigation: ProfileScreenNavigationProp;
}

const Profile: React.FC<ProfileProps> = () => {
  const { user, loadUser, clearUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogout = async (): Promise<void> => {
    try {
      await clearUser();
      Alert.alert('Éxito', 'Sesión cerrada correctamente');
      // No necesitas navigation.replace ni navigation.reset aquí
      // El cambio en user a null en AppNavigator manejará la navegación
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar la sesión');
      console.error(error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.noUser}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>
          Nombre: <Text style={styles.value}>{user.nombre}</Text>
        </Text>
        <Text style={styles.label}>
          Correo: <Text style={styles.value}>{user.correo}</Text>
        </Text>
        <Text style={styles.label}>
          Teléfono: <Text style={styles.value}>{user.telefono}</Text>
        </Text>
        <Text style={styles.label}>
          ID de usuario: <Text style={styles.value}>{user.userId}</Text>
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cerrar Sesión" onPress={handleLogout} color="#ff4444" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  profileInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  value: {
    fontWeight: 'bold',
    color: '#333',
  },
  noUser: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default Profile;