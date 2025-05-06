import { getDatabase } from '../db';
import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';

export const updateAnimal = async (animalId: string, updates: { embarazada?: boolean; favorito?: boolean }): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject: (error: SQLError | unknown) => void) => {
    db.transaction((tx: Transaction) => {
      const fields: string[] = [];
      const values: (number | string)[] = [];

      if (updates.embarazada !== undefined) {
        fields.push('embarazada = ?');
        values.push(updates.embarazada ? 1 : 0);
      }
      if (updates.favorito !== undefined) {
        fields.push('favorito = ?');
        values.push(updates.favorito ? 1 : 0);
      }

      if (fields.length === 0) {
        resolve();
        return;
      }

      values.push(animalId);
      const query = `UPDATE Animal SET ${fields.join(', ')} WHERE id = ?`;

      tx.executeSql(
        query,
        values,
        () => resolve(),
        (_, error: SQLError) => {
          reject(error);
          return false;
        }
      );
    });
  });
};
