import { Events } from '../../interfaces/Events';
import { getDatabase } from '../db';
import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';

export const getEventsByAnimalId = async (animalId: string, page: number = 1, limit: number = 10): Promise<Events[]> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `SELECT * FROM Events WHERE animalId = ? AND fecha >= date('now') ORDER BY fecha ASC LIMIT ? OFFSET ?`,
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
              fecha: item.fecha,
              created_at: item.created_at,
              horaDeseada: item.horaDeseada || 9,
              minutosDeseado: item.minutosDeseado || 0,
              DiaDeseado: item.DiaDeseado,
              MesDeseado: item.MesDeseado,
              AnioDeseado: item.AnioDeseado,
              horaEvento: item.horaEvento || 9,
              minutosEvento: item.minutosEvento || 0,
              DiaEvento: item.DiaEvento,
              MesEvento: item.MesEvento,
              AnioEvento: item.AnioEvento,
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