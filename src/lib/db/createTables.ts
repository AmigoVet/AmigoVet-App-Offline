import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';
import { getDatabase } from './db';

// Función principal para crear todas las tablas y ejecutar migraciones
export const createTables = async (): Promise<void> => {
  const db = await getDatabase();
  await createAnimalTable(db);
  await createRegisterTable(db);
  await createNotesTable(db);
  await createEventsTable(db);
  await createChatsTable(db);
  await createMessagesTable(db);
  console.log('All tables created and migrated successfully');
};

// Crear tabla Animal
const createAnimalTable = async (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Animal (
          id TEXT PRIMARY KEY,
          ownerId TEXT,
          identificador TEXT,
          nombre TEXT,
          especie TEXT,
          raza TEXT,
          nacimiento TEXT,
          genero TEXT,
          peso TEXT,
          color TEXT,
          descripcion TEXT,
          image TEXT,
          image2 TEXT,
          image3 TEXT,
          proposito TEXT,
          ubicacion TEXT,
          created_at TEXT,
          updated_at TEXT,
          embarazada INTEGER DEFAULT 0,
          favorito INTEGER DEFAULT 0,
          isPublic INTEGER DEFAULT 0,
          isRespalded INTEGER DEFAULT 0,
          isChanged INTEGER DEFAULT 0
        )`,
        [],
        () => {
          console.log('[SUCCESS] Tabla Animal creada exitosamente');
          verifyTableExists(db, 'Animal');
          resolve();
        },
        (_: Transaction, error: SQLError) => {
          console.error('[ERROR] Error al crear la tabla Animal:', {
            message: error.message,
            code: error.code,
            sql: 'CREATE TABLE IF NOT EXISTS Animal ...',
          });
          reject(error);
          return false;
        }
      );
    });
  });
};

// Crear tabla Register
const createRegisterTable = async (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Register (
          id TEXT PRIMARY KEY,
          animalId TEXT,
          comentario TEXT,
          accion TEXT,
          fecha TEXT,
          FOREIGN KEY (animalId) REFERENCES Animal (id) ON DELETE CASCADE
        )`,
        [],
        () => {
          console.log('[SUCCESS] Tabla Register creada exitosamente');
          verifyTableExists(db, 'Register');
          resolve();
        },
        (_: Transaction, error: SQLError) => {
          console.error('[ERROR] Error al crear la tabla Register:', {
            message: error.message,
            code: error.code,
            sql: 'CREATE TABLE IF NOT EXISTS Register ...',
          });
          reject(error);
          return false;
        }
      );
    });
  });
};

// Crear tabla Notas
const createNotesTable = async (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Notas (
          id TEXT PRIMARY KEY NOT NULL,
          animalId TEXT NOT NULL,
          nota TEXT NOT NULL,
          fecha TEXT NOT NULL,
          created_at TEXT NOT NULL,
          FOREIGN KEY (animalId) REFERENCES Animal (id) ON DELETE CASCADE
        )`,
        [],
        () => {
          console.log('[SUCCESS] Tabla Notas creada exitosamente');
          verifyTableExists(db, 'Notas');
          resolve();
        },
        (_: Transaction, error: SQLError) => {
          console.error('[ERROR] Error al crear la tabla Notas:', {
            message: error.message,
            code: error.code,
            sql: 'CREATE TABLE IF NOT EXISTS Notas ...',
          });
          reject(error);
          return false;
        }
      );
    });
  });
};

// Crear tabla Events (actualizada con notificationTime)
const createEventsTable = async (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Events (
          id TEXT PRIMARY KEY NOT NULL,
          animalId TEXT NOT NULL,
          animalName TEXT NOT NULL,
          comentario TEXT NOT NULL,
          fecha TEXT NOT NULL,
          created_at TEXT NOT NULL,
          notificationTime TEXT, -- Nueva columna
          FOREIGN KEY (animalId) REFERENCES Animal (id) ON DELETE CASCADE
        )`,
        [],
        () => {
          console.log('[SUCCESS] Tabla Events creada exitosamente');
          verifyTableExists(db, 'Events');
          resolve();
        },
        (_: Transaction, error: SQLError) => {
          console.error('[ERROR] Error al crear la tabla Events:', {
            message: error.message,
            code: error.code,
            sql: 'CREATE TABLE IF NOT EXISTS Events ...',
          });
          reject(error);
          return false;
        }
      );
    });
  });
};


// Crear tabla Chats
const createChatsTable = async (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Chats (
          id TEXT PRIMARY KEY NOT NULL,
          animalId TEXT NOT NULL,
          title TEXT NOT NULL,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          FOREIGN KEY (animalId) REFERENCES Animal (id) ON DELETE CASCADE
        )`,
        [],
        () => {
          console.log('[SUCCESS] Tabla Chats creada exitosamente');
          verifyTableExists(db, 'Chats');
          resolve();
        },
        (_: Transaction, error: SQLError) => {
          console.error('[ERROR] Error al crear la tabla Chats:', {
            message: error.message,
            code: error.code,
            sql: 'CREATE TABLE IF NOT EXISTS Chats ...',
          });
          reject(error);
          return false;
        }
      );
    });
  });
};

// Crear tabla Messages
const createMessagesTable = async (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Messages (
          id TEXT PRIMARY KEY NOT NULL,
          chatId TEXT NOT NULL,
          content TEXT NOT NULL,
          owner TEXT NOT NULL,
          created_at TEXT NOT NULL,
          FOREIGN KEY (chatId) REFERENCES Chats (id) ON DELETE CASCADE
        )`,
        [],
        () => {
          console.log('[SUCCESS] Tabla Messages creada exitosamente');
          verifyTableExists(db, 'Messages');
          resolve();
        },
        (_: Transaction, error: SQLError) => {
          console.error('[ERROR] Error al crear la tabla Messages:', {
            message: error.message,
            code: error.code,
            sql: 'CREATE TABLE IF NOT EXISTS Messages ...',
          });
          reject(error);
          return false;
        }
      );
    });
  });
};

// Verificar existencia de una tabla
const verifyTableExists = (db: SQLiteDatabase, tableName: string): void => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
      [tableName],
      (_: Transaction, { rows }: { rows: any }) => {
        if (rows.length > 0) {
          tx.executeSql(
            `PRAGMA table_info(${tableName})`,
            [],
            (_: Transaction, { rows: tableInfo }: { rows: any }) => {
              // Opcional: Mostrar estructura de la tabla
            },
            (_: Transaction, error: SQLError) => {
              console.error(`[ERROR] No se pudo obtener la estructura de ${tableName}:`, error);
              return false;
            }
          );
        } else {
          console.warn(`[WARN] La tabla ${tableName} no se encontró`);
        }
      },
      (_: Transaction, error: SQLError) => {
        console.error(`[ERROR] Error verificando existencia de ${tableName}:`, error);
        return false;
      }
    );
  });
};