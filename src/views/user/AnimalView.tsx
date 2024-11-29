import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { GlobalStyles } from '../../assets/styles';
import { useRoute, RouteProp } from '@react-navigation/native';
import useAnimals from '../../assets/hooks/useAnimals';
import { RootStackParamList } from '../Welcome';
import { AnimalTable, CustomImage, CustomInput } from '../../assets/components';

const AnimalView = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'AnimalView'>>();
  const { id } = route.params;
  const { animal, isLoading, error } = useAnimals(id);



  if (isLoading) {
    return (
      <View style={GlobalStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando información del animal...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={GlobalStyles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={[GlobalStyles.container, {paddingTop: 0}]}>
      <CustomImage 
          source={animal!.image}
          full
      />
      
      <View style={styles.titleContainer}>
        <Text style={[GlobalStyles.title]}>{animal?.name}<Text style={[GlobalStyles.miniText]}>({animal?.id})</Text></Text>
        <Text style={[GlobalStyles.subTitle]}>{animal?.species}</Text>
      </View>

      <CustomInput 
        label="Descripción"
        placeholder='Escribe una descripción'
        value={animal!.description}
        onChangeText={() => {}}
        multiline
      />

      <AnimalTable 
        peso={animal!.weight}
        genero={animal!.gender}
        proposito={animal!.purpose}
        edad={animal!.age}
      />
      
      <View style={styles.ubicationContainer}>
        <Text style={[GlobalStyles.subTitle]}>Ubicación actual:</Text>
        <Text style={[GlobalStyles.miniText]}>{animal?.ubicacion}</Text>
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10, 
  },
  ubicationContainer: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'flex-start', 
    marginBottom: 10, 
  },

  

});

export default AnimalView;
