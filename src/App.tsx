import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import useAuthStore from './lib/store/authStore';
import AppNavigator from './views/navigator/AppNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LogBox } from 'react-native'; 

const queryClient = new QueryClient();

const App = () => {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); 
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
    </QueryClientProvider>
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