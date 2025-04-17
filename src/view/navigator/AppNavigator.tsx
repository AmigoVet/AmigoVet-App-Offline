import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { useAuthStore } from '../../lib/store/authStore';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="MainApp" component={MainTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;