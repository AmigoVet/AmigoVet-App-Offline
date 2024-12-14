// **Librerías externas**
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { format } from 'date-fns';

// **Interfaces y tipos**
import { RootStackParamList } from '../Welcome';

// **Contexto y estilos**
import useAuthStore from '../../lib/store/authStore';
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors } from '../../assets/styles/colors';
import { createGlobalStyles } from '../../assets/styles/styles';

// **Componentes locales**
import { CustomButton } from '../../components/Customs';
import { getLastThreeRegisters, getRegisteredAnimalsCount, getSpeciesCount } from '../../lib/utils/asyncStorage';

const Profile = () => {
  const { user, loadUser, clearUser } = useAuthStore();
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const GlobalStyles = createGlobalStyles(isDarkTheme);

  const [totalAnimals, setTotalAnimals] = useState<number>(0);
  const [latestRegisters, setLatestRegisters] = useState<any[]>([]);
  const [speciesCount, setSpeciesCount] = useState<Record<string, number>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      const count = await getRegisteredAnimalsCount();
      setTotalAnimals(count);

      const latestRegisters = await getLastThreeRegisters();
      setLatestRegisters(latestRegisters);

      const speciesCount = await getSpeciesCount();
      setSpeciesCount(speciesCount);

      setLoading(false);
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  const closeSession = async () => {
    await clearUser(); // Cerrar sesión
  };
  const styles = dymanycStyles(colors);



  if (loading) {
    return (
      <View style={[GlobalStyles.container, styles.profileContainer]}>
        <ActivityIndicator size="large" color={colors.naranja} />
        <Text style={GlobalStyles.label}>Cargando información...</Text>
      </View>
    );
  }

  return (
    <View style={[GlobalStyles.container, styles.profileContainer]}>
      {user ? (
        <>
          <Image
            source={require('../../assets/img/veterinario.png')}
            style={styles.avatar}
          />
          <Text style={GlobalStyles.title}>{user.nombre}</Text>
          <Text style={GlobalStyles.label}>{user.correo}</Text>
          <Text style={GlobalStyles.label}>{`Teléfono: ${user.telefono}`}</Text>
          <View style={{ width: "100%", height: 0.5, backgroundColor: colors.blanco }} />
          <Text style={[GlobalStyles.subTitle, {fontSize: 22, marginTop: 10}]}>Registros recientes</Text>
          {latestRegisters.length > 0 ? (
            latestRegisters.map((register, index) => (
              <RowRegister 
                key={index} 
                register={register} 
                bgColor={colors.fondo} 
                isLast={index === latestRegisters.length - 1} 
              />
            ))
          ) : (
            <Text style={styles.noSpeciesText}>No hay registros</Text>
          )}

          <Text style={[GlobalStyles.subTitle, {fontSize: 22, marginTop: 10}]}>Cantidad de especies registradas</Text>
          {speciesCount ? (
            Object.entries(speciesCount).map(([species, count]) => (
              <Text key={species} style={styles.speciesItem}>
                De la especie <Text style={{ color: colors.naranja }}>{species}</Text> tienes{' '}
                <Text style={{ color: colors.naranja }}>{count}</Text> animales
              </Text>
            ))
          ) : (
            <Text style={styles.noSpeciesText}>No hay especies registradas</Text>
          )}


          <Text style={[GlobalStyles.subTitle, {fontSize: 22, marginTop: 10}]}>Cantidad de animales registrados</Text>
          <Text style={styles.animalsCount}>Aun puedes registrar <Text style={{ color: colors.naranja }}>{50 -totalAnimals}</Text> animales</Text>

          <View style={{ width: "100%", height: 0.5, backgroundColor: colors.blanco, marginVertical: 10 }} />

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

const RowRegister = ({ register, bgColor, isLast }: { register: any; bgColor: string; isLast: boolean }) => {
  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const styles = dymanycStyles(colors);

  return (
    <View style={[styles.register, { backgroundColor: bgColor }]}>
      <Text style={{ color: colors.blanco, fontSize: 14, marginRight: 10 }}>{register.nombre}</Text>
      <Text style={{ color: colors.naranja, fontSize: 14,marginRight: 10 }}>{format(new Date(register.fecha), 'dd/MM/yyyy')}</Text>
      <Text style={{ color: colors.blanco, fontSize: 14, marginRight: 10 }}>{register.comentario}</Text>
      <Text style={{ color: colors.naranja, fontSize: 14 }}>{register.accion}</Text>
    </View>
  );
};


const dymanycStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
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
  register: {
    flexDirection: 'row',
    marginVertical: 2,
    borderBottomColor: colors.blanco,
    borderBottomWidth: 0.5,
    padding:5,
  },
  speciesItem: {
    fontSize: 16,
    color: colors.blanco,
    textAlign: 'left'
  },
  noSpeciesText: {
    fontSize: 14,
    color: colors.rojo,
  },
  animalsCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blanco,
    marginVertical: 10,
  },
  speciesCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.naranja,
    marginVertical: 10,
  },
});

export default Profile;
