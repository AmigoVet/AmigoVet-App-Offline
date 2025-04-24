import { View, Text } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigator/navigationTypes';

type AnimalViewRouteProp = RouteProp<RootStackParamList, 'AnimalView'>;

const AnimalView = () => {
  const route = useRoute<AnimalViewRouteProp>();
  const { animalId } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Animal Details for ID: {animalId}</Text>
    </View>
  );
};

export default AnimalView