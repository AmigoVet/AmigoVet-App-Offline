import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { newColors } from '../styles/colors'; // Asegúrate de que la ruta sea correcta
import { MainTabsParamList } from './navigationTypes';

// Importar pantallas
import New from '../screens/home/new/New';
import Profile from '../screens/home/profile/Profile';
import CustomButtonTab from './components/CustomButtonTab';
import Icon from '@react-native-vector-icons/ionicons';
import Home from '../screens/home/home/Home';
import Feed from '../screens/home/feed/Feed';
import Local from '../screens/home/local/Local';
import { Platform } from 'react-native';
import { DrawerProfileNavigator } from './DrawerProfileNavigator';

const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          let iconName : any;

          if (route.name === 'Local') {
            iconName = 'archive-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          } else if (route.name === 'New') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'Feed') {
            iconName = 'storefront-outline';
          } else if (route.name === 'Home') {
            iconName = 'home-outline';
          } else {
            iconName = 'alert-circle-outline';
          }
          return <Icon name={iconName} size={26} color={color} />;
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: newColors.fondo_secundario,
        tabBarInactiveTintColor: newColors.principal,
        tabBarStyle: {
          backgroundColor: 'transparent',
          height: Platform.OS === 'ios' ? 65 : 65, // Mantener la altura consistente
          borderTopWidth: 0,
          position: 'absolute',
          elevation: 0,
          shadowOpacity: 0,
          // Para iOS, ajustar el padding si es necesario
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarButton: (props) => <CustomButtonTab route="Inicio" {...props} />,
        }}
      />
      <Tab.Screen
        name="Local"
        component={Local}
        options={{
          tabBarButton: (props) => <CustomButtonTab route="Local" {...props} />,
        }}
      />
      <Tab.Screen
        name="New"
        component={New}
        options={{
          tabBarButton: (props) => <CustomButtonTab route="Agregar" {...props} />,
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarButton: (props) => <CustomButtonTab route="Web" {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={DrawerProfileNavigator}
        options={{
          tabBarButton: (props) => <CustomButtonTab route="Perfil" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;