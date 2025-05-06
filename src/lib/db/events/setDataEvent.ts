import { Events } from '../../interfaces/Events';
import { getDatabase } from '../db';
import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';

export const setDataEvent = async (event: Events): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx: Transaction) => {
        tx.executeSql(
          `INSERT INTO Events (id, animalId, animalName, comentario, fecha, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
          [event.id, event.animalId, event.animalName, event.comentario, event.fecha, event.created_at],
          () => {
            console.log('Evento insertado con éxito');
            resolve();
          },
          (_, error: SQLError) => {
            console.error('Error al insertar evento en la base de datos:', error);
            reject(new Error(`Error al insertar evento: ${error.message}`));
            return false;
          }
        );
      },
      (error: SQLError) => {
        console.error('Error en la transacción:', error);
        reject(new Error(`Error en la transacción: ${error.message}`));
      }
    );
  });
};
