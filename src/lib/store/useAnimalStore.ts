/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-shadow */
import { create } from 'zustand';
import { Transaction, SQLError, SQLiteDatabase } from 'react-native-sqlite-storage';
import { setDataAnimal } from '../db/animals/setDataAnimal';
import { setDataNote, getNotesByAnimalId, updateNote, deleteNote } from '../db/notes';
import { setDataRegister, getRegistersByAnimalId, updateRegister, deleteRegister } from '../db/registers';
import { setDataEvent, getEventsByAnimalId, updateEvent, deleteEvent } from '../db/events';
import { getDatabase } from '../db/db';
import { Animal, ImagesTable, WeightsTable } from '../interfaces/Animal';
import { Notes } from '../interfaces/Notes';
import { Register } from '../interfaces/Register';
import { Events, sendNotifi } from '../interfaces/Events';
import { updateAnimal } from '../db/animals/updateAnimal';
import { notificationUtils } from '../utils/notifi/notificationUtils';

interface AnimalStore {
  animals: Animal[];
  totalAnimals: number;
  events: Events[];
  totalEvents: number;
  notes: Notes[];
  totalNotes: number;
  registers: Register[];
  totalRegisters: number;
  images: ImagesTable[];
  totalImages: number;
  weights: WeightsTable[];
  totalWeights: number;
  loadAnimals: (
    page?: number,
    limit?: number,
    ownerId?: string,
    filters?: Record<string, string | number | boolean | undefined>
  ) => Promise<void>;
  loadEvents: (
    page?: number,
    limit?: number,
    filters?: Record<string, string | number | boolean | undefined>,
    animalsIds?: string[]
  ) => Promise<void>;
  loadNotes: (
    page?: number,
    limit?: number,
    filters?: Record<string, string | number | boolean | undefined>,
    animalsIds?: string[]
  ) => Promise<void>;
  loadRegisters: (
    page?: number,
    limit?: number,
    filters?: Record<string, string | number | boolean | undefined>,
    animalsIds?: string[]
  ) => Promise<void>;
  loadImages: (
    page?: number,
    limit?: number,
    filters?: Record<string, string | number | boolean | undefined>,
    animalsIds?: string[]
  ) => Promise<void>;
  loadWeights: (
    page?: number,
    limit?: number,
    filters?: Record<string, string | number | boolean | undefined>,
    animalsIds?: string[]
  ) => Promise<void>;
  addAnimal: (animal: Animal) => Promise<void>;
  updateAnimal: (animal: Animal) => Promise<void>;
  deleteAnimal: (id: string) => Promise<void>;
  addNote: (note: Notes) => Promise<void>;
  updateNote: (note: Notes) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  addRegister: (register: Register) => Promise<void>;
  updateRegister: (register: Register) => Promise<void>;
  deleteRegister: (id: string) => Promise<void>;
  addEvent: (event: Omit<Events, 'dateNotifi' | 'created_at'>) => Promise<void>;
  updateEvent: (event: Omit<Events, 'created_at'> & { created_at?: string }) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  addImage: (image: ImagesTable) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  addWeight: (weight: WeightsTable) => Promise<void>;
  deleteWeight: (id: string) => Promise<void>;
  updateAnimalPregnancy: (animalId: string, embarazada: boolean) => Promise<void>;
  updateAnimalFavorite: (animalId: string, favorito: boolean) => Promise<void>;
}

// TODO: Separar las funciones en archvivos diferentes
// TODO: Ver como minimizar el codigo de este archivo de otra manera

const calculateNotificationDate = (dateEvent: Date, sendNotifi: sendNotifi): Date => {
  const notifiDate = new Date(dateEvent);

  switch (sendNotifi) {
    case '1d':
      notifiDate.setDate(dateEvent.getDate() - 1);
      break;
    case '2d':
      notifiDate.setDate(dateEvent.getDate() - 2);
      break;
    case '3d':
      notifiDate.setDate(dateEvent.getDate() - 3);
      break;
    case '4d':
      notifiDate.setDate(dateEvent.getDate() - 4);
      break;
    case '5d':
      notifiDate.setDate(dateEvent.getDate() - 5);
      break;
    case '1w':
      notifiDate.setDate(dateEvent.getDate() - 7);
      break;
    case '2w':
      notifiDate.setDate(dateEvent.getDate() - 14);
      break;
    default:
      throw new Error('Invalid sendNotifi value');
  }

  return notifiDate;
};

