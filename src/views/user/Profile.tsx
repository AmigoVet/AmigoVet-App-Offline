import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
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
import { formatPhoneNumber } from '../../lib/functions/FormaterNumberPhone';

const Profile = () => {
  const { user, loadUser, clearUser } = useAuthStore();
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = Dimensions.get('window');

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
      const count = await getRegisteredAnimalsCount(user!.userId);
      setTotalAnimals(count);

      const latestRegisters = await getLastThreeRegisters(user!.userId);
      setLatestRegisters(latestRegisters);

      const speciesCount = await getSpeciesCount(user!.userId);
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

  const styles = dynamicStyles(colors, width);

  if (loading) {
    return (
      <View style={[GlobalStyles.container, styles.profileContainer]}>
        <ActivityIndicator size="large" color={colors.naranja} />
        <Text style={GlobalStyles.label}>Cargando información...</Text>
      </View>
    );
  }

  const fontSubTitle = width * 0.055;

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      {user ? (
        <View style={styles.profileContainer}>
          {/* Bloque de perfil del usuario */}
          <View style={styles.glassBlock}>
            <Image
              source={require('../../assets/img/veterinario.png')}
              style={styles.avatar}
            />
            <Text style={GlobalStyles.title}>{user.nombre}</Text>
            <View style={styles.basicInfoContainer}>
              <Text style={[GlobalStyles.label, { fontSize: width * 0.04 }]}>{user.correo}</Text>
              <Text style={[GlobalStyles.label, { fontSize: width * 0.04 }]}>{`+57 ${formatPhoneNumber(user.telefono)}`}</Text>
            </View>
          </View>

          {/* Bloque de registros recientes */}
          <View style={styles.glassBlock}>
            <Text style={[GlobalStyles.subTitle, { fontSize: fontSubTitle }]}>Registros recientes</Text>
            <ScrollView horizontal>
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderText, { width: 100 }]}>Nombre</Text>
                  <Text style={[styles.tableHeaderText, { width: 100 }]}>Fecha</Text>
                  <Text style={[styles.tableHeaderText, { width: 100 }]}>Acción</Text>
                  <Text style={[styles.tableHeaderText, { width: 150 }]}>Comentario</Text>
                </View>
                {latestRegisters.length > 0 ? (
                  latestRegisters.map((register, index) => (
                    <View
                      key={index}
                      style={[
                        styles.tableRow,
                        index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                      ]}
                    >
                      <Text style={[styles.tableRowText, { width: 100 }]}>{register.nombre}</Text>
                      <Text style={[styles.tableRowText, { width: 100 }]}>{format(new Date(register.fecha), 'dd/MM/yyyy')}</Text>
                      <Text style={[styles.tableRowText, { width: 100 }]}>{register.accion}</Text>
                      <Text style={[styles.tableRowText, { width: 150 }]}>{register.comentario}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noSpeciesText}>No hay registros</Text>
                )}
              </View>
            </ScrollView>
          </View>

          {/* Bloque de cantidad de especies */}
          <View style={styles.glassBlock}>
            <Text style={[GlobalStyles.subTitle, { fontSize: fontSubTitle }]}>Cantidad de especies registradas</Text>
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
          </View>

          {/* Bloque de cantidad de animales */}
          <View style={styles.glassBlock}>
            <Text style={[GlobalStyles.subTitle, { fontSize: fontSubTitle }]}>Cantidad de animales registrados</Text>
            <Text style={styles.animalsCount}>Aun puedes registrar <Text style={{ color: colors.naranja }}>{30 - totalAnimals}</Text> animales</Text>
          </View>

          {/* Botones de acción */}
          <CustomButton text="Cambiar Contraseña" onPress={() => navigate('ChangePassword')} />
          <CustomButton text="Cerrar sesión" onPress={closeSession} red />
        </View>
      ) : (
        <Text style={GlobalStyles.error}>No hay información del usuario</Text>
      )}
    </ScrollView>
  );
};

const dynamicStyles = (colors: ReturnType<typeof getDynamicColors>, width: number) =>
  StyleSheet.create({
    profileContainer: {
      padding: 0,
    },
    container: {
      flexGrow: 1,
      backgroundColor: colors.fondo,
      padding: 10,
    },
    glassBlock: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 15,
      padding: 15,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 8,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      width: '100%',
    },
    speciesItem: {
      fontSize: 16,
      color: colors.blanco,
      textAlign: 'left'
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      borderColor: colors.naranja,
      borderWidth: 1,
      alignSelf: 'center',
    },
    basicInfoContainer: {
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    tableContainer: {
      marginTop: 10,
      padding: 5,
    },
    tableHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.naranja,
      paddingBottom: 5,
    },
    tableHeaderText: {
      color: colors.blanco,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 5,
    },
    tableRowText: {
      color: colors.blanco,
      textAlign: 'center',
    },
    tableRowEven: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    tableRowOdd: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
  });

export default Profile;
