import { Events } from "../../interfaces/Events";
import { db } from "../db";

export const setDataEvent = (event: Events): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Events (id, animalId, animalName, comentario, fecha, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          event.id,
          event.animalId,
          event.animalName,
          event.comentario,
          event.fecha,
          event.created_at,
        ],
        (_, result) => {
          console.log('Evento insertado con éxito:', result);
          resolve();
        },
        (_, error) => {
          console.error('Error al insertar evento en la base de datos:', error);
          reject(new Error(`Error al insertar evento: ${error.message}`));
          return false;
        }
      );
    }, (error) => {
      console.error('Error en la transacción:', error);
      reject(new Error(`Error en la transacción: ${error.message}`));
    });
  });
};