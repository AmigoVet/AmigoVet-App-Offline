import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { useAuthStore } from '../../lib/store/authStore';
import AnimalView from '../screens/home/animalView/AnimalView';
import Busqueda from '../screens/home/busqueda/Busqueda';
import Calendar from '../screens/home/calendar/Calendar';
import Update from '../screens/home/update/Update';
import GptChat from '../screens/home/gptChat/GptChat';
import AllChats from '../screens/home/allChats/AllChats';
import CreateEventForm from '../screens/home/forms/events/CreateEventForm';
import CreateRegisterForm from '../screens/home/forms/registers/CreateRegisterForm';
import AllEvents from '../screens/home/forms/events/AllEvents';
import AllNotes from '../screens/home/forms/notes/AllNotes';
import AllRegisters from '../screens/home/forms/registers/AllRegisters';
import CalculateAppropriateWeight from '../screens/tools/calculateAppropriateWeight/CalculateAppropriateWeight';
import CalculateFoodPerDay from '../screens/tools/calculateFoodPerDay/CalculateFoodPerDay';
import CalculatePurgativeDose from '../screens/tools/calculatePurgativeDose/CalculatePurgativeDose';
import Loading from '../screens/settings/loading/Loading';
import AddImage from '../screens/home/forms/images/AddImage';
import ViewImages from '../screens/home/forms/images/ViewImages';
import AddWeight from '../screens/home/forms/weights/AddWeight';
import ViewWeights from '../screens/home/forms/weights/ViewWeights';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { user, loading, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {loading ? (
        <Stack.Screen name="Loading" component={Loading} />
      ) : user ? (
        <>
          <Stack.Screen name="MainApp" component={MainTabs} />
          <Stack.Screen name="AnimalView" component={AnimalView} />
          <Stack.Screen name="Busqueda" component={Busqueda} />
          <Stack.Screen name="Calendar" component={Calendar} />
          <Stack.Screen name="Update" component={Update} />
          <Stack.Screen name="GptChat" component={GptChat} />
          <Stack.Screen name="AllChats" component={AllChats} />
          <Stack.Screen name="CreateEventForm" component={CreateEventForm} />
          <Stack.Screen name="CreateRegisterForm" component={CreateRegisterForm} />
          <Stack.Screen name="AllEvents" component={AllEvents} />
          <Stack.Screen name="AllRegisters" component={AllRegisters} />
          <Stack.Screen name="AllNotes" component={AllNotes} />
          <Stack.Screen name="CalculateAppropriateWeight" component={CalculateAppropriateWeight} />
          <Stack.Screen name="CalculateFoodPerDay" component={CalculateFoodPerDay} />
          <Stack.Screen name="CalculatePurgativeDose" component={CalculatePurgativeDose} />
          <Stack.Screen name="AddImage" component={AddImage} />
          <Stack.Screen name="ViewImages" component={ViewImages} />
          <Stack.Screen name="AddWeight" component={AddWeight} />
          <Stack.Screen name="ViewWeights" component={ViewWeights} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
