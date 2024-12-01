import AsyncStorage from "@react-native-async-storage/async-storage";
import { Register } from "../interfaces/registers";

export const useRegisters = async (id: string): Promise<Register[]> => {
  try {
    const data = await AsyncStorage.getItem('registers'); 
    if (data) {
      const parsedRegisters: Register[] = JSON.parse(data); 
      return parsedRegisters.filter((register) => register.animalId === id); 
    }
    return [];
  } catch (error) {
    console.log('Error al obtener registros:', error);
    return []; 
  }
};
