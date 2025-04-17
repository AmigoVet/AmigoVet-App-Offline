// MainTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabsParamList } from './navigationTypes';

// Importar pantallas principales
import Home from '../screens/home/Home';
import New from '../screens/home/new/New';
import Profile from '../screens/home/profile/Profile';
import CustomButtonTab from './components/CustomButtonTab';

// Importar componentes para las pestañas

const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 60,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarButton: (props) => <CustomButtonTab route="Home" {...props} />,
        }}
      />
      <Tab.Screen
        name="New"
        component={New}
        options={{
          tabBarButton: (props) => <CustomButtonTab route="New" {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarButton: (props) => <CustomButtonTab route="Profile" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;