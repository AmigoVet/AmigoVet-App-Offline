import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import { getDynamicColors } from "../../assets/styles/colors";
import { CustomIcon } from "../../components/Customs";
import { HeaderDrawer } from "../../components/Navigations";
import Embarazadas from "../../views/search/Embarazadas";
import Hembras from "../../views/search/Hembras";
import Jovenes from "../../views/search/Jovenes";
import Machos from "../../views/search/Machos";
import Home from "../../views/user/Home";
import { useTheme } from "../context/ThemeContext";


const Drawer = createDrawerNavigator();

export const HomeScreenWithDrawerNavigator = () => {
  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);

  return (
    <Drawer.Navigator
      initialRouteName="Principal"
      screenOptions={{
        header: () => <HeaderDrawer />,
        drawerActiveTintColor: colors.verde, 
        drawerInactiveTintColor: colors.blanco, 
        drawerStyle: {
          backgroundColor: colors.fondoDark, 
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