import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useAuthStore from '../../assets/store/authStore';

const Home = () => {
  const user = useAuthStore((state) => state.user); // Obtiene el usuario desde el estado global
  const clearUser = useAuthStore((state) => state.clearUser); // Función para limpiar el usuario

  const handleLogout = () => {
    clearUser(); // Limpia el usuario del estado global
    console.log('Sesión cerrada');
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.welcomeText}>Bienvenido, {user.nombre}</Text>
          <Text style={styles.detailText}>Correo: {user.correo}</Text>
          <Text style={styles.detailText}>Teléfono: {user.telefono}</Text>
          <Button title="Cerrar sesión" onPress={handleLogout} />
        </>
      ) : (
        <Text style={styles.noUserText}>No hay usuario autenticado</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  noUserText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Home;
