import { db } from "../db";

export const getLastThreeRegisters = (ownerId: string): Promise<{ nombre: string; identificador: string; fecha: string; comentario: string; accion: string }[]> => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT 
            r.fecha, 
            r.comentario, 
            r.accion, 
            a.nombre, 
            a.identificador 
          FROM Register r
          INNER JOIN Animal a ON r.animalId = a.id
          WHERE a.ownerId = ?
          ORDER BY r.fecha DESC
          LIMIT 3`,
          [ownerId],
          (_, result) => {
            const registers = [];
            for (let i = 0; i < result.rows.length; i++) {
              registers.push(result.rows.item(i));
            }
            resolve(registers);
          },
          (_, error) => {
            console.error("Error al obtener los últimos tres registros:", error);
            reject(error);
          }
        );
      });
    });
  };
  