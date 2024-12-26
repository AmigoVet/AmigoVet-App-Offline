import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { createGlobalStyles } from '../../assets/styles/styles'
import { useTheme } from '../../lib/context/ThemeContext'
import { CustomButton, CustomImage, CustomInput } from '../../components/Customs'
import { Animal } from '../../lib/interfaces/animal'
import { getDataAnimal } from '../../lib/db/getDataAnimal'
import useAuthStore from '../../lib/store/authStore'
import { ScrollView } from 'react-native-gesture-handler'

const TestDBView = () => {
    const [animals, setAnimals] = React.useState<Animal[]>([]); 

    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const animalData = await getDataAnimal(user!.userId);
                console.log('Fetched animals:', animalData);
                setAnimals(animalData);
            } catch (error) {
                console.error('Error loading animals:', error);
            }
        };
        fetchData();
    }, [user]);

    const { isDarkTheme } = useTheme();
    const GLobalStyles = createGlobalStyles(isDarkTheme);

    return (
        <ScrollView>
        <View style={GLobalStyles.container}>
            {animals.length > 0 ? (
                animals.map((animal) => (
                    <View key={animal.id} style={GLobalStyles.container}>
                        <CustomImage source={animal.image} full/>
                        <Text style={GLobalStyles.label}>ID: {animal.id}</Text>
                        <Text style={GLobalStyles.label}>Nombre: {animal.nombre}</Text>
                        <Text style={GLobalStyles.label}>Especie: {animal.especie}</Text>
                        <Text style={GLobalStyles.label}>Raza: {animal.raza}</Text>
                        <Text style={GLobalStyles.label}>Genero: {animal.genero}</Text>
                        <Text style={GLobalStyles.label}>Color: {animal.color}</Text>
                        <Text style={GLobalStyles.label}>Descripcion: {animal.descripcion}</Text>
                        <Text style={GLobalStyles.label}>Imagen: {animal.image}</Text>
                        <Text style={GLobalStyles.label}>Imagen2: {animal.image2}</Text>
                        <Text style={GLobalStyles.label}>Imagen3: {animal.image3}</Text>
                        <Text style={GLobalStyles.label}>Propósito: {animal.proposito}</Text>
                        <Text style={GLobalStyles.label}>Ubicacion: {animal.ubicacion}</Text>
                        <Text style={GLobalStyles.label}>
                            Embarazada: {animal.embarazada ? 'Sí' : 'No'}
                        </Text>
                    </View>
                ))
            ) : (
                <Text style={GLobalStyles.label}>No hay animales registrados.</Text>
            )}
        </View>
        </ScrollView>
    );
};

export default TestDBView;
