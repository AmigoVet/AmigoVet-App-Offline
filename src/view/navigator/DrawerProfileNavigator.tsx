import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/home/home/Home';
import Profile from '../screens/home/profile/Profile';

const Drawer = createDrawerNavigator();

export function DrawerProfileNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
