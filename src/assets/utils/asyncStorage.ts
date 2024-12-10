import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animal, Notes } from '../interfaces/animal';
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

    const currentDate = new Date();

    const updatedAnimals = animals.map(animal => {
      if (animal.ownerId === ownerId && animal.notas) {
        // Filtrar notas vencidas
        const filteredNotes = animal.notas.filter(note => {
          if (note.nota.startsWith("Posible fecha de parto:")) {
            const noteDateStr = note.nota.split(":")[1].trim(); // Extraer fecha
            const noteDate = new Date(noteDateStr);

            // Comparar si la fecha de parto ya pasó (más de un día después)
            if (currentDate > noteDate) {
              return false; // Eliminar la nota
            }
          }
          return true; // Conservar otras notas
        });

        return { ...animal, notas: filteredNotes };
      }
      return animal;
    });

    // Guardar animales actualizados
    await AsyncStorage.setItem('animals', JSON.stringify(updatedAnimals));

    // Filtrar solo animales del propietario
    return updatedAnimals.filter(animal => animal.ownerId === ownerId);
  } catch (error) {
    console.error('Error al cargar datos:', error);
    return [];
  }
};

const searchAnimals = async (query: string): Promise<Animal[]> => {
  try {
    const animalsJson = await AsyncStorage.getItem('animals');
    if (animalsJson) {
      const animals: Animal[] = JSON.parse(animalsJson);
      const lowerCaseQuery = query.toLowerCase();

      return animals.filter(animal =>
        Object.values(animal).some(value =>
          value.toString().toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
    return [];
  } catch (error) {
    console.error('Error al buscar animales:', error);
    return [];
  }
};


const saveNoteAnimal = async (animalId: string, newNote: Notes) => {
  try {
    const animalsJson = await AsyncStorage.getItem('animals');
    if (animalsJson) {
      const animals: Animal[] = JSON.parse(animalsJson);

      const updatedAnimals = animals.map(animal => {
        if (animal.id === animalId) {
          // Filtrar las notas existentes para eliminar las relacionadas al campo específico
          const filteredNotes = animal.notas
            ? animal.notas.filter(note => !note.nota.startsWith(newNote.nota.split(":")[0]))
            : [];

          return { ...animal, notas: [...filteredNotes, newNote] };
        }
        return animal;
      });

      await AsyncStorage.setItem('animals', JSON.stringify(updatedAnimals));
    } else {
      console.warn('No se encontraron animales para actualizar');
    }
  } catch (error) {
    console.error('Error al guardar nota:', error);
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
            return { ...animal, [field]: value }; 
          }
          return animal;
        });
        await AsyncStorage.setItem('animals', JSON.stringify(updatedAnimals));
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

    // Filtrar por `animalId` y ordenar en orden descendente por fecha
    return registers
      .filter(register => register.animalId === animalId)
      .sort((a, b) => {
        const dateA = new Date(a.fecha).getTime();
        const dateB = new Date(b.fecha).getTime();
        return dateB - dateA; // Ordenar de más reciente a más antiguo
      });
  } catch (error) {
    console.log('Error al cargar los registros:', error);
    return [];
  }
};



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

export { saveData, loadData, saveNoteAnimal, getAnimalById, deleteAnimalById, updateAnimalData, saveRegister, loadRegistersByAnimalId, deleteRegisterById, searchAnimals };

