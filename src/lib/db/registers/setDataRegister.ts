import { Register } from '../../interfaces/Register';
import { getDatabase } from '../db';
import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';

export const setDataRegister = async (register: Register): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `INSERT INTO Register (id, animalId, comentario, accion, fecha) VALUES (?, ?, ?, ?, ?)`,
        [register.id, register.animalId, register.comentario, register.accion, register.fecha],
        () => {
          resolve();
        },
        (_, error: SQLError) => {
          console.error('Error en SQL:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};