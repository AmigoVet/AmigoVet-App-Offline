import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Gestiona la cantidad de requests permitidos por día.
 * @returns {Promise<boolean>} - Retorna true si la solicitud es permitida, false si se excedió el límite.
 */
export const manageDailyRequests = async (): Promise<boolean> => {
  const LIMIT = 5; // Máximo de solicitudes permitidas por día.
  const STORAGE_KEY = "daily_request_tracker";

  try {
    const today = new Date().toISOString().split("T")[0]; // Fecha en formato YYYY-MM-DD.
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (parsedData.date === today) {
        // Si es el mismo día, verificar el límite.
        if (parsedData.count >= LIMIT) {
          return false; // Límite alcanzado.
        }

        // Incrementar el contador.
        parsedData.count += 1;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
        return true;
      }
    }

    // Si no hay datos o es un nuevo día, reiniciar el contador.
    const newData = { date: today, count: 1 };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    return true;
  } catch (error) {
    console.error("Error gestionando los requests diarios:", error);
    return false; // Por seguridad, restringe solicitudes si hay errores.
  }
};


export const getAvailableRequests = async (): Promise<number> => {
    const LIMIT = 5; // Máximo de solicitudes permitidas por día.
    const STORAGE_KEY = "daily_request_tracker";
  
    try {
      const today = new Date().toISOString().split("T")[0]; // Fecha en formato YYYY-MM-DD.
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
  
      if (storedData) {
        const parsedData = JSON.parse(storedData);
  
        if (parsedData.date === today) {
          // Si es el mismo día, calcular solicitudes restantes.
          return Math.max(0, LIMIT - parsedData.count);
        }
      }
  
      // Si no hay datos o es un nuevo día, todas las solicitudes están disponibles.
      return LIMIT;
    } catch (error) {
      console.error("Error al obtener la cantidad de solicitudes disponibles:", error);
      return 0; // En caso de error, devolver 0 solicitudes disponibles.
    }
  };