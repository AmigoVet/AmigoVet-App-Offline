import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAuthStore from '../store/authStore';

// Importa tus pantallas
import Login from '../../views/auth/Login';
import Welcome from '../../views/Welcome';
import Register from '../../views/auth/Register';
import Home from '../../views/user/Home';
import New from '../../views/user/New';
import Profile from '../../views/user/Profile';
import { colors } from '../styles';
import { Text, View } from 'react-native';
import AnimalView from '../../views/user/AnimalView';
import Busqueda from '../../views/user/Busqueda';
import ChangePasswordScreen from '../../views/user/ChangePassword';
import HeaderDrawer from '../components/HeaderDrawer';
import CustomIcon from '../components/CustomIcon';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreenWithDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        header: (props) => <HeaderDrawer />, 
      }}
    >
      <Drawer.Screen name="HomeScreen" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="New" component={New} />
    </Drawer.Navigator>
  );
};

// Configuración del navegador de tabs
const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size, focused }) => {
        let iconName: string;
    
        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
        } else if (route.name === 'New') {
          iconName = 'add-circle-outline';
        } else {
          iconName = 'alert-circle-outline';
        }
    
        return (
          <View style={{ alignItems: 'center' }}>
            <CustomIcon name={iconName} size={size} color={color} />
            {focused && (
              <View
                style={{
                  width: '60%', // Ajusta el ancho del borde
                  height: 3,
                  backgroundColor: colors.naranja,
                  borderRadius: 2,
                  marginTop: 5,
                }}
              />
            )}
          </View>
        );
      },
      tabBarActiveTintColor: colors.naranja,
      tabBarInactiveTintColor: colors.blanco,
      tabBarStyle: {
        backgroundColor: colors.fondoDark,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        height: 60,
        borderTopWidth: 0,
      },
    })}
    
    
    >
      <Tab.Screen name="Home" component={HomeScreenWithDrawerNavigator} />
      <Tab.Screen name="New" component={New} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

// Navegador principal
const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Carga el usuario al estado global
        }
      } catch (error) {
        console.error('Error al cargar el usuario desde AsyncStorage:', error);
      } finally {
        setLoading(false); // Oculta el estado de carga
      }
    };

    checkUser();
  }, [setUser]);

  if (loading) {
    return null; // Puedes agregar un indicador de carga aquí
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="BottomTabs" component={BottomTabsNavigator} />
          <Stack.Screen name="AnimalView" component={AnimalView} />
          <Stack.Screen name="Busqueda" component={Busqueda} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          </>
      ) : (
        // Muestra las pantallas de autenticación si no está autenticado
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
