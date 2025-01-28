import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthStore from '../../lib/store/authStore';

// Importa tus pantallas
import Login from '../../views/auth/Login';
import Welcome from '../../views/Welcome';
import Register from '../../views/auth/Register';
import Home from '../../views/user/Home';
import New from '../../views/user/New';
import Profile from '../../views/user/Profile';
import AnimalView from '../../views/user/AnimalView';
import Busqueda from '../../views/user/Busqueda';
import ChangePasswordScreen from '../../views/user/ChangePassword';
import Embarazadas from '../../views/search/Embarazadas';
import Hembras from '../../views/search/Hembras';
import Machos from '../../views/search/Machos';
import Jovenes from '../../views/search/Jovenes';
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors, staticColors, newColors } from '../../assets/styles/colors';
import { CustomIcon } from '../../components/Customs';
import HeaderDrawer from '../../components/Navigations/HeaderDrawer';
import { DrawerContent } from '../../components/Navigations/DrawerContent';
import HomePublic from '../../views/public/HomePublic';
import Feed from '../../views/user/Feed';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreenWithDrawerNavigator = () => {
  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);

  return (
    <Drawer.Navigator
      initialRouteName="Principal"
      screenOptions={{
        header: () => <HeaderDrawer />,
        drawerActiveTintColor: colors.verde, 
        drawerInactiveTintColor: colors.blanco, 
        drawerStyle: {
          backgroundColor: colors.fondoDark, 
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Principal"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <CustomIcon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Animales Preñados"
        component={Embarazadas}
        options={{
          drawerIcon: ({ color, size }) => (
            <CustomIcon name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Hembras"
        component={Hembras}
        options={{
          drawerIcon: ({ color, size }) => (
            <CustomIcon name="female-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Machos"
        component={Machos}
        options={{
          drawerIcon: ({ color, size }) => (
            <CustomIcon name="male-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Animales menores a 2 años"
        component={Jovenes}
        options={{
          drawerIcon: ({ color, size }) => (
            <CustomIcon name="paw-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};


// Configuración del navegador de tabs
const BottomTabsNavigator = () => {
  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Privado') {
            iconName = 'archive-outline';
          } else if (route.name === 'Perfil') {
            iconName = 'person-outline';
          } else if (route.name === 'Agregar') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'Publico') {
            iconName = 'storefront-outline';
          } else if (route.name === 'Inicio') {
            iconName = 'home-outline';
          } else {
            iconName = 'alert-circle-outline';
          }

          return (
              <CustomIcon name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: colors.verdeLight,
        tabBarInactiveTintColor: newColors.principal,
        tabBarStyle: {
          backgroundColor: newColors.fondo_secundario,
          height: 65,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Feed} />
      <Tab.Screen name="Privado" component={HomeScreenWithDrawerNavigator} />
      <Tab.Screen name="Agregar" component={New} />
      <Tab.Screen name="Publico" component={HomePublic} />
      <Tab.Screen name="Perfil" component={Profile} />
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
