import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useAuthStore from '../../assets/store/authStore';
import { GlobalStyles } from '../../assets/styles';
import Header from '../../assets/components/Header';

const Home = () => {
  const user = useAuthStore((state) => state.user); // Obtiene el usuario desde el estado global
  const clearUser = useAuthStore((state) => state.clearUser); // Función para limpiar el usuario

  const handleLogout = () => {
    clearUser(); // Limpia el usuario del estado global
    console.log('Sesión cerrada');
  };

  return (
    <>
    <Header />
    <View style={GlobalStyles.container}>
      <View style={styles.HomeContainer}>

      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    width: '100%',
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
