import { Notes } from '../../interfaces/Notes';
import { getDatabase } from '../db';
import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';

export const updateNote = async (note: Notes): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `UPDATE Notas SET nota = ?, fecha = ?, created_at = ? WHERE id = ?`,
        [note.nota, note.fecha, note.created_at, note.id],
        () => {
          resolve();
        },
        (_, error: SQLError) => {
          console.error('Error al actualizar nota:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};