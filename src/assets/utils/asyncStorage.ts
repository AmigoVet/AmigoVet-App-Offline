import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animal } from '../interfaces/animal';


const saveData = async (animal: Animal) => {
    try {
        const existingData = await AsyncStorage.getItem('animals');
        const parsedData = existingData ? JSON.parse(existingData) : [];
        parsedData.push(animal);
        await AsyncStorage.setItem('animals', JSON.stringify(parsedData));
    } catch (error: any) {
        console.error('Error al guardar en AsyncStorage:', error);
        throw error;
    }
};

const loadData = async () => {
    try {
        const data = await AsyncStorage.getItem('animals');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error al cargar datos:', error);
        return [];
    }
};

export { saveData, loadData };

