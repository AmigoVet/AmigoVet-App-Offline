import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react'
import CustomImage from '../Customs/CustomImage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getDynamicColors } from '../../assets/styles/colors';
import { createGlobalStyles } from '../../assets/styles/styles';
import { Animal } from '../../lib/interfaces/animal';
import { RootStackParamList } from '../../views/Welcome';
import { useTheme } from '../../lib/context/';

// Usar una prop específica para pasar los datos
interface PublicAnimalCardProps {
  animal: Animal;
}

const PublicAnimalCard: React.FC<PublicAnimalCardProps> = ({ animal }) => {
    const {navigate} = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { isDarkTheme } = useTheme();
    const colors = getDynamicColors(isDarkTheme);
    const GlobalStyles = createGlobalStyles(isDarkTheme);
    const styles = dymanycStyles(colors);

    return (
        <Pressable style={styles.container} onPress={() => {navigate('AnimalView', { id: animal.id})}}>
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

const dymanycStyles = (colors: ReturnType<typeof getDynamicColors>) =>
    StyleSheet.create({
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

export default PublicAnimalCard;