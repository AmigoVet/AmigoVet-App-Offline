import AsyncStorage from "@react-native-async-storage/async-storage";
import { Register } from "../interfaces/registers";

export const useRegisters = async (id: string): Promise<Register[]> => {
  try {
    const data = await AsyncStorage.getItem('registers'); 
    if (data) {
      const parsedRegisters: Register[] = JSON.parse(data); 
      
      // Filtrar por animalId
      const filteredRegisters = parsedRegisters.filter((register) => register.animalId === id);
      
      // Ordenar en orden descendente por fecha
      const sortedRegisters = filteredRegisters.sort((a, b) => {
        const dateA = new Date(a.fecha).getTime();
        const dateB = new Date(b.fecha).getTime();
        return dateB - dateA; // Más reciente primero
      });

      return sortedRegisters; 
    }
    return [];
  } catch (error) {
    console.log('Error al obtener registros:', error);
    return []; 
  }
};
