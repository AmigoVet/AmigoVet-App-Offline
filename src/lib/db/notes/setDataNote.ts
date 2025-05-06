import { Notes } from '../../interfaces/Notes';
import { getDatabase } from '../db';
import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';

export const setDataNote = async (note: Notes): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `INSERT INTO Notas (id, animalId, nota, fecha, created_at) VALUES (?, ?, ?, ?, ?)`,
        [note.id, note.animalId, note.nota, note.fecha, note.created_at],
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