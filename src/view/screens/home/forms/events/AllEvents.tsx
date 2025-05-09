import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../../../../navigator/navigationTypes';
import GlobalContainer from '../../../../components/GlobalContainer';
import Header from '../../../../components/Header';


type CreateEventFormRouteProp = RouteProp<RootStackParamList, 'AllEvents'>;

const AllEvents = () => {
  const route = useRoute<CreateEventFormRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { animalId, animalName} = route.params || {};

  return (
    <GlobalContainer>
      <Header title={'Eventos de ' + animalName} iconOnPress="chevron-back-outline" onPress={() => {navigation.goBack();}}  />
    </GlobalContainer>
  );
};

export default AllEvents;
