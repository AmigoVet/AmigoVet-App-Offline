import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack'; // Cambia a StackNavigator
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthStore from '../../lib/store/authStore';
import { CardStyleInterpolators } from '@react-navigation/stack';

// Importa tus pantallas
import Login from '../auth/Login';
import Welcome from '../Welcome';
import Register from '../auth/Register';
import Busqueda from '../user/Busqueda';
import ChangePasswordScreen from '../user/ChangePassword';
import New from '../user/New';
import AnimalView from '../user/AnimalView/AnimalView';
import Calendar from '../calendar/Calendar';
import { BottomTabsNavigator } from './BottomTabsNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error al cargar el usuario desde AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [setUser]);

  if (loading) {
    return null;
  }

  // Animación personalizada según la posición
  const forSlide = ({ current, next, layouts }: any) => {
    const progress = current.progress;

    return {
      cardStyle: {
        transform: [
          {
            translateX: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0], // Desliza desde la derecha
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5], // Fundido del overlay
        }),
      },
    };
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: forSlide, // Usa la animación personalizada
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 300 } },
          close: { animation: 'timing', config: { duration: 300 } },
        },
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="BottomTabs" component={BottomTabsNavigator} />
          <Stack.Screen name="AnimalView" component={AnimalView} />
          <Stack.Screen name="Busqueda" component={Busqueda} />
          <Stack.Screen name="Nuevo" component={New} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="Calendar" component={Calendar} />
        </>
      ) : (
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