import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { useAuthStore } from '../../lib/store/authStore';
import AnimalView from '../screens/home/animalView/AnimalView';
import Busqueda from '../screens/home/busqueda/Busqueda';
import Calendar from '../screens/home/calendar/Calendar';
import Update from '../screens/home/update/Update';
import GptChat from '../screens/home/gptChat/GptChat';
import AllChats from '../screens/home/allChats/AllChats';
import CreateEventForm from '../screens/home/forms/events/CreateEventForm';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { user, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="MainApp" component={MainTabs} />
          <Stack.Screen name="AnimalView" component={AnimalView} />
          <Stack.Screen name="Busqueda" component={Busqueda} />
          <Stack.Screen name="Calendar" component={Calendar} />
          <Stack.Screen name="Update" component={Update} />
          <Stack.Screen name="GptChat" component={GptChat} />
          <Stack.Screen name="AllChats" component={AllChats} />
          <Stack.Screen name="CreateEventForm" component={CreateEventForm} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
