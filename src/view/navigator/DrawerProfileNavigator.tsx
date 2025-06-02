import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screens/home/profile/Profile';
import Lenguaje from '../screens/settings/lenguaje/Lenguaje';
import About from '../screens/settings/about/About';
import { newColors } from '../styles/colors';
import ContentDrawer from './components/ContentDrawer';
import { constants } from '../styles/constants';

const Drawer = createDrawerNavigator();

export function DrawerProfileNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <ContentDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 300,
        },
        drawerActiveTintColor: newColors.verde_light,
        drawerInactiveTintColor: newColors.fondo_secundario,
        drawerLabelStyle: {
          fontFamily: constants.FontTitle,
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen name="Perfil" component={Profile} />
      <Drawer.Screen name="Idioma" component={Lenguaje} />
      <Drawer.Screen name="Acerca de" component={About} />
    </Drawer.Navigator>
  );
}
