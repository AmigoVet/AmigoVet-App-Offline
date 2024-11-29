import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { colors, GlobalStyles } from '../../assets/styles';
import { Animal } from '../../assets/interfaces/animal';
import { RootStackParamList } from '../Welcome';
import { getAnimalById } from '../../assets/utils/asyncStorage';
import { CustomImage } from '../../assets/components';

const AnimalView = () => {
  // Obtener los parámetros de la ruta
  const route = useRoute<RouteProp<RootStackParamList, 'AnimalView'>>();
  const { id } = route.params; 
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        setIsLoading(true);
        const fetchedAnimal = await getAnimalById(id);
        setAnimal(fetchedAnimal);
        // console.log('Animal obtenido:', fetchedAnimal);
      } catch (error) {
        console.error('Error al obtener el animal:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando información del animal...</Text>
      </View>
    );
  }

  if (!animal) {
    return (
      <View style={styles.errorContainer}>
        <Text>No se encontró información para el animal con ID {id}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={GlobalStyles.container}>
        <CustomImage 
            source={animal.image}
            full={true}
        />
      
      <Text style={styles.title}>{animal.name}</Text>
      <Text style={styles.text}>Identificador: {animal.identifier}</Text>
      <Text style={styles.text}>Detalles adicionales...</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.blanco,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: colors.naranja,
    marginBottom: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimalView;
