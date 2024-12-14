// **Librerías externas**
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// **Interfaces y tipos**
import { RootStackParamList } from '../Welcome';

// **Contexto y estilos**
import useAuthStore from '../../lib/store/authStore';
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors } from '../../assets/styles/colors';
import { createGlobalStyles } from '../../assets/styles/styles';

// **Componentes locales**
import { CustomButton } from '../../components/Customs';


const Profile = () => {
  const { user, loadUser, clearUser } = useAuthStore();
  const {navigate} = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { isDarkTheme } = useTheme();
    const colors = getDynamicColors(isDarkTheme);
    const GlobalStyles = createGlobalStyles(isDarkTheme);

  useEffect(() => {
    loadUser(); // Cargar usuario desde AsyncStorage al montar el componente
  }, []);

  const closeSession = async () => {
    await clearUser(); // Cerrar sesión
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
      borderColor: colors.naranja,
      borderWidth: 1,
    },
    noUserText: {
      fontSize: 18,
      color: '#999',
    },
  });

  return (
    <View style={[GlobalStyles.container, styles.profileContainer]}>
      {user ? (
        <>
          <Image
            source={require('../../assets/img/veterinario.png')}
            style={styles.avatar}
          />
            <Text style={GlobalStyles.title}>{user.nombre}</Text>
            <Text style={GlobalStyles.subTitle}>{user.correo}</Text>
            <Text style={GlobalStyles.subTitle}>{`Teléfono: ${user.telefono}`}</Text>
            <View style={{height: 200}} />
            <CustomButton 
              text="Cambiar Contraseña"
              onPress={() => navigate('ChangePassword')}
            />
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



export default Profile;
