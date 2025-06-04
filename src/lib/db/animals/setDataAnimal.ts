import { Animal } from '../../interfaces/Animal';
import { getDatabase } from '../db';
import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';

export const setDataAnimal = async (animal: Animal): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `INSERT INTO Animal (id, ownerId, identificador, nombre, especie, raza, nacimiento, genero, color, descripcion, proposito, ubicacion, created_at, updated_at, embarazada, favorito, isPublic, isRespalded, isChanged) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          animal.id,
          animal.ownerId,
          animal.identificador,
          animal.nombre,
          animal.especie || null,
          animal.raza || null,
          animal.nacimiento || null,
          animal.genero || null,
          animal.color || null,
          animal.descripcion || null,
          animal.proposito || null,
          animal.ubicacion || null,
          animal.created_at,
          animal.updated_at,
          animal.embarazada ? 1 : 0,
          animal.favorito ? 1 : 0,
          animal.isPublic ? 1 : 0,
          animal.isRespalded ? 1 : 0,
          animal.isChanged ? 1 : 0,
        ],
        () => {
          resolve();
        },
        (_, error: SQLError) => {
          console.error('Error en SQL:', error.message);
          reject(error);
          return false;
        }
      );
    }, (error) => {
      console.error('Error en la transacción:', error.message);
      reject(error);
    });
  });
};
