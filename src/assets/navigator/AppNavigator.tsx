import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Configuración del navegador de tabs
const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: string; // Aseguramos que iconName sea siempre string
      
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          } else if (route.name === 'New') {
            iconName = 'add-circle-outline';
          } else {
            iconName = 'alert-circle-outline'; // Valor por defecto para evitar undefined
          }
      
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    
    >
      <Tab.Screen name="Home" component={Home} />
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
        // Muestra las tabs si el usuario está autenticado
        <Stack.Screen name="BottomTabs" component={BottomTabsNavigator} />
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
