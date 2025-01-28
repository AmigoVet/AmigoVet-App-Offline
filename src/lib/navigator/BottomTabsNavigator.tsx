import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getDynamicColors, newColors } from "../../assets/styles/colors";
import { CustomIcon } from "../../components/Customs";
import HomePublic from "../../views/public/HomePublic";
import Feed from "../../views/user/Feed";
import New from "../../views/user/New";
import Profile from "../../views/user/Profile";
import { useTheme } from "../context/ThemeContext";
import { HomeScreenWithDrawerNavigator } from "./DrawerNavigator";
import CustomButtonTab from "./CustomButtonTab";

const Tab = createBottomTabNavigator();


export const BottomTabsNavigator = () => {
  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);

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

          return <CustomIcon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: colors.verdeLight,
        tabBarInactiveTintColor: newColors.principal,
        tabBarStyle: {
          backgroundColor: 'transparent',
          height: 65,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderTopWidth: 0,
          position: 'absolute', 
          left: 0,
          right: 0,
          bottom: 0,
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