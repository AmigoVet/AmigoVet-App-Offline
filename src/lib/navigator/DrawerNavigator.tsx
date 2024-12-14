import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../views/user/Home';
import Profile from '../../views/user/Profile';
import New from '../../views/user/New';
import { staticColors } from '../../assets/styles/colors';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, 
        drawerStyle: {
          backgroundColor: staticColors.negroDark,
        },
        drawerActiveTintColor: staticColors.naranja,
        drawerInactiveTintColor: staticColors.blanco,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="New" component={New} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
