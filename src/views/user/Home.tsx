import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import useAuthStore from '../../assets/store/authStore';
import { GlobalStyles } from '../../assets/styles';
import Header from '../../assets/components/Header';
import { Animal } from '../../assets/interfaces/animal';
import { loadData } from '../../assets/utils/asyncStorage';
import RNFS from 'react-native-fs';
import { AnimalCard } from '../../assets/components';

const Home = () => {
   const user = useAuthStore((state) => state.user);
   const [animals, setAnimals] = useState<Animal[]>([]);

    const loadAnimal = async () => {
        const animales = await loadData();
        // console.log('Animales cargados:', animales);
        
        const validatedAnimals = await Promise.all(animales.map(async (animal: Animal) => {
            if (animal.image) {
                try {
                    const fileExists = await RNFS.exists(animal.image);
                    // console.log(`Imagen para ${animal.name} existe:`, fileExists);
                    
                    if (!fileExists) {
                        animal.image = '';
                    }
                } catch (error) {
                    console.error(`Error verificando imagen para ${animal.name}:`, error);
                    animal.image = '';
                }
            }
            return animal;
        }));

        setAnimals(validatedAnimals);
    }

   useEffect(() => {
      loadAnimal();
   }, []);

   return (
    <>
       <Header  />

       <View style={[GlobalStyles.container, styles.container]}>
       <ScrollView>
            {animals.length > 0 ? (
                animals.map((animal) => (
                    <AnimalCard 
                        key={animal.id}
                        animal={animal}
                    />
                ))
            ) : (
                <Text>No se encontraron animales.</Text>
            )}
        </ScrollView>
       </View>
    </>
   );
};

const styles = StyleSheet.create({
   container: {
       padding: 10,
       width: '100%',
   },
   animalCard: {
       padding: 15,
       marginVertical: 10,
       backgroundColor: '#f9f9f9',
       borderRadius: 10,
   },
   animalName: {
       fontSize: 18,
       fontWeight: 'bold',
   },
});

export default Home;