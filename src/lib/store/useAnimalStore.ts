import { create } from 'zustand';
import { Transaction, SQLError, SQLiteDatabase } from 'react-native-sqlite-storage';
import { setDataAnimal } from '../db/animals/setDataAnimal';
import { setDataNote, getNotesByAnimalId, updateNote, deleteNote } from '../db/notes';
import { setDataRegister, getRegistersByAnimalId, updateRegister, deleteRegister } from '../db/registers';
import { setDataEvent, getEventsByAnimalId, updateEvent, deleteEvent } from '../db/events';
import { getDatabase, getStoragePath } from '../db/db';
import { Animal } from '../interfaces/Animal';
import { Notes } from '../interfaces/Notes';
import { Register } from '../interfaces/Register';
import { Events } from '../interfaces/Events';
import * as RNFS from 'react-native-fs';
import { updateAnimal } from '../db/animals/updateAnimal';

interface AnimalStore {
  animals: Animal[];
  totalAnimals: number;
  events: Events[];
  totalEvents: number;
  notes: Notes[];
  totalNotes: number;
  registers: Register[];
  totalRegisters: number;
  loadAnimals: (page?: number, limit?: number, filters?: Record<string, string | number | boolean | undefined>) => Promise<void>;
  loadEvents: (page?: number, limit?: number, filters?: Record<string, string | number | boolean | undefined>) => Promise<void>;
  loadNotes: (page?: number, limit?: number, filters?: Record<string, string | number | boolean | undefined>) => Promise<void>;
  loadRegisters: (page?: number, limit?: number, filters?: Record<string, string | number | boolean | undefined>) => Promise<void>;
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
  updateAnimalFavorite: (animalId: string, favorito: boolean) => Promise<void>;
}

export const useAnimalStore = create<AnimalStore>((set) => ({
  animals: [],
  totalAnimals: 0,
  events: [],
  totalEvents: 0,
  notes: [],
  totalNotes: 0,
  registers: [],
  totalRegisters: 0,

  loadAnimals: async (page = 1, limit = 10, filters = {}) => {
    const db: SQLiteDatabase = await getDatabase();
    return new Promise((resolve, reject) => {
      db.transaction((tx: Transaction) => {
        let whereClause = '';
        const filterParams: (string | number)[] = [];
        const filterConditions: string[] = [];
        let orderBy = 'created_at DESC';

        if (filters.Género) {
          filterConditions.push('genero = ?');
          filterParams.push(String(filters.Género));
        }
        if (filters.Especie) {
          filterConditions.push('especie = ?');
          filterParams.push(String(filters.Especie));
        }
        if (filters.Raza) {
          filterConditions.push('raza = ?');
          filterParams.push(String(filters.Raza));
        }
        if (filters.Propósito) {
          filterConditions.push('proposito = ?');
          filterParams.push(String(filters.Propósito));
        }
        if (filters.Edad) {
          const edadFiltro = Number(filters.Edad);
          if (edadFiltro === 10) {
            filterConditions.push("strftime('%Y', 'now') - strftime('%Y', nacimiento) >= 10");
          } else {
            filterConditions.push("strftime('%Y', 'now') - strftime('%Y', nacimiento) = ?");
            filterParams.push(edadFiltro);
          }
        }
        if (filters.Reciente === true) {
          orderBy = 'created_at DESC';
        }
        if (filters.Antiguo === true) {
          orderBy = 'created_at ASC';
        }

        if (filterConditions.length > 0) {
          whereClause = `WHERE ${filterConditions.join(' AND ')}`;
        }

        tx.executeSql(
          `SELECT COUNT(*) as count FROM Animal ${whereClause}`,
          filterParams,
          (_, { rows }) => {
            const totalAnimals = rows.item(0).count;

            tx.executeSql(
              `SELECT * FROM Animal ${whereClause} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
              [...filterParams, limit, (page - 1) * limit],
              async (_, { rows }) => {
                const animals: Animal[] = [];
                for (let i = 0; i < rows.length; i++) {
                  const item = rows.item(i);

                  let imagePath = item.image || '';
                  if (imagePath && !imagePath.startsWith('file://')) {
                    imagePath = `file://${getStoragePath()}/animals/${item.image}`;
                  }

                  if (imagePath) {
                    const fileExists = await RNFS.exists(imagePath.replace('file://', ''));
                    if (!fileExists) {
                      imagePath = '';
                    }
                  }

                  let image2Path = item.image2 && !item.image2.startsWith('file://')
                    ? `file://${getStoragePath()}/animals/${item.image2}`
                    : item.image2 || '';
                  let image3Path = item.image3 && !item.image3.startsWith('file://')
                    ? `file://${getStoragePath()}/animals/${item.image3}`
                    : item.image3 || '';

                  if (image2Path && image2Path.startsWith('file://')) {
                    const fileExists = await RNFS.exists(image2Path.replace('file://', ''));
                    if (!fileExists) {
                      image2Path = '';
                    }
                  }
                  if (image3Path && image3Path.startsWith('file://')) {
                    const fileExists = await RNFS.exists(image3Path.replace('file://', ''));
                    if (!fileExists) {
                      image3Path = '';
                    }
                  }

                  const notes = await getNotesByAnimalId(item.id, 1, 10);
                  const registers = await getRegistersByAnimalId(item.id, 1, 10);
                  const events = await getEventsByAnimalId(item.id, 1, 10);

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
                    image2: image2Path,
                    image3: image3Path,
                    proposito: item.proposito,
                    ubicacion: item.ubicacion,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                    embarazada: !!item.embarazada,
                    favorito: !!item.favorito,
                    isPublic: !!item.isPublic,
                    isRespalded: !!item.isRespalded,
                    isChanged: !!item.isChanged,
                    notes,
                    registers,
                    events,
                  });
                }
                set({ animals, totalAnimals });
                resolve();
              },
              (_, error: SQLError) => {
                console.error('[ERROR] Error al cargar animales:', error.message || error);
                reject(error);
                return false;
              }
            );
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al contar animales:', error.message || error);
            reject(error);
            return false;
          }
        );
      });
    });
  },

  loadEvents: async (page = 1, limit = 10, filters = {}) => {
    const db: SQLiteDatabase = await getDatabase();
    return new Promise((resolve, reject) => {
      db.transaction((tx: Transaction) => {
        let whereClause = '';
        const filterParams: (string | number)[] = [];
        const filterConditions: string[] = [];
        let orderBy = 'fecha DESC';

        if (filters.animalId) {
          filterConditions.push('animalId = ?');
          filterParams.push(String(filters.animalId));
        }
        if (filters.comentario) {
          filterConditions.push('comentario LIKE ?');
          filterParams.push(String(filters.comentario));
        }
        if (filters.Reciente === true) {
          orderBy = 'created_at DESC';
        }
        if (filters.Antiguo === true) {
          orderBy = 'created_at ASC';
        }

        if (filterConditions.length > 0) {
          whereClause = `WHERE ${filterConditions.join(' AND ')}`;
        }

        tx.executeSql(
          `SELECT COUNT(*) as count FROM Events ${whereClause}`,
          filterParams,
          (_, { rows }) => {
            const totalEvents = rows.item(0).count;

            tx.executeSql(
              `SELECT * FROM Events ${whereClause} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
              [...filterParams, limit, (page - 1) * limit],
              (_, { rows }) => {
                const events: Events[] = [];
                for (let i = 0; i < rows.length; i++) {
                  const item = rows.item(i);
                  events.push({
                    id: item.id,
                    animalId: item.animalId,
                    animalName: item.animalName,
                    comentario: item.comentario,
                    fecha: item.fecha,
                    created_at: item.created_at,
                    horaDeseada: item.horaDeseada,
                    minutosDeseado: item.minutosDeseado,
                    DiaDeseado: item.DiaDeseado,
                    MesDeseado: item.MesDeseado,
                    AnioDeseado: item.AnioDeseado,
                    horaEvento: item.horaEvento,
                    minutosEvento: item.minutosEvento,
                    DiaEvento: item.DiaEvento,
                    MesEvento: item.MesEvento,
                    AnioEvento: item.AnioEvento,
                  });
                }
                set({ events, totalEvents });
                resolve();
              },
              (_, error: SQLError) => {
                console.error('[ERROR] Error al cargar eventos:', error.message || error);
                reject(error);
                return false;
              }
            );
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al contar eventos:', error.message || error);
            reject(error);
            return false;
          }
        );
      });
    });
  },

  loadNotes: async (page = 1, limit = 10, filters = {}) => {
    const db: SQLiteDatabase = await getDatabase();
    return new Promise((resolve, reject) => {
      db.transaction((tx: Transaction) => {
        let whereClause = '';
        const filterParams: (string | number)[] = [];
        const filterConditions: string[] = [];
        let orderBy = 'created_at DESC';

        if (filters.animalId) {
          filterConditions.push('animalId = ?');
          filterParams.push(String(filters.animalId));
        }
        if (filters.Reciente === true) {
          orderBy = 'created_at DESC';
        }
        if (filters.Antiguo === true) {
          orderBy = 'created_at ASC';
        }

        if (filterConditions.length > 0) {
          whereClause = `WHERE ${filterConditions.join(' AND ')}`;
        }

        tx.executeSql(
          `SELECT COUNT(*) as count FROM Notas ${whereClause}`,
          filterParams,
          (_, { rows }) => {
            const totalNotes = rows.item(0).count;

            tx.executeSql(
              `SELECT * FROM Notas ${whereClause} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
              [...filterParams, limit, (page - 1) * limit],
              (_, { rows }) => {
                const notes: Notes[] = [];
                for (let i = 0; i < rows.length; i++) {
                  const item = rows.item(i);
                  notes.push({
                    id: item.id,
                    animalId: item.animalId,
                    nota: item.nota,
                    fecha: item.fecha,
                    created_at: item.created_at,
                  });
                }
                set({ notes, totalNotes });
                resolve();
              },
              (_, error: SQLError) => {
                console.error('[ERROR] Error al cargar notas:', error.message || error);
                reject(error);
                return false;
              }
            );
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al contar notas:', error.message || error);
            reject(error);
            return false;
          }
        );
      });
    });
  },

  loadRegisters: async (page = 1, limit = 10, filters = {}) => {
    const db: SQLiteDatabase = await getDatabase();
    return new Promise((resolve, reject) => {
      db.transaction((tx: Transaction) => {
        let whereClause = '';
        const filterParams: (string | number)[] = [];
        const filterConditions: string[] = [];
        let orderBy = 'fecha DESC'; // Cambiado de 'created_at' a 'fecha'

        if (filters.animalId) {
          filterConditions.push('animalId = ?');
          filterParams.push(String(filters.animalId));
        }
        if (filters.comentario) {
          filterConditions.push('comentario LIKE ?');
          filterParams.push(String(filters.comentario));
        }
        if (filters.Reciente === true) {
          orderBy = 'fecha DESC'; // Cambiado de 'created_at' a 'fecha'
        }
        if (filters.Antiguo === true) {
          orderBy = 'fecha ASC'; // Cambiado de 'created_at' a 'fecha'
        }

        if (filterConditions.length > 0) {
          whereClause = `WHERE ${filterConditions.join(' AND ')}`;
        }

        tx.executeSql(
          `SELECT COUNT(*) as count FROM Register ${whereClause}`,
          filterParams,
          (_, { rows }) => {
            const totalRegisters = rows.item(0).count;

            tx.executeSql(
              `SELECT * FROM Register ${whereClause} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
              [...filterParams, limit, (page - 1) * limit],
              (_, { rows }) => {
                const registers: Register[] = [];
                for (let i = 0; i < rows.length; i++) {
                  const item = rows.item(i);
                  registers.push({
                    id: item.id,
                    animalId: item.animalId,
                    comentario: item.comentario,
                    accion: item.accion,
                    fecha: item.fecha,
                  });
                }
                set({ registers, totalRegisters });
                resolve();
              },
              (_, error: SQLError) => {
                console.error('[loadRegisters] Error al cargar registros:', error.message || error);
                reject(error);
                return false;
              }
            );
          },
          (_, error: SQLError) => {
            console.error('[loadRegisters] Error al contar registros:', error.message || error);
            reject(error);
            return false;
          }
        );
      }, (error) => {
        console.error('[loadRegisters] Error en la transacción:', error);
        reject(error);
      });
    });
  },

  addAnimal: async (animal: Animal) => {
    try {
      await setDataAnimal(animal);
      set((state) => ({
        animals: [{ ...animal, notes: [], registers: [], events: [] }, ...state.animals.slice(0, 9)],
        totalAnimals: state.totalAnimals + 1,
      }));
    } catch (error) {
      console.error('[ERROR] Error al agregar animal:', error);
      throw error;
    }
  },

  updateAnimal: async (updatedAnimal: Animal) => {
    const db: SQLiteDatabase = await getDatabase();
    return new Promise((resolve, reject) => {
      db.transaction((tx: Transaction) => {
        tx.executeSql(
          `UPDATE Animal SET
            ownerId = ?, identificador = ?, nombre = ?, especie = ?, raza = ?,
            nacimiento = ?, genero = ?, peso = ?, color = ?, descripcion = ?,
            image = ?, image2 = ?, image3 = ?, proposito = ?, ubicacion = ?,
            created_at = ?, updated_at = ?, embarazada = ?, favorito = ?,
            isPublic = ?, isRespalded = ?, isChanged = ?
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
            updatedAnimal.favorito ? 1 : 0,
            updatedAnimal.isPublic ? 1 : 0,
            updatedAnimal.isRespalded ? 1 : 0,
            updatedAnimal.isChanged ? 1 : 0,
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
            console.error('[ERROR] Error al actualizar animal:', error.message || error);
            reject(error);
            return false;
          }
        );
      });
    });
  },

  deleteAnimal: async (id: string) => {
    const db: SQLiteDatabase = await getDatabase();
    return new Promise((resolve, reject) => {
      db.transaction((tx: Transaction) => {
        // Delete from Notas
        tx.executeSql(
          `DELETE FROM Notas WHERE animalId = ?`,
          [id],
          () => {
            // Delete from Register
            tx.executeSql(
              `DELETE FROM Register WHERE animalId = ?`,
              [id],
              () => {
                // Delete from Events
                tx.executeSql(
                  `DELETE FROM Events WHERE animalId = ?`,
                  [id],
                  () => {
                    // Delete from Animal
                    tx.executeSql(
                      `DELETE FROM Animal WHERE id = ?`,
                      [id],
                      () => {
                        set((state) => ({
                          animals: state.animals.filter((animal) => animal.id !== id),
                          totalAnimals: state.totalAnimals - 1,
                          notes: state.notes.filter((note) => note.animalId !== id),
                          totalNotes: state.totalNotes - state.notes.filter((note) => note.animalId === id).length,
                          registers: state.registers.filter((reg) => reg.animalId !== id),
                          totalRegisters: state.totalRegisters - state.registers.filter((reg) => reg.animalId === id).length,
                          events: state.events.filter((evt) => evt.animalId !== id),
                          totalEvents: state.totalEvents - state.events.filter((evt) => evt.animalId === id).length
                        }));
                        resolve();
                      },
                      (_, error: SQLError) => {
                        console.error('[ERROR] Error al eliminar animal:', error.message || error);
                        reject(error);
                        return false;
                      }
                    );
                  },
                  (_, error: SQLError) => {
                    console.error('[ERROR] Error al eliminar eventos:', error.message || error);
                    reject(error);
                    return false;
                  }
                );
              },
              (_, error: SQLError) => {
                console.error('[ERROR] Error al eliminar registros:', error.message || error);
                reject(error);
                return false;
              }
            );
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al eliminar notas:', error.message || error);
            reject(error);
            return false;
          }
        );
      });
    });
  },

  updateAnimalPregnancy: async (animalId: string, embarazada: boolean) => {
    try {
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

  updateAnimalFavorite: async (animalId: string, favorito: boolean) => {
    try {
      await updateAnimal(animalId, { favorito });
      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === animalId ? { ...animal, favorito } : animal
        ),
      }));
    } catch (error) {
      console.error('[ERROR] Error al actualizar estado de favorito:', error);
      throw error;
    }
  },

  addNote: async (note: Notes) => {
    try {
      await setDataNote(note);
      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === note.animalId
            ? { ...animal, notes: [note, ...(animal.notes || []).slice(0, 9)] }
            : animal
        ),
        notes: [note, ...state.notes.slice(0, 9)],
        totalNotes: state.totalNotes + 1,
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
        notes: state.notes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
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
        notes: state.notes.filter((note) => note.id !== id),
        totalNotes: state.totalNotes - 1,
      }));
    } catch (error) {
      console.error('[ERROR] Error al eliminar nota:', error);
      throw error;
    }
  },

  addRegister: async (register: Register) => {
    try {
      await setDataRegister(register);
      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === register.animalId
            ? { ...animal, registers: [register, ...(animal.registers || []).slice(0, 9)] }
            : animal
        ),
        registers: [register, ...state.registers.slice(0, 9)],
        totalRegisters: state.totalRegisters + 1,
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
        registers: state.registers.map((reg) =>
          reg.id === updatedRegister.id ? updatedRegister : reg
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
        registers: state.registers.filter((reg) => reg.id !== id),
        totalRegisters: state.totalRegisters - 1,
      }));
    } catch (error) {
      console.error('[ERROR] Error al eliminar registro:', error);
      throw error;
    }
  },

  addEvent: async (event: Events) => {
    try {
      await setDataEvent(event);
      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === event.animalId
            ? { ...animal, events: [event, ...(animal.events || []).slice(0, 9)] }
            : animal
        ),
        events: [event, ...state.events.slice(0, 9)],
        totalEvents: state.totalEvents + 1,
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
        events: state.events.map((evt) =>
          evt.id === updatedEvent.id ? updatedEvent : evt
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
        events: state.events.filter((evt) => evt.id !== id),
        totalEvents: state.totalEvents - 1,
      }));
    } catch (error) {
      console.error('[ERROR] Error al eliminar evento:', error);
      throw error;
    }
  },
}));
