import { getDatabase } from '../db';
import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';

export const deleteNote = async (id: string): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `DELETE FROM Notas WHERE id = ?`,
        [id],
        () => {
          resolve();
        },
        (_, error: SQLError) => {
          console.error('Error al eliminar nota:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};