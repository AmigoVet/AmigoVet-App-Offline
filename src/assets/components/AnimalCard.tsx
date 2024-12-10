import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react'
import CustomImage from './CustomImage';
import { colors, GlobalStyles } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { Animal } from '../interfaces/animal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../views/Welcome';

// Usar una prop específica para pasar los datos
interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
    const {navigate} = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleView = () => {
        // Navegar a la vista de detalles del animal
        navigate('AnimalView', { id: animal.id});
    };

    return (
        <Pressable 
            style={styles.container}
            onPress={() => handleView()}
        >
            <View style={styles.textContainer}>
                <Text style={styles.nombre}>{animal.nombre}<Text style={GlobalStyles.miniText}>({animal.id})</Text></Text>
                <Text style={GlobalStyles.label}>{animal.identificador}</Text>
            </View>
            <CustomImage 
                source={animal.image}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 340,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.blanco
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default AnimalCard;