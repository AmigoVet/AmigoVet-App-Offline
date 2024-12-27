import { db } from "../db";

export const getSpeciesCount = (ownerId: string): Promise<Record<string, number>> => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT especie, COUNT(*) as count FROM Animal WHERE ownerId = ? GROUP BY especie`,
          [ownerId],
          (_, result) => {
            const speciesCount: Record<string, number> = {};
            for (let i = 0; i < result.rows.length; i++) {
              const { especie, count } = result.rows.item(i);
              speciesCount[especie || "Desconocido"] = count;
            }
            resolve(speciesCount);
          },
          (_, error) => {
            console.error("Error al contar especies registradas:", error);
            reject(error);
          }
        );
      });
    });
  };
  