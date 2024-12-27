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

      const updatedAnimals = animals.map((animal) => {
        if (animal.id === animalId) {
          const filteredNotes = animal.notas
            ? animal.notas.filter(
                (note) =>
                  !note.nota.startsWith(newNote.nota.split(':')[0]) && // Elimina notas similares
                  !(
                    newNote.nota.startsWith('Hubo un aborto el') &&
                    note.nota.startsWith('Posible fecha de parto:')
                  ) // También elimina "Posible fecha de parto:" si la nueva nota es "Hubo un aborto el"
              )
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
const deleteNoteAnimal = async (animalId: string, noteText: string) => {
  try {
    const animalsJson = await AsyncStorage.getItem('animals');
    if (animalsJson) {
      const animals: Animal[] = JSON.parse(animalsJson);

      const updatedAnimals = animals.map((animal) => {
        if (animal.id === animalId) {
          const filteredNotes = animal.notas
            ? animal.notas.filter((note) => !note.nota.startsWith(noteText))
            : [];
          return { ...animal, notas: filteredNotes };
        }
        return animal;
      });

      await AsyncStorage.setItem('animals', JSON.stringify(updatedAnimals));
    } else {
      console.warn('No se encontraron animales para actualizar');
    }
  } catch (error) {
    console.error('Error al eliminar nota:', error);
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

const updateAnimalData = async (id: string, field: string, value: string | boolean) => {
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

// Función para devolver animales donde embarazada = true
const getPregnantAnimals = async (ownerId: string): Promise<Animal[]> => {
  try {
    const animalsJson = await AsyncStorage.getItem('animals');
    if (animalsJson) {
      const animals: Animal[] = JSON.parse(animalsJson);

      // Filtrar por `ownerId` y `embarazada = true`
      return animals.filter(
        animal => animal.ownerId === ownerId && animal.embarazada === true
      );
    }
    return [];
  } catch (error) {
    console.error('Error al obtener animales embarazados:', error);
    return [];
  }
};

const getMaleAnimals = async (ownerId: string): Promise<Animal[]> => {
  try {
    const animalsJson = await AsyncStorage.getItem('animals');
    if (animalsJson) {
      const animals: Animal[] = JSON.parse(animalsJson);

      // Filtrar por `ownerId` y `genero = Macho`
      return animals.filter(
        animal => animal.ownerId === ownerId && animal.genero === 'Macho'
      );
    }
    return [];
  } catch (error) {
    console.error('Error al obtener animales machos:', error);
    return [];
  }
};

const getFemaleAnimals = async (ownerId: string): Promise<Animal[]> => {
  try {
    const animalsJson = await AsyncStorage.getItem('animals');
    if (animalsJson) {
      const animals: Animal[] = JSON.parse(animalsJson);

      // Filtrar por `ownerId` y `genero = Hembra`
      return animals.filter(
        animal => animal.ownerId === ownerId && animal.genero === 'Hembra'
      );
    }
    return [];
  } catch (error) {
    console.error('Error al obtener animales hembras:', error);
    return [];
  }
};

const getAnimalsUnderTwoYears = async (ownerId: string): Promise<Animal[]> => {
  try {
    const animalsJson = await AsyncStorage.getItem('animals');
    if (animalsJson) {
      const animals: Animal[] = JSON.parse(animalsJson);
      const currentDate = new Date();

      // Filtrar por `ownerId` y edad menor a 2 años
      return animals.filter(animal => {
        if (animal.ownerId === ownerId && animal.nacimiento) {
          const birthDate = new Date(animal.nacimiento);
          const ageInYears =
            (currentDate.getTime() - birthDate.getTime()) /
            (1000 * 60 * 60 * 24 * 365.25);
          return ageInYears < 2;
        }
        return false;
      });
    }
    return [];
  } catch (error) {
    console.error('Error al obtener animales menores de 2 años:', error);
    return [];
  }
};


// // **1. Función para obtener la cantidad de animales registrados**
// const getRegisteredAnimalsCount = async (ownerId: string): Promise<number> => {
//   try {
//     const animalsJson = await AsyncStorage.getItem('animals');
//     const animals: Animal[] = animalsJson ? JSON.parse(animalsJson) : [];

//     // Filtrar animales por ownerId
//     const filteredAnimals = animals.filter((animal) => animal.ownerId === ownerId);

//     return filteredAnimals.length;
//   } catch (error) {
//     console.error('Error al contar animales registrados:', error);
//     return 0;
//   }
// };


// // **2. Función para obtener los últimos tres registros con nombre e identificador del animal**
// const getLastThreeRegisters = async (ownerId: string): Promise<{ nombre: string; identificador: string; fecha: string; comentario: string; accion: string }[]> => {
//   try {
//     const registersJson = await AsyncStorage.getItem('registers');
//     const registers: Register[] = registersJson ? JSON.parse(registersJson) : [];

//     const animalsJson = await AsyncStorage.getItem('animals');
//     const animals: Animal[] = animalsJson ? JSON.parse(animalsJson) : [];

//     // Filtrar animales por ownerId
//     const filteredAnimals = animals.filter((animal) => animal.ownerId === ownerId);

//     // Obtener IDs de los animales del propietario
//     const animalIds = new Set(filteredAnimals.map((animal) => animal.id));

//     // Filtrar registros relacionados con los animales del propietario
//     const filteredRegisters = registers.filter((register) => animalIds.has(register.animalId));

//     // Ordenar registros por fecha descendente y tomar los últimos tres
//     const lastThreeRegisters = filteredRegisters
//       .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
//       .slice(0, 3);

//     return lastThreeRegisters.map((register) => {
//       const animal = filteredAnimals.find((animal) => animal.id === register.animalId);
//       return {
//         nombre: animal?.nombre || 'Desconocido',
//         identificador: animal?.identificador || 'Desconocido',
//         fecha: register.fecha,
//         comentario: register.comentario,
//         accion: register.accion,
//       };
//     });
//   } catch (error) {
//     console.error('Error al obtener los últimos tres registros:', error);
//     return [];
//   }
// };


// // **3. Función para obtener las especies registradas y la cantidad de animales de cada especie**
// const getSpeciesCount = async (ownerId: string): Promise<Record<string, number>> => {
//   try {
//     const animalsJson = await AsyncStorage.getItem('animals');
//     const animals: Animal[] = animalsJson ? JSON.parse(animalsJson) : [];

//     // Filtrar animales por ownerId
//     const filteredAnimals = animals.filter((animal) => animal.ownerId === ownerId);

//     return filteredAnimals.reduce((acc: Record<string, number>, animal) => {
//       const especie = animal.especie || 'Desconocido';
//       acc[especie] = (acc[especie] || 0) + 1;
//       return acc;
//     }, {});
//   } catch (error) {
//     console.error('Error al contar especies registradas:', error);
//     return {};
//   }
// };



export { 
  saveData,
  loadData, 
  saveNoteAnimal, 
  deleteNoteAnimal,
  getAnimalById, 
  deleteAnimalById, 
  updateAnimalData, 
  saveRegister, 
  loadRegistersByAnimalId, 
  deleteRegisterById, 
  searchAnimals, 
  getPregnantAnimals, 
  getMaleAnimals, 
  getFemaleAnimals, 
  getAnimalsUnderTwoYears,
  // getRegisteredAnimalsCount, 
  // getLastThreeRegisters, 
  // getSpeciesCount 
};

