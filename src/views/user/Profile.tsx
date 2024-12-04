import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import useAuthStore from '../../assets/store/authStore';
import { GlobalStyles } from '../../assets/styles';
import { CustomButton } from '../../assets/components';

const Profile = () => {
  const { user, loadUser, clearUser } = useAuthStore();

  useEffect(() => {
    loadUser(); // Cargar usuario desde AsyncStorage al montar el componente
  }, []);

  const closeSession = async () => {
    await clearUser(); // Cerrar sesión
  };

  return (
    <View style={[GlobalStyles.container, styles.profileContainer]}>
      {user ? (
        <>
          <Image
            source={{
              uri: 'https://i.pravatar.cc/300', // Puedes cambiar por un avatar dinámico
            }}
            style={styles.avatar}
          />
            <Text style={GlobalStyles.title}>{user.nombre}</Text>
            <Text style={GlobalStyles.subTitle}>{user.correo}</Text>
            <Text style={GlobalStyles.subTitle}>{`Teléfono: ${user.telefono}`}</Text>
            <View style={{height: 200}} />
            <CustomButton 
              text="Cerrar sesión" 
              onPress={closeSession}
              red
            />
        </>
      ) : (
        <Text style={styles.noUserText}>No hay información del usuario</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  noUserText: {
    fontSize: 18,
    color: '#999',
  },
});

export default Profile;
