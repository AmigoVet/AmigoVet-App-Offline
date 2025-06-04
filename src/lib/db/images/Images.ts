import { Transaction, SQLError, SQLiteDatabase } from 'react-native-sqlite-storage';
import { getDatabase } from '../db';
import { ImagesTable } from '../../interfaces/Animal';

export const getImagesByAnimalId = async (animalId: string, page: number = 1, limit: number = 5): Promise<ImagesTable[]> => {
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



export const setDataImage = async (image: ImagesTable): Promise<void> => {
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

export const deleteImage = async (id: string): Promise<void> => {
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