const getImagesByAnimalId = async (animalId: string, page: number = 1, limit: number = 5): Promise<ImagesTable[]> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `SELECT * FROM Images WHERE animalId = ? ORDER BY fecha DESC LIMIT ? OFFSET ?`,
        [animalId, limit, (page - 1) * limit],
        (_, { rows }) => {
          const images: ImagesTable[] = [];
          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            images.push({
              id: item.id,
              animalId: item.animalId,
              fecha: item.fecha,
              url: item.url,
            });
          }
          resolve(images);
        },
        (_, error: SQLError) => {
          console.error('[ERROR] Error al obtener imágenes:', error.message);
          reject(error);
          return false;
        }
      );
    });
  });
};

const getWeightsByAnimalId = async (animalId: string, page: number = 1, limit: number = 5): Promise<WeightsTable[]> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `SELECT * FROM Weights WHERE animalId = ? ORDER BY fecha DESC LIMIT ? OFFSET ?`,
        [animalId, limit, (page - 1) * limit],
        (_, { rows }) => {
          const weights: WeightsTable[] = [];
          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            weights.push({
              id: item.id,
              animalId: item.animalId,
              fecha: item.fecha,
              peso: item.peso,
            });
          }
          resolve(weights);
        },
        (_, error: SQLError) => {
          console.error('[ERROR] Error al obtener pesos:', error.message);
          reject(error);
          return false;
        }
      );
    });
  });
};

const setDataImage = async (image: ImagesTable): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `INSERT INTO Images (id, animalId, fecha, url) VALUES (?, ?, ?, ?)`,
        [image.id, image.animalId, image.fecha, image.url],
        () => resolve(),
        (_, error: SQLError) => {
          console.error('[ERROR] Error al agregar imagen:', error.message);
          reject(error);
          return false;
        }
      );
    });
  });
};

const deleteImage = async (id: string): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `DELETE FROM Images WHERE id = ?`,
        [id],
        () => resolve(),
        (_, error: SQLError) => {
          console.error('[ERROR] Error al eliminar imagen:', error.message);
          reject(error);
          return false;
        }
      );
    });
  });
};

const setDataWeight = async (weight: WeightsTable): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `INSERT INTO Weights (id, animalId, fecha, peso) VALUES (?, ?, ?, ?)`,
        [weight.id, weight.animalId, weight.fecha, weight.peso],
        () => resolve(),
        (_, error: SQLError) => {
          console.error('[ERROR] Error al agregar peso:', error.message);
          reject(error);
          return false;
        }
      );
    });
  });
};

