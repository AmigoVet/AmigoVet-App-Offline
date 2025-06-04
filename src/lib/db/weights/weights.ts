import { Transaction, SQLError, SQLiteDatabase } from 'react-native-sqlite-storage';
import { getDatabase } from '../db';
import { WeightsTable } from '../../interfaces/Animal';


export const getWeightsByAnimalId = async (animalId: string, page: number = 1, limit: number = 5): Promise<WeightsTable[]> => {
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


export const setDataWeight = async (weight: WeightsTable): Promise<void> => {
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

export const deleteWeight = async (id: string): Promise<void> => {
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
