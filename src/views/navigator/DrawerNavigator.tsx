  import { createDrawerNavigator } from "@react-navigation/drawer";
  import {newColors } from "../../assets/styles/colors";
  import { CustomIcon } from "../../components/Customs";
  import Home from "../user/Home";
  import { HeaderDrawer } from "./components";
  import Apoyanos from "../info/Apoyanos";
  import Contacto from "../info/Contacto";
  import Conocenos from "../info/Conocenos";
import { DrawerContent } from "./components/DrawerContent";


  const Drawer = createDrawerNavigator();

  export const HomeScreenWithDrawerNavigator = () => {

    return (
      <Drawer.Navigator
        initialRouteName="Principal"
        screenOptions={{
          header: () => <HeaderDrawer />,
          drawerActiveTintColor: newColors.verde, 
          drawerInactiveTintColor: newColors.fondo_secundario, 
          drawerStyle: {
            backgroundColor: newColors.fondo_principal, 
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
          name="Apoyanos"
          component={Apoyanos}
          options={{
            drawerIcon: ({ color, size }) => (
              <CustomIcon name="heart-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Contacto"
          component={Contacto}
          options={{
            drawerIcon: ({ color, size }) => (
              <CustomIcon name="call-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Conocenos"
          component={Conocenos}
          options={{
            drawerIcon: ({ color, size }) => (
              <CustomIcon name="accessibility-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  };