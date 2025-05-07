import { Events } from '../../interfaces/Events';
import { getDatabase } from '../db';
import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';

export const updateEvent = async (event: Events): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `UPDATE Events SET
          animalName = ?,
          comentario = ?,
          fecha = ?,
          created_at = ?,
          horaDeseada = ?,
          minutosDeseado = ?,
          DiaDeseado = ?,
          MesDeseado = ?,
          AnioDeseado = ?,
          horaEvento = ?,
          minutosEvento = ?,
          DiaEvento = ?,
          MesEvento = ?,
          AnioEvento = ?
        WHERE id = ?`,
        [
          event.animalName,
          event.comentario,
          event.fecha,
          event.created_at,
          event.horaDeseada,
          event.minutosDeseado,
          event.DiaDeseado,
          event.MesDeseado,
          event.AnioDeseado,
          event.horaEvento,
          event.minutosEvento,
          event.DiaEvento,
          event.MesEvento,
          event.AnioEvento,
          event.id,
        ],
        () => {
          resolve();
        },
        (_, error: SQLError) => {
          console.error('Error al actualizar evento:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};