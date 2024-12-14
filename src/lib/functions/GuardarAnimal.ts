import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAnimalData = async (animal: any) => {
    try {
      const existingData = await AsyncStorage.getItem("animals");
      const parsedData = existingData ? JSON.parse(existingData) : [];
      parsedData.push(animal);
      await AsyncStorage.setItem("animals", JSON.stringify(parsedData));
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };