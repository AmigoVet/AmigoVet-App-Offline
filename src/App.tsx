import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './assets/navigator/AppNavigator';
import useAuthStore from './assets/store/authStore';

const App = () => {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser(); 
  }, [loadUser]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
/*
    AmigoVet © 2024 by Devora Inco y Juan José Mera Barrera
    Este código está protegido bajo la AmigoVet License.
    Uso comercial no autorizado sin consentimiento previo.
*/
/*
██████╗ ███████╗██╗   ██╗ ██████╗ ██████╗  █████╗     ██╗ ███╗   ██╗ ██████╗ 
██╔══██╗██╔════╝██║   ██║██╔═══██╗██╔══██╗██╔══██╗    ██║ ████╗  ██║██╔═══██╗
██║  ██║█████╗  ██║   ██║██║   ██║██████╔╝███████║    ██║ ██╔██╗ ██║██║   
██║  ██║██╔══╝  ╚██╗ ██╔╝██║   ██║██║█║═╝ ██╔══██║    ██║ ██║╚██╗██║██║   ██║
██████╔╝███████╗ ╚████╔╝ ╚██████╔╝██║ ██║ ██║  ██║    ██║ ██║ ╚████║╚██████╔╝
╚═════╝ ╚══════╝  ╚═══╝   ╚═════╝ ╚═╝ ╚═╝ ╚═╝  ╚═╝    ╚═╝ ╚═╝  ╚═══╝ ╚═════╝ 

*/