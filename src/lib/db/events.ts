import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';
import { Events } from '../interfaces/Events';
import { getDatabase } from './db';

export const createEventsTable = async (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Events (
          id TEXT PRIMARY KEY NOT NULL,
          animalId TEXT NOT NULL,
          animalName TEXT NOT NULL,
          comentario TEXT NOT NULL,
          created_at TEXT NOT NULL,
          dateEvent TEXT NOT NULL,
          dateNotifi TEXT NOT NULL,
          sendNotifi TEXT NOT NULL,
          FOREIGN KEY (animalId) REFERENCES Animal (id) ON DELETE CASCADE
        )`,
        [],
        () => {
          console.log('[SUCCESS] Tabla Events creada exitosamente');
          resolve();
        },
        (_: Transaction, error: SQLError) => {
          console.error('[ERROR] Error al crear la tabla Events:', {
            message: error.message,
            code: error.code,
          });
          reject(error);
          return false;
        }
      );
    });
  });
};

export const setDataEvent = async (event: Events): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `INSERT INTO Events (
          id, animalId, animalName, comentario, created_at, dateEvent, dateNotifi, sendNotifi
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          event.id,
          event.animalId,
          event.animalName,
          event.comentario,
          event.created_at,
          event.dateEvent,
          event.dateNotifi,
          event.sendNotifi,
        ],
        () => {
          resolve();
        },
        (_: Transaction, error: SQLError) => {
          console.error('[ERROR] Error al insertar evento:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const updateEvent = async (event: Events): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `UPDATE Events SET
          animalId = ?, animalName = ?, comentario = ?, dateEvent = ?, dateNotifi = ?, sendNotifi = ?
        WHERE id = ?`,
        [
          event.animalId,
          event.animalName,
          event.comentario,
          event.dateEvent,
          event.dateNotifi,
          event.sendNotifi,
          event.id,
        ],
        () => {
          resolve();
        },
        (_: Transaction, error: SQLError) => {
          console.error('[ERROR] Error al actualizar evento:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const getEventsByAnimalId = async (
  animalId: string,
  page: number = 1,
  limit: number = 10
): Promise<Events[]> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `SELECT * FROM Events WHERE animalId = ? ORDER BY dateEvent DESC LIMIT ? OFFSET ?`,
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
              sendNotifi: item.sendNotifi,
            });
          }
          resolve(events);
        },
        (_: Transaction, error: SQLError) => {
          console.error('[ERROR] Error al obtener eventos:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const deleteEvent = async (id: string): Promise<void> => {
  const db: SQLiteDatabase = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `DELETE FROM Events WHERE id = ?`,
        [id],
        () => {
          resolve();
        },
        (_: Transaction, error: SQLError) => {
          console.error('[ERROR] Error al eliminar evento:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const migrateEventsTable = async (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Events_New (
          id TEXT PRIMARY KEY NOT NULL,
          animalId TEXT NOT NULL,
          animalName TEXT NOT NULL,
          comentario TEXT NOT NULL,
          created_at TEXT NOT NULL,
          dateEvent TEXT NOT NULL,
          dateNotifi TEXT NOT NULL,
          sendNotifi TEXT NOT NULL,
          FOREIGN KEY (animalId) REFERENCES Animal (id) ON DELETE CASCADE
        )`,
        [],
        () => {
          tx.executeSql(
            `INSERT INTO Events_New (
              id, animalId, animalName, comentario, created_at, dateEvent, dateNotifi, sendNotifi
            )
            SELECT
              id,
              animalId,
              animalName,
              comentario,
              created_at,
              strftime('%Y-%m-%dT%H:%M:00.000Z', AnioEvento || '-' || printf('%02d', MesEvento) || '-' || printf('%02d', DiaEvento) || ' ' || printf('%02d', horaEvento) || ':' || printf('%02d', minutosEvento)),
              strftime('%Y-%m-%dT%H:%M:00.000Z', AnioDeseado || '-' || printf('%02d', MesDeseado) || '-' || printf('%02d', DiaDeseado) || ' ' || printf('%02d', horaDeseada) || ':' || printf('%02d', minutosDeseado)),
              '1d'
            FROM Events`,
            [],
            () => {
              tx.executeSql(`DROP TABLE Events`, [], () => {
                tx.executeSql(`ALTER TABLE Events_New RENAME TO Events`, [], () => {
                  console.log('[SUCCESS] Migración de la tabla Events completada');
                  resolve();
                });
              });
            },
            (_: Transaction, error: SQLError) => {
              console.error('[ERROR] Error al migrar datos:', error);
              reject(error);
              return false;
            }
          );
        },
        (_: Transaction, error: SQLError) => {
          console.error('[ERROR] Error al crear tabla temporal:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};