import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getDynamicColors, newColors } from "../../assets/styles/colors";
import { CustomIcon } from "../../components/Customs";
import HomePublic from "../public/HomePublic";
import Feed from "../user/feed/Feed";
import New from "../user/New";
import Profile from "../user/Profile";
import CustomButtonTab from "./CustomButtonTab";
import { HomeScreenWithDrawerNavigator } from "./DrawerNavigator";

const Tab = createBottomTabNavigator();


export const BottomTabsNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
        
          if (route.name === 'Privado') {
            iconName = 'archive-outline';
          } else if (route.name === 'Perfil') {
            iconName = 'person-outline';
          } else if (route.name === 'Agregar') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'Publico') {
            iconName = 'storefront-outline';
          } else if (route.name === 'Inicio') {
            iconName = 'home-outline';
          } else {
            iconName = 'alert-circle-outline';
          }
          return <CustomIcon name={iconName} size={26} color={color} />;
        },
        
        tabBarLabel: () => null,
        tabBarActiveTintColor: newColors.fondo_secundario,
        tabBarInactiveTintColor: newColors.principal,
        tabBarStyle: {
          backgroundColor: 'transparent',
          height: 65,
          borderTopWidth: 0,
          position: 'absolute', 
          elevation: 0,
        },
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={Feed}
        options={{
          tabBarButton: props => <CustomButtonTab route="Inicio" {...props} />,
        }}
      />
      <Tab.Screen
        name="Privado"
        component={HomeScreenWithDrawerNavigator}
        options={{
          tabBarButton: props => <CustomButtonTab route="Privado" {...props} />,
        }}
      />
      <Tab.Screen
        name="Agregar"
        component={New}
        options={{
          tabBarButton: props => <CustomButtonTab route="Agregar" {...props} />,
        }}
      />
      <Tab.Screen
        name="Publico"
        component={HomePublic}
        options={{
          tabBarButton: props => <CustomButtonTab route="Publico" {...props} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarButton: props => <CustomButtonTab route="Perfil" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};