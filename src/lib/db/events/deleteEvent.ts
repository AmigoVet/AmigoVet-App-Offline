import { getDatabase } from '../db';
import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';

export const deleteEvent = async (id: string): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `DELETE FROM Events WHERE id = ?`,
        [id],
        () => {
          resolve();
        },
        (_, error: SQLError) => {
          console.error('Error al eliminar evento:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};