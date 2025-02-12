import AsyncStorage from '@react-native-async-storage/async-storage';
import { constants } from '../../assets/styles/constants';

interface RequestLimit {
  date: string;
  remainingRequests: number;
}

const MAX_REQUESTS_PER_DAY = constants.cantidadPosibleDePeticionesPorDia; 
const STORAGE_KEY = '@request_limit';

export const handleRequestLimit = async (): Promise<boolean> => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    let requestLimit: RequestLimit;

    if (!storedData) {
      requestLimit = {
        date: currentDate,
        remainingRequests: MAX_REQUESTS_PER_DAY - 1
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(requestLimit));
      return true;
    }

    requestLimit = JSON.parse(storedData) as RequestLimit;

    if (requestLimit.date !== currentDate) {
      requestLimit = {
        date: currentDate,
        remainingRequests: MAX_REQUESTS_PER_DAY - 1
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(requestLimit));
      return true;
    }

    if (requestLimit.remainingRequests > 0) {
      requestLimit.remainingRequests -= 1;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(requestLimit));
      return true;
    }

    return false;

  } catch (error) {
    console.error('Error al manejar el límite de peticiones:', error);
    return false;
  }
};

export const getRemainingRequests = async (): Promise<number> => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      return MAX_REQUESTS_PER_DAY;
    }

    const requestLimit = JSON.parse(storedData) as RequestLimit;

    if (requestLimit.date !== currentDate) {
      return MAX_REQUESTS_PER_DAY;
    }

    return requestLimit.remainingRequests;
  } catch (error) {
    console.error('Error al obtener peticiones restantes:', error);
    return 0;
  }
};