import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '../../../../lib/store/authStore';
import GlobalContainer from '../../../components/GlobalContainer';
import { newColors } from '../../../styles/colors';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../navigator/navigationTypes';
import { constant } from 'lodash';
import { constants } from '../../../styles/constants';

type ProfileScreenNavigationProp = DrawerNavigationProp<DrawerParamList>;

const Profile = () => {
  const { user } = useAuthStore();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <GlobalContainer>
      <Header title="Perfil" onPress={() => navigation.toggleDrawer()} iconOnPress="menu-outline" />
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
    fontFamily: constants.FontTitle,
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
    fontFamily: constants.FontTitle,
    color: newColors.fondo_secundario,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontFamily: constants.FontText,
    color: newColors.fondo_secundario,
    marginBottom: 5,
  },
  noUserText: {
    fontSize: 16,
    fontFamily: constants.FontText,
    color: newColors.rojo || '#ff0000',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Profile;
