import { create } from 'zustand';
import { Transaction, SQLError } from 'react-native-sqlite-storage';
import { setDataAnimal, getDataAnimal } from '../db/animals';
import { setDataNote, getNotesByAnimalId, updateNote, deleteNote } from '../db/notes';
import { setDataRegister, getRegistersByAnimalId, updateRegister, deleteRegister } from '../db/registers';
import { setDataEvent, getEventsByAnimalId, updateEvent, deleteEvent } from '../db/events';
import { db, getStoragePath } from '../db/db';
import { Animal } from '../interfaces/Animal';
import { Notes } from '../interfaces/Notes';
import { Register } from '../interfaces/Register';
import { Events } from '../interfaces/Events';
import RNFS from 'react-native-fs';
import { updateAnimal } from '../db/animals/updateAnimal';

interface AnimalStore {
  animals: Animal[];
  loadAnimals: () => Promise<void>;
  addAnimal: (animal: Animal) => Promise<void>;
  updateAnimal: (animal: Animal) => Promise<void>;
  deleteAnimal: (id: string) => Promise<void>;
  addNote: (note: Notes) => Promise<void>;
  updateNote: (note: Notes) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  addRegister: (register: Register) => Promise<void>;
  updateRegister: (register: Register) => Promise<void>;
  deleteRegister: (id: string) => Promise<void>;
  addEvent: (event: Events) => Promise<void>;
  updateEvent: (event: Events) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  updateAnimalPregnancy: (animalId: string, embarazada: boolean) => Promise<void>;
}

export const useAnimalStore = create<AnimalStore>((set) => ({
  animals: [],

  // Animales 
  loadAnimals: async () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx: Transaction) => {
        tx.executeSql(
          `SELECT * FROM Animal`,
          [],
          async (_, { rows }) => {
            const animals: Animal[] = [];
            for (let i = 0; i < rows.length; i++) {
              const item = rows.item(i);
              
              // Normalizar la ruta de la imagen
              let imagePath = item.image || '';
              if (imagePath && !imagePath.startsWith('file://')) {
                imagePath = `file://${getStoragePath()}/animals/${item.image}`;
              }
              
              // Verificar existencia del archivo
              if (imagePath) {
                const fileExists = await RNFS.exists(imagePath.replace('file://', ''));
                if (!fileExists) {
                  imagePath = '';
                }
              }

              // Obtener notas, registros y eventos
              const notes = await getNotesByAnimalId(item.id);
              const registers = await getRegistersByAnimalId(item.id);
              const events = await getEventsByAnimalId(item.id);

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
                image: imagePath,
                image2: item.image2,
                image3: item.image3,
                proposito: item.proposito,
                ubicacion: item.ubicacion,
                created_at: item.created_at,
                updated_at: item.updated_at,
                embarazada: !!item.embarazada,
                notes,
                registers,
                events,
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

  addAnimal: async (animal: Animal) => {
    try {
      await setDataAnimal(animal);
      set((state) => ({
        animals: [...state.animals, { ...animal, notes: [], registers: [], events: [] }],
      }));
    } catch (error) {
      console.error('[ERROR] Error al agregar animal:', error);
      throw error;
    }
  },

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
                animal.id === updatedAnimal.id
                  ? { ...updatedAnimal, notes: animal.notes, registers: animal.registers, events: animal.events }
                  : animal
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

  updateAnimalPregnancy: async (animalId: string, embarazada: boolean) => {
    try {
      // Asumimos una función updateAnimal en la base de datos
      await updateAnimal(animalId, { embarazada });
      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === animalId ? { ...animal, embarazada } : animal
        ),
      }));
    } catch (error) {
      console.error('[ERROR] Error al actualizar estado de embarazo:', error);
      throw error;
    }
  },

  // Notas
  addNote: async (note: Notes) => {
    try {
      await setDataNote(note);
      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === note.animalId
            ? { ...animal, notes: [...(animal.notes || []), note] }
            : animal
        ),
      }));
    } catch (error) {
      console.error('[ERROR] Error al agregar nota:', error);
      throw error;
    }
  },

  updateNote: async (updatedNote: Notes) => {
    try {
      await updateNote(updatedNote);
      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === updatedNote.animalId
            ? {
                ...animal,
                notes: animal.notes?.map((note) =>
                  note.id === updatedNote.id ? updatedNote : note
                ),
              }
            : animal
        ),
      }));
    } catch (error) {
      console.error('[ERROR] Error al actualizar nota:', error);
      throw error;
    }
  },

  deleteNote: async (id: string) => {
    try {
      await deleteNote(id);
      set((state) => ({
        animals: state.animals.map((animal) => ({
          ...animal,
          notes: animal.notes?.filter((note) => note.id !== id),
        })),
      }));
    } catch (error) {
      console.error('[ERROR] Error al eliminar nota:', error);
      throw error;
    }
  },

  // Registros
  addRegister: async (register: Register) => {
    try {
      await setDataRegister(register);
      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === register.animalId
            ? { ...animal, registers: [...(animal.registers || []), register] }
            : animal
        ),
      }));
    } catch (error) {
      console.error('[ERROR] Error al agregar registro:', error);
      throw error;
    }
  },

  updateRegister: async (updatedRegister: Register) => {
    try {
      await updateRegister(updatedRegister);
      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === updatedRegister.animalId
            ? {
                ...animal,
                registers: animal.registers?.map((reg) =>
                  reg.id === updatedRegister.id ? updatedRegister : reg
                ),
              }
            : animal
        ),
      }));
    } catch (error) {
      console.error('[ERROR] Error al actualizar registro:', error);
      throw error;
    }
  },

  deleteRegister: async (id: string) => {
    try {
      await deleteRegister(id);
      set((state) => ({
        animals: state.animals.map((animal) => ({
          ...animal,
          registers: animal.registers?.filter((reg) => reg.id !== id),
        })),
      }));
    } catch (error) {
      console.error('[ERROR] Error al eliminar registro:', error);
      throw error;
    }
  },

  // Eventos
  addEvent: async (event: Events) => {
    try {
      console.log('Intentando agregar evento:', event);
      await setDataEvent(event);
      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === event.animalId
            ? { ...animal, events: [...(animal.events || []), event] }
            : animal
        ),
      }));
    } catch (error: any) {
      console.error('[ERROR] Error al agregar evento:', error.message || error);
      throw new Error(`No se pudo agregar el evento: ${error.message || 'Error desconocido'}`);
    }
  },

  updateEvent: async (updatedEvent: Events) => {
    try {
      await updateEvent(updatedEvent);
      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === updatedEvent.animalId
            ? {
                ...animal,
                events: animal.events?.map((evt) =>
                  evt.id === updatedEvent.id ? updatedEvent : evt
                ),
              }
            : animal
        ),
      }));
    } catch (error) {
      console.error('[ERROR] Error al actualizar evento:', error);
      throw error;
    }
  },

  deleteEvent: async (id: string) => {
    try {
      await deleteEvent(id);
      set((state) => ({
        animals: state.animals.map((animal) => ({
          ...animal,
          events: animal.events?.filter((evt) => evt.id !== id),
        })),
      }));
    } catch (error) {
      console.error('[ERROR] Error al eliminar evento:', error);
      throw error;
    }
  },
}));