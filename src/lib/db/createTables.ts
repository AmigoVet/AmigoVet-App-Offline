import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';
import { getDatabase } from './db';

// Función principal para crear todas las tablas y ejecutar migraciones
export const createTables = async (): Promise<void> => {
  console.log('[DEBUG] Starting createTables');
  const db = await getDatabase();
  // await dropAllTables(db); // Uncomment for one-time full reset
  await createAnimalTable(db);
  await createRegisterTable(db);
  await createNotesTable(db);
  await createEventsTable(db);
  await createChatsTable(db);
  await createMessagesTable(db);
  await createImagesTable(db);
  await createWeightsTable(db);
  await logTableSchemas(db);
  console.log('[SUCCESS] All tables created and migrated successfully');
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
          color TEXT,
          descripcion TEXT,
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

// Crear tabla Events
const createEventsTable = async (db: SQLiteDatabase): Promise<void> => {
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

const createImagesTable = async (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Images (
          id TEXT PRIMARY KEY NOT NULL,
          animalId TEXT NOT NULL,
          fecha TEXT NOT NULL,
          url TEXT NOT NULL,
          FOREIGN KEY (animalId) REFERENCES Animal (id) ON DELETE CASCADE
        )`,
        [],
        () => {
          console.log('[SUCCESS] Tabla Images creada exitosamente');
          resolve();
        },
        (_: Transaction, error: SQLError) => {
          console.error('[ERROR] Error al crear la tabla Images:', {
            message: error.message,
            code: error.code,
            sql: 'CREATE TABLE IF NOT EXISTS Images ...',
          });
          reject(error);
          return false;
        }
      );
    });
  });
};

// Crear tabla Weights
const createWeightsTable = async (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Weights (
          id TEXT PRIMARY KEY NOT NULL,
          animalId TEXT NOT NULL,
          fecha TEXT NOT NULL,
          peso TEXT NOT NULL,
          FOREIGN KEY (animalId) REFERENCES Animal (id) ON DELETE CASCADE
        )`,
        [],
        () => {
          console.log('[SUCCESS] Tabla Weights creada exitosamente');
          resolve();
        },
        (_: Transaction, error: SQLError) => {
          console.error('[ERROR] Error al crear la tabla Weights:', {
            message: error.message,
            code: error.code,
            sql: 'CREATE TABLE IF NOT EXISTS Weights ...',
          });
          reject(error);
          return false;
        }
      );
    });
  });
};

// Mostrar columnas de todas las tablas
const logTableSchemas = async (db: SQLiteDatabase): Promise<void> => {
  console.log('[DEBUG] Logging schemas for all tables');
  const tables = ['Animal', 'Register', 'Notas', 'Events', 'Chats', 'Messages', 'Images', 'Weights'];
  for (const table of tables) {
    await new Promise<void>((resolve, reject) => {
      db.transaction(
        (tx: Transaction) => {
          tx.executeSql(
            `PRAGMA table_info(${table})`,
            [],
            (_: Transaction, { rows }: { rows: any }) => {
              const columns = Array.from(rows._array).map((col: any) => col.name);
              console.log(`[INFO] Columns in ${table}:`, columns);
              resolve();
            },
            (_: Transaction, error: SQLError) => {
              console.error(`[ERROR] Failed to log schema for ${table}:`, error);
              reject(error);
              return false;
            }
          );
        },
        (error: SQLError) => {
          console.error(`[ERROR] Transaction error while logging schema for ${table}:`, error);
          reject(error);
        }
      );
    });
  }
};