const deleteWeight = async (id: string): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `DELETE FROM Weights WHERE id = ?`,
        [id],
        () => resolve(),
        (_, error: SQLError) => {
          console.error('[ERROR] Error al eliminar peso:', error.message);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const useAnimalStore = create<AnimalStore>((set, get) => ({
  animals: [],
  totalAnimals: 0,
  events: [],
  totalEvents: 0,
  notes: [],
  totalNotes: 0,
  registers: [],
  totalRegisters: 0,
  images: [],
  totalImages: 0,
  weights: [],
  totalWeights: 0,

  loadAnimals: async (page = 1, limit = 10, ownerId, filters = {}) => {
    const db: SQLiteDatabase = await getDatabase();
    return new Promise((resolve, reject) => {
      db.transaction((tx: Transaction) => {
        let whereClause = '';
        const filterParams: (string | number)[] = [];
        const filterConditions: string[] = [];
        let orderBy = 'created_at DESC';

        if (ownerId) {
          filterConditions.push('ownerId = ?');
          filterParams.push(ownerId);
        }
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
                  const notes = await getNotesByAnimalId(item.id, 1, 5);
                  const registers = await getRegistersByAnimalId(item.id, 1, 5);
                  const events = await getEventsByAnimalId(item.id, 1, 5);
                  const images = await getImagesByAnimalId(item.id, 1, 5);
                  const pesos = await getWeightsByAnimalId(item.id, 1, 5);

                  animals.push({
                    id: item.id,
                    ownerId: item.ownerId,
                    identificador: item.identificador,
                    nombre: item.nombre,
                    especie: item.especie,
                    raza: item.raza,
                    nacimiento: item.nacimiento,
                    genero: item.genero,
                    color: item.color,
                    descripcion: item.descripcion,
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
                    images,
                    pesos,
                  });
                }
                set({ animals, totalAnimals });
                resolve();
              },
              (_, error: SQLError) => {
                console.error('[ERROR] Error al cargar animales:', error.message);
                reject(error);
                return false;
              }
            );
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al contar animales:', error.message);
            reject(error);
            return false;
          }
        );
      });
    });
  },

  loadEvents: async (page = 1, limit = 10, filters = {}, animalsIds: string[] = []) => {
    const db: SQLiteDatabase = await getDatabase();
    return new Promise((resolve, reject) => {
      if (!animalsIds || animalsIds.length === 0) {
        set({ events: [], totalEvents: 0 });
        resolve();
        return;
      }

      db.transaction((tx: Transaction) => {
        let whereClause = '';
        const filterParams: (string | number)[] = [];
        const filterConditions: string[] = [];
        let orderBy = 'dateEvent DESC';

        const placeholders = animalsIds.map(() => '?').join(', ');
        filterConditions.push(`animalId IN (${placeholders})`);
        filterParams.push(...animalsIds);

        if (filters.animalId) {
          filterConditions.push('animalId = ?');
          filterParams.push(String(filters.animalId));
        }
        if (filters.comentario) {
          filterConditions.push('comentario LIKE ?');
          filterParams.push(`%${String(filters.comentario)}%`);
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
                    created_at: item.created_at,
                    dateEvent: item.dateEvent,
                    dateNotifi: item.dateNotifi,
                    sendNotifi: item.sendNotifi as sendNotifi,
                  });
                }
                set({ events, totalEvents });
                resolve();
              },
              (_, error: SQLError) => {
                console.error('[ERROR] Error al cargar eventos:', error.message);
                reject(error);
                return false;
              }
            );
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al contar eventos:', error.message);
            reject(error);
            return false;
          }
        );
      });
    });
  },

  loadNotes: async (page = 1, limit = 10, filters = {}, animalsIds: string[] = []) => {
    const db: SQLiteDatabase = await getDatabase();
    return new Promise((resolve, reject) => {
      if (!animalsIds || animalsIds.length === 0) {
        set({ notes: [], totalNotes: 0 });
        resolve();
        return;
      }

      db.transaction((tx: Transaction) => {
        let whereClause = '';
        const filterParams: (string | number)[] = [];
        const filterConditions: string[] = [];
        let orderBy = 'created_at DESC';

        const placeholders = animalsIds.map(() => '?').join(', ');
        filterConditions.push(`animalId IN (${placeholders})`);
        filterParams.push(...animalsIds);

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
                console.error('[ERROR] Error al cargar notas:', error.message);
                reject(error);
                return false;
              }
            );
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al contar notas:', error.message);
            reject(error);
            return false;
          }
        );
      });
    });
  },

  loadRegisters: async (page = 1, limit = 10, filters = {}, animalsIds: string[] = []) => {
    const db: SQLiteDatabase = await getDatabase();
    return new Promise((resolve, reject) => {
      if (!animalsIds || animalsIds.length === 0) {
        set({ registers: [], totalRegisters: 0 });
        resolve();
        return;
      }
      db.transaction((tx: Transaction) => {
        let whereClause = '';
        const filterParams: (string | number)[] = [];
        const filterConditions: string[] = [];
        let orderBy = 'fecha DESC';

        const placeholders = animalsIds.map(() => '?').join(', ');
        filterConditions.push(`animalId IN (${placeholders})`);
        filterParams.push(...animalsIds);

        if (filters.animalId) {
          filterConditions.push('animalId = ?');
          filterParams.push(String(filters.animalId));
        }
        if (filters.comentario) {
          filterConditions.push('comentario LIKE ?');
          filterParams.push(`%${String(filters.comentario)}%`);
        }
        if (filters.Reciente === true) {
          orderBy = 'fecha DESC';
        }
        if (filters.Antiguo === true) {
          orderBy = 'fecha ASC';
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
                console.error('[ERROR] Error al cargar registros:', error.message);
                reject(error);
                return false;
              }
            );
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al contar registros:', error.message);
            reject(error);
            return false;
          }
        );
      }, (error) => {
        console.error('[ERROR] Error en la transacción:', error.message);
        reject(error);
      });
    });
  },

  loadImages: async (page = 1, limit = 10, filters = {}, animalsIds: string[] = []) => {
    const db: SQLiteDatabase = await getDatabase();
    return new Promise((resolve, reject) => {
      if (!animalsIds || animalsIds.length === 0) {
        set({ images: [], totalImages: 0 });
        resolve();
        return;
      }

      db.transaction((tx: Transaction) => {
        let whereClause = '';
        const filterParams: (string | number)[] = [];
        const filterConditions: string[] = [];
        let orderBy = 'fecha DESC';

        const placeholders = animalsIds.map(() => '?').join(', ');
        filterConditions.push(`animalId IN (${placeholders})`);
        filterParams.push(...animalsIds);

        if (filters.animalId) {
          filterConditions.push('animalId = ?');
          filterParams.push(String(filters.animalId));
        }
        if (filters.Reciente === true) {
          orderBy = 'fecha DESC';
        }
        if (filters.Antiguo === true) {
          orderBy = 'fecha ASC';
        }

        if (filterConditions.length > 0) {
          whereClause = `WHERE ${filterConditions.join(' AND ')}`;
        }

        tx.executeSql(
          `SELECT COUNT(*) as count FROM Images ${whereClause}`,
          filterParams,
          (_, { rows }) => {
            const totalImages = rows.item(0).count;

            tx.executeSql(
              `SELECT * FROM Images ${whereClause} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
              [...filterParams, limit, (page - 1) * limit],
              (_, { rows }) => {
                const images: ImagesTable[] = [];
                for (let i = 0; i < rows.length; i++) {
                  const item = rows.item(i);
                  images.push({
                    id: item.id,
                    animalId: item.animalId,
                    fecha: item.fecha,
                    url: item.url,
                  });
                }
                set({ images, totalImages });
                resolve();
              },
              (_, error: SQLError) => {
                console.error('[ERROR] Error al cargar imágenes:', error.message);
                reject(error);
                return false;
              }
            );
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al contar imágenes:', error.message);
            reject(error);
            return false;
          }
        );
      });
    });
  },

  loadWeights: async (page = 1, limit = 10, filters = {}, animalsIds: string[] = []) => {
    const db: SQLiteDatabase = await getDatabase();
    return new Promise((resolve, reject) => {
      if (!animalsIds || animalsIds.length === 0) {
        set({ weights: [], totalWeights: 0 });
        resolve();
        return;
      }

      db.transaction((tx: Transaction) => {
        let whereClause = '';
        const filterParams: (string | number)[] = [];
        const filterConditions: string[] = [];
        let orderBy = 'fecha DESC';

        const placeholders = animalsIds.map(() => '?').join(', ');
        filterConditions.push(`animalId IN (${placeholders})`);
        filterParams.push(...animalsIds);

        if (filters.animalId) {
          filterConditions.push('animalId = ?');
          filterParams.push(String(filters.animalId));
        }
        if (filters.Reciente === true) {
          orderBy = 'fecha DESC';
        }
        if (filters.Antiguo === true) {
          orderBy = 'fecha ASC';
        }

        if (filterConditions.length > 0) {
          whereClause = `WHERE ${filterConditions.join(' AND ')}`;
        }

        tx.executeSql(
          `SELECT COUNT(*) as count FROM Weights ${whereClause}`,
          filterParams,
          (_, { rows }) => {
            const totalWeights = rows.item(0).count;

            tx.executeSql(
              `SELECT * FROM Weights ${whereClause} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
              [...filterParams, limit, (page - 1) * limit],
              (_, { rows }) => {
                const weights: WeightsTable[] = [];
                for (let i = 0; i < rows.length; i++) {
                  const item = rows.item(i);
                  weights.push({
                    id: item.id,
                    animalId: item.animalId,
                    fecha: item.fecha,
                    peso: item.peso,
                  });
                }
                set({ weights, totalWeights });
                resolve();
              },
              (_, error: SQLError) => {
                console.error('[ERROR] Error al cargar pesos:', error.message);
                reject(error);
                return false;
              }
            );
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al contar pesos:', error.message);
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
        animals: [{ ...animal, notes: [], registers: [], events: [], images: [], pesos: [] }, ...state.animals.slice(0, 9)],
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
            nacimiento = ?, genero = ?, color = ?, descripcion = ?,
            proposito = ?, ubicacion = ?, created_at = ?, updated_at = ?,
            embarazada = ?, favorito = ?, isPublic = ?, isRespalded = ?, isChanged = ?
            WHERE id = ?`,
          [
            updatedAnimal.ownerId,
            updatedAnimal.identificador,
            updatedAnimal.nombre,
            updatedAnimal.especie,
            updatedAnimal.raza,
            updatedAnimal.nacimiento,
            updatedAnimal.genero,
            updatedAnimal.color,
            updatedAnimal.descripcion,
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
                  ? {
                      ...updatedAnimal,
                      notes: animal.notes,
                      registers: animal.registers,
                      events: animal.events,
                      images: animal.images,
                      pesos: animal.pesos,
                    }
                  : animal
              ),
            }));
            resolve();
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al actualizar animal:', error.message);
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
        tx.executeSql(
          `DELETE FROM Notas WHERE animalId = ?`,
          [id],
          () => {
            tx.executeSql(
              `DELETE FROM Register WHERE animalId = ?`,
              [id],
              () => {
                tx.executeSql(
                  `DELETE FROM Events WHERE animalId = ?`,
                  [id],
                  () => {
                    tx.executeSql(
                      `DELETE FROM Images WHERE animalId = ?`,
                      [id],
                      () => {
                        tx.executeSql(
                          `DELETE FROM Weights WHERE animalId = ?`,
                          [id],
                          () => {
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
                                  totalEvents: state.totalEvents - state.events.filter((evt) => evt.animalId === id).length,
                                  images: state.images.filter((img) => img.animalId !== id),
                                  totalImages: state.totalImages - state.images.filter((img) => img.animalId === id).length,
                                  weights: state.weights.filter((wt) => wt.animalId !== id),
                                  totalWeights: state.totalWeights - state.weights.filter((wt) => wt.animalId === id).length,
                                }));
                                resolve();
                              },
                              (_, error: SQLError) => {
                                console.error('[ERROR] Error al eliminar animal:', error.message);
                                reject(error);
                                return false;
                              }
                            );
                          },
                          (_, error: SQLError) => {
                            console.error('[ERROR] Error al eliminar pesos:', error.message);
                            reject(error);
                            return false;
                          }
                        );
                      },
                      (_, error: SQLError) => {
                        console.error('[ERROR] Error al eliminar imágenes:', error.message);
                        reject(error);
                        return false;
                      }
                    );
                  },
                  (_, error: SQLError) => {
                    console.error('[ERROR] Error al eliminar eventos:', error.message);
                    reject(error);
                    return false;
                  }
                );
              },
              (_, error: SQLError) => {
                console.error('[ERROR] Error al eliminar registros:', error.message);
                reject(error);
                return false;
              }
            );
          },
          (_, error: SQLError) => {
            console.error('[ERROR] Error al eliminar notas:', error.message);
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

  addEvent: async (event: Omit<Events, 'dateNotifi' | 'created_at'>) => {
    try {
      const dateEvent = new Date(event.dateEvent);
      const dateNotifi = calculateNotificationDate(dateEvent, event.sendNotifi);

      const fullEvent: Events = {
        ...event,
        created_at: new Date().toISOString(),
        dateNotifi: dateNotifi.toISOString(),
      };

      await setDataEvent(fullEvent);

      const notifiResult = await notificationUtils.scheduleEventNotifications(fullEvent);
      if (!notifiResult.success) {
        throw new Error('Failed to schedule notifications');
      }

      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === event.animalId
            ? { ...animal, events: [fullEvent, ...(animal.events || []).slice(0, 9)] }
            : animal
        ),
        events: [fullEvent, ...state.events.slice(0, 9)],
        totalEvents: state.totalEvents + 1,
      }));
    } catch (error: any) {
      console.error('[ERROR] Error al agregar evento:', error.message);
      throw new Error(`No se pudo agregar el evento: ${error.message || 'Error desconocido'}`);
    }
  },

  updateEvent: async (event: Omit<Events, 'created_at'> & { created_at?: string }) => {
    try {
      const dateEvent = new Date(event.dateEvent);
      const dateNotifi = calculateNotificationDate(dateEvent, event.sendNotifi);

      const existingEvent = get().events.find((evt) => evt.id === event.id);
      const createdAt = event.created_at || existingEvent?.created_at || new Date().toISOString();

      const fullEvent: Events = {
        ...event,
        created_at: createdAt,
        dateNotifi: dateNotifi.toISOString(),
      };

      await updateEvent(fullEvent);

      const notifiResult = await notificationUtils.editScheduledNotifications(fullEvent);
      if (!notifiResult.success) {
        throw new Error('Failed to edit notifications');
      }

      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === event.animalId
            ? {
                ...animal,
                events: animal.events?.map((evt) =>
                  evt.id === event.id ? fullEvent : evt
                ),
              }
            : animal
        ),
        events: state.events.map((evt) =>
          evt.id === event.id ? fullEvent : evt
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

      const notifiResult = await notificationUtils.deleteScheduledNotifications(id);
      if (!notifiResult.success) {
        throw new Error('Failed to delete notifications');
      }

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

  addImage: async (image: ImagesTable) => {
    try {
      await setDataImage(image);
      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === image.animalId
            ? { ...animal, images: [image, ...(animal.images || []).slice(0, 9)] }
            : animal
        ),
        images: [image, ...state.images.slice(0, 9)],
        totalImages: state.totalImages + 1,
      }));
    } catch (error) {
      console.error('[ERROR] Error al agregar imagen:', error);
      throw error;
    }
  },

  deleteImage: async (id: string) => {
    try {
      await deleteImage(id);
      set((state) => ({
        animals: state.animals.map((animal) => ({
          ...animal,
          images: animal.images?.filter((img) => img.id !== id),
        })),
        images: state.images.filter((img) => img.id !== id),
        totalImages: state.totalImages - 1,
      }));
    } catch (error) {
      console.error('[ERROR] Error al eliminar imagen:', error);
      throw error;
    }
  },

  addWeight: async (weight: WeightsTable) => {
    try {
      await setDataWeight(weight);
      set((state) => ({
        animals: state.animals.map((animal) =>
          animal.id === weight.animalId
            ? { ...animal, pesos: [weight, ...(animal.pesos || []).slice(0, 9)] }
            : animal
        ),
        weights: [weight, ...state.weights.slice(0, 9)],
        totalWeights: state.totalWeights + 1,
      }));
    } catch (error) {
      console.error('[ERROR] Error al agregar peso:', error);
      throw error;
    }
  },

  deleteWeight: async (id: string) => {
    try {
      await deleteWeight(id);
      set((state) => ({
        animals: state.animals.map((animal) => ({
          ...animal,
          pesos: animal.pesos?.filter((wt) => wt.id !== id),
        })),
        weights: state.weights.filter((wt) => wt.id !== id),
        totalWeights: state.totalWeights - 1,
      }));
    } catch (error) {
      console.error('[ERROR] Error al eliminar peso:', error);
      throw error;
    }
  },
}));
