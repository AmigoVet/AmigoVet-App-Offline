import { db } from '../db';

export const updateAnimal = (animalId: string, updates: { embarazada?: boolean }): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE Animal SET embarazada = ? WHERE id = ?`,
        [updates.embarazada ? 1 : 0, animalId],
        (_, result) => {
          resolve();
        },
        (_, error) => {
          console.error('[ERROR] Error al actualizar animal:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};