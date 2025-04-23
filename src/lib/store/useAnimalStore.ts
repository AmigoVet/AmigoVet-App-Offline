import { create } from 'zustand';
import { Transaction, SQLError } from 'react-native-sqlite-storage';
import { setDataAnimal } from '../db/animals/setDataAnimal';
import { db } from '../db/db';
import { Animal } from '../interfaces/Animal';

interface AnimalStore {
  animals: Animal[];
  loadAnimals: () => Promise<void>;
  addAnimal: (animal: Animal) => Promise<void>;
  updateAnimal: (animal: Animal) => Promise<void>;
  deleteAnimal: (id: string) => Promise<void>;
}

// Create the Zustand store
export const useAnimalStore = create<AnimalStore>((set) => ({
  animals: [],

  // Load animals from the database
  loadAnimals: async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx: Transaction) => {
        tx.executeSql(
          `SELECT * FROM Animal`,
          [],
          (_, { rows }) => {
            const animals: Animal[] = [];
            for (let i = 0; i < rows.length; i++) {
              const item = rows.item(i);
              animals.push({
                id: item.id,
                ownerId: item.ownerId,
                identificador: item.identificador,
                nombre: item.nombre,
                especie: item.especie,
                raza: item.raza,
                nacimiento: item.nacimiento,
                genero: item.genero,
                peso: item.peso,
                color: item.color,
                descripcion: item.descripcion,
                image: item.image,
                image2: item.image2,
                image3: item.image3,
                proposito: item.proposito,
                ubicacion: item.ubicacion,
                created_at: item.created_at,
                updated_at: item.updated_at,
                embarazada: !!item.embarazada, // Convert INTEGER to boolean
              });
            }
            set({ animals });
            resolve();
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al cargar animales:', error);
            reject(error);
            return false;
          }
        );
      });
    });
  },

  // Add a new animal
  addAnimal: async (animal: Animal) => {
    try {
      await setDataAnimal(animal); // Persist to database
      set((state) => ({
        animals: [...state.animals, animal],
      }));
    } catch (error) {
      console.error('[ERROR] Error al agregar animal:', error);
      throw error;
    }
  },

  // Update an existing animal
  updateAnimal: async (updatedAnimal: Animal) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx: Transaction) => {
        tx.executeSql(
          `UPDATE Animal SET
            ownerId = ?, identificador = ?, nombre = ?, especie = ?, raza = ?,
            nacimiento = ?, genero = ?, peso = ?, color = ?, descripcion = ?,
            image = ?, image2 = ?, image3 = ?, proposito = ?, ubicacion = ?,
            created_at = ?, updated_at = ?, embarazada = ?
            WHERE id = ?`,
          [
            updatedAnimal.ownerId,
            updatedAnimal.identificador,
            updatedAnimal.nombre,
            updatedAnimal.especie,
            updatedAnimal.raza,
            updatedAnimal.nacimiento,
            updatedAnimal.genero,
            updatedAnimal.peso,
            updatedAnimal.color,
            updatedAnimal.descripcion,
            updatedAnimal.image,
            updatedAnimal.image2,
            updatedAnimal.image3,
            updatedAnimal.proposito,
            updatedAnimal.ubicacion,
            updatedAnimal.created_at,
            updatedAnimal.updated_at,
            updatedAnimal.embarazada ? 1 : 0,
            updatedAnimal.id,
          ],
          () => {
            set((state) => ({
              animals: state.animals.map((animal) =>
                animal.id === updatedAnimal.id ? updatedAnimal : animal
              ),
            }));
            resolve();
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al actualizar animal:', error);
            reject(error);
            return false;
          }
        );
      });
    });
  },

  // Delete an animal
  deleteAnimal: async (id: string) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx: Transaction) => {
        tx.executeSql(
          `DELETE FROM Animal WHERE id = ?`,
          [id],
          () => {
            set((state) => ({
              animals: state.animals.filter((animal) => animal.id !== id),
            }));
            resolve();
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al eliminar animal:', error);
            reject(error);
            return false;
          }
        );
      });
    });
  },
}));