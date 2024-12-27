import { db } from "../db";

export const getRegisteredAnimalsCount = (ownerId: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT COUNT(*) as count FROM Animal WHERE ownerId = ?`,
        [ownerId],
        (_, result) => {
          const count = result.rows.item(0)?.count || 0;
          resolve(count);
        },
        (_, error) => {
          console.error("Error al contar animales registrados:", error);
          reject(error);
        }
      );
    });
  });
};
