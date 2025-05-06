import { Register } from '../../interfaces/Register';
import { getDatabase } from '../db';
import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';

export const updateRegister = async (register: Register): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `UPDATE Register SET comentario = ?, accion = ?, fecha = ? WHERE id = ?`,
        [register.comentario, register.accion, register.fecha, register.id],
        () => {
          resolve();
        },
        (_, error: SQLError) => {
          console.error('Error al actualizar registro:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};