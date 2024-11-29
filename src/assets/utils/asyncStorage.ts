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

const getAnimalById = async (id: string): Promise<Animal | null> => {
    try {
      const animalsJson = await AsyncStorage.getItem('animals');
      if (animalsJson) {
        const animals: Animal[] = JSON.parse(animalsJson);
        return animals.find(animal => animal.id === id) || null;
      }
      return null;
    } catch (error) {
      console.error('Error recuperando animal', error);
      return null;
    }
  };


export { saveData, loadData, getAnimalById };

