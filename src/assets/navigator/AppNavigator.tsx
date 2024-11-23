import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../views/auth/Login';
import Welcome from '../../views/Welcome';
import Register from '../../views/auth/Register';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false,
        }}
        initialRouteName="Welcome" 
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
