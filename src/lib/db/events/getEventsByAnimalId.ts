import { Events, sendNotifi } from '../../interfaces/Events';
import { getDatabase } from '../db';
import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';

export const getEventsByAnimalId = async (
  animalId: string,
  page: number = 1,
  limit: number = 5
): Promise<Events[]> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `SELECT * FROM Events WHERE animalId = ? AND dateEvent >= date('now') ORDER BY dateEvent ASC LIMIT ? OFFSET ?`,
        [animalId, limit, (page - 1) * limit],
        (_, { rows }) => {
          const events: Events[] = [];
          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            events.push({
              id: item.id,
              animalId: item.animalId,
              animalName: item.animalName,
              comentario: item.comentario,
              created_at: item.created_at,
              dateEvent: item.dateEvent,
              dateNotifi: item.dateNotifi,
              sendNotifi: item.sendNotifi as sendNotifi,
            });
          }
          resolve(events);
        },
        (_, error: SQLError) => {
          console.error('Error al obtener eventos:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};