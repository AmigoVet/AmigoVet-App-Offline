import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { GlobalStyles } from '../../assets/styles';
import { useRoute, RouteProp } from '@react-navigation/native';
import useAnimals from '../../assets/hooks/useAnimals';
import { RootStackParamList } from '../Welcome';
import { AnimalTable, CustomButton, CustomImage, CustomInput, EditTableText } from '../../assets/components';

const AnimalView = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'AnimalView'>>();
  const { id } = route.params;
  const { animal, isLoading, error } = useAnimals(id);


  const [name, setName] = useState(animal?.name)
  const [identifier, setIdentifier] = useState(animal?.identifier)
  const [raza, setRaza] = useState(animal?.breed)
  const [species, setSpecies] = useState(animal?.species)
  const [description, setDescription] = useState(animal?.description)
  const [age, setAge] = useState(animal?.age)
  const [purpose, setPurpose] = useState(animal?.purpose)
  const [ubication, setUbication] = useState(animal?.ubicacion)

  const handleSave = () => {
    console.log('Guardando datos');
    console.log(name);
    console.log(species);
    console.log(description);
    console.log(age);
    console.log(purpose);
    console.log(ubication);
  }


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
        <EditTableText 
          placeholder='Nombre'
          value={animal!.name}
          onChangeText={(text) => setName(text)}
          type='text'
          style={GlobalStyles.title}
        />
        <EditTableText 
          placeholder='Especie'
          value={animal!.species}
          onChangeText={(text) => setSpecies(text)}
          type='text'
        />
        <EditTableText 
          placeholder='Indentificación'
          value={animal!.identifier}
          onChangeText={(text) => setIdentifier(text)}
          type='text'
        />
      </View>
      <View style={styles.titleContainer}>
        <EditTableText 
          label='Especie'
          placeholder='Especie'
          value={animal!.species}
          onChangeText={(text) => setSpecies(text)}
          type='text'
          style={GlobalStyles.subTitle}
        />
        <EditTableText 
          placeholder='Especie'
          value={animal!.species}
          onChangeText={(text) => setSpecies(text)}
          type='text'
        />
      </View>
      
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
        <Text style={[GlobalStyles.miniText, {fontSize:20}]}>{animal?.ubicacion}</Text>
      </View>

      <CustomButton 
        text='Guardar Cambios'
        onPress={() => {handleSave()}}
      />

      <CustomButton 
        text='Nuevo Registro'
        onPress={() => {}}
      />

      <View>
        <Text style={GlobalStyles.title}>Registros</Text> 
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
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
