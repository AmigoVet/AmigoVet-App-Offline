import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animal } from '../interfaces/animal';
import { Register } from '../interfaces/registers';


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

const loadData = async (ownerId: string) => {
  try {
      const data = await AsyncStorage.getItem('animals');
      const animals: Animal[] = data ? JSON.parse(data) : [];
      // Filtrar por ownerId
      return animals.filter(animal => animal.ownerId === ownerId);
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

const deleteAnimalById = async (id: string) => {
    try {
        const animalsJson = await AsyncStorage.getItem('animals');
        if (animalsJson) {
            const animals: Animal[] = JSON.parse(animalsJson);
            const newAnimals = animals.filter(animal => animal.id !== id);
            await AsyncStorage.setItem('animals', JSON.stringify(newAnimals));
        }
    } catch (error) {
        console.error('Error al eliminar animal', error);
    }
};

const updateAnimalData = async (id: string, field: string, value: string) => {
    try {
      const animalsJson = await AsyncStorage.getItem('animals');
      if (animalsJson) {
        const animals = JSON.parse(animalsJson);
        const updatedAnimals = animals.map((animal: any) => {
          if (animal.id === id) {
            return { ...animal, [field]: value }; // Actualiza el campo específico
          }
          return animal;
        });
        await AsyncStorage.setItem('animals', JSON.stringify(updatedAnimals));
        console.log(`Animal actualizado: ${field} = ${value}`);
      }
    } catch (error) {
      console.error('Error al actualizar animal:', error);
    }
};

/*  Registros  */
const saveRegister =  async (register: Register) => {
  try {
    const existingData = await AsyncStorage.getItem('registers');
    const parsedData = existingData ? JSON.parse(existingData) : [];
    parsedData.push(register);
    await AsyncStorage.setItem('registers', JSON.stringify(parsedData));
  } catch (error) {
    console.error('Error al guardar el registro:', error);
  }
}
const loadRegistersByAnimalId = async (animalId: string) => {
  try {
    const data = await AsyncStorage.getItem('registers');
    const registers: Register[] = data ? JSON.parse(data) : [];
    return registers.filter(register => register.animalId === animalId);
  } catch (error) {
    console.log('Error al cargar los registros:', error);
  }
}
const deleteRegisterById = async (id: string) => {
  try {
    const registersJson = await AsyncStorage.getItem('registers');
    if (registersJson) {
      const registers: Register[] = JSON.parse(registersJson);
      const newRegisters = registers.filter(register => register.id !== id);
      await AsyncStorage.setItem('registers', JSON.stringify(newRegisters));
    }
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
  }
}

export { saveData, loadData, getAnimalById, deleteAnimalById, updateAnimalData, saveRegister, loadRegistersByAnimalId, deleteRegisterById };

