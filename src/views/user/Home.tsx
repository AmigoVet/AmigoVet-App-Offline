import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import useAuthStore from '../../assets/store/authStore';
import { GlobalStyles } from '../../assets/styles';
import Header from '../../assets/components/Header';
import { createTableAnimals, getAllAnimals } from '../../../SQLiteConfig';
import { Animal } from '../../assets/interfaces/animal';
import { loadData } from '../../assets/utils/asyncStorage';

const Home = () => {
   const user = useAuthStore((state) => state.user);
   const [animals, setAnimals] = useState<Animal[]>([]);

    const loadAnimal = async () => {
        const animales = await loadData();
        console.log('Animales cargados:', animales);
        setAnimals(animales);
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
                       <View key={animal.id} style={styles.animalCard}>
                           <Text style={styles.animalName}>{animal.name}</Text>
                           <Text>{animal.species}</Text>
                           <Text>{animal.breed}</Text>
                           <Text>{animal.age}</Text>
                           <Text>{animal.gender}</Text>
                           <Text>{animal.weight}</Text>
                           <Text>{animal.color}</Text>
                           <Text>{animal.image}</Text>
                           <Text>{animal.description}</Text>
                           <Text>{animal.ubicacion}</Text>
                           <Text>{animal.purpose}</Text>
                           <Text>{animal.created_at}</Text>
                           <Text>{animal.updated_at}</Text>
                           <Image 
                               source={{ uri: animal.image }} 
                               style={{ 
                                   width: 200, 
                                   height: 200, 
                                   borderRadius: 10, 
                                   marginTop: 10, 
                               }} 
                               resizeMode="contain"
                           />
                       </View>
                   ))
               ) : (
                   <Text>No animals found.</Text>
               )}
           </ScrollView>
       </View>
    </>

   );
};

const styles = StyleSheet.create({
   container: {
       padding: 10,
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
