import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import { getDynamicColors, newColors } from "../../assets/styles/colors";
import { CustomIcon } from "../../components/Customs";
import Embarazadas from "../search/Embarazadas";
import Hembras from "../search/Hembras";
import Jovenes from "../search/Jovenes";
import Machos from "../search/Machos";
import Home from "../user/Home";
import { HeaderDrawer } from "./components";


const Drawer = createDrawerNavigator();

export const HomeScreenWithDrawerNavigator = () => {

  return (
    <Drawer.Navigator
      initialRouteName="Principal"
      screenOptions={{
        header: () => <HeaderDrawer />,
        drawerActiveTintColor: newColors.verde, 
        drawerInactiveTintColor: newColors.fondo_principal, 
        drawerStyle: {
          backgroundColor: newColors.fondo_secundario, 
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Principal"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <CustomIcon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Animales Preñados"
        component={Embarazadas}
        options={{
          drawerIcon: ({ color, size }) => (
            <CustomIcon name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Hembras"
        component={Hembras}
        options={{
          drawerIcon: ({ color, size }) => (
            <CustomIcon name="female-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Machos"
        component={Machos}
        options={{
          drawerIcon: ({ color, size }) => (
            <CustomIcon name="male-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Animales menores a 2 años"
        component={Jovenes}
        options={{
          drawerIcon: ({ color, size }) => (
            <CustomIcon name="paw-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};