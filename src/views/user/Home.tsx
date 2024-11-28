import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import useAuthStore from '../../assets/store/authStore';
import { GlobalStyles } from '../../assets/styles';
import Header from '../../assets/components/Header';
import { Animal } from '../../assets/interfaces/animal';
import { loadData } from '../../assets/utils/asyncStorage';
import RNFS from 'react-native-fs'; // Asegúrate de importar react-native-fs

const Home = () => {
   const user = useAuthStore((state) => state.user);
   const [animals, setAnimals] = useState<Animal[]>([]);

    const loadAnimal = async () => {
        const animales = await loadData();
        // console.log('Animales cargados:', animales);
        
        // Validar y verificar existencia de imágenes
        const validatedAnimals = await Promise.all(animales.map(async (animal: Animal) => {
            if (animal.image) {
                try {
                    // Verificar si el archivo existe
                    const fileExists = await RNFS.exists(animal.image);
                    // console.log(`Imagen para ${animal.name} existe:`, fileExists);
                    
                    // Si el archivo no existe, establece la imagen como cadena vacía
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

   // Función de renderizado de imagen con validaciones
   const renderAnimalImage = (imagePath: string) => {
     // Si no hay imagen, no renderizar nada
     if (!imagePath) return null;

     // Añadir prefijo file:// y validar
     const imageUri = `file://${imagePath}`;
     
     return (
       <Image 
         source={{ uri: imageUri }} 
         style={{ 
           width: 200, 
           height: 200, 
           borderRadius: 10, 
           marginTop: 10, 
         }} 
         resizeMode="contain"
         onError={(e) => {
           console.error('Error cargando imagen:', e.nativeEvent.error);
           Alert.alert('Error', 'No se pudo cargar la imagen');
         }}
       />
     );
   };

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
                           <Text>{animal.description}</Text>
                           <Text>{animal.ubicacion}</Text>
                           <Text>{animal.purpose}</Text>
                           <Text>{animal.created_at}</Text>
                           <Text>{animal.updated_at}</Text>
                           
                           {/* Renderizado condicional de imagen con validaciones */}
                           {renderAnimalImage(animal.image)}
                       </View>
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