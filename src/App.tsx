import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import useAuthStore from './lib/store/authStore';
import { ThemeProvider } from './lib/context/ThemeContext';
import AppNavigator from './lib/navigator/AppNavigator';

const App = () => {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeProvider>
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