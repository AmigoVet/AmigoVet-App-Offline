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
import { View } from 'react-native';
import AnimalView from '../../views/user/AnimalView';
import Busqueda from '../../views/user/Busqueda';
import ChangePasswordScreen from '../../views/user/ChangePassword';
import Embarazadas from '../../views/search/Embarazadas';
import Hembras from '../../views/search/Hembras';
import Machos from '../../views/search/Machos';
import Jovenes from '../../views/search/Jovenes';
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors, staticColors } from '../../assets/styles/colors';
import { CustomIcon } from '../../components/Customs';
import HeaderDrawer from '../../components/Navigations/HeaderDrawer';
import { DrawerContent } from '../../components/Navigations/DrawerContent';

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
        drawerActiveTintColor: colors.naranja, 
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
                    width: '60%',
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
        tabBarInactiveTintColor: staticColors.blancoLight,
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
