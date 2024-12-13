import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../views/user/Home';
import Profile from '../../views/user/Profile';
import New from '../../views/user/New';
import { colors } from '../styles';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, // Header personalizado con el componente `Header`
        drawerStyle: {
          backgroundColor: colors.fondoDark,
        },
        drawerActiveTintColor: colors.naranja,
        drawerInactiveTintColor: colors.blanco,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="New" component={New} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
