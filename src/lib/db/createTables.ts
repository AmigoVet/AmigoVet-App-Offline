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

// Verificar existencia de una tabla
const verifyTableExists = (db: SQLiteDatabase, tableName: string): void => {
  db.transaction((tx: Transaction) => {
    tx.executeSql(
      `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
      [tableName],
      (_: Transaction, { rows }: { rows: any }) => {
        if (rows.length > 0) {
          console.log(`[INFO] Table ${tableName} exists`);
        } else {
          console.warn(`[WARN] Table ${tableName} does not exist`);
        }
      },
      (_: Transaction, error: SQLError) => {
        console.error(`[ERROR] Error checking existence of ${tableName}:`, error);
        return false;
      }
    );
  });
};

// Mostrar columnas de todas las tablas
const logTableSchemas = async (db: SQLiteDatabase): Promise<void> => {
  console.log('[DEBUG] Logging schemas for all tables');
  const tables = ['Animal', 'Register', 'Notas', 'Events', 'Chats', 'Messages'];
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

// Temporary function to drop all tables (uncomment in createTables if needed)
const dropAllTables = async (db: SQLiteDatabase): Promise<void> => {
  console.log('[DEBUG] Dropping all tables');
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx: Transaction) => {
        tx.executeSql('DROP TABLE IF EXISTS Events', [], () => console.log('[INFO] Dropped Events table'), (_, err) => { console.error('[ERROR] Drop Events:', err); return false; });
        tx.executeSql('DROP TABLE IF EXISTS Animal', [], () => console.log('[INFO] Dropped Animal table'), (_, err) => { console.error('[ERROR] Drop Animal:', err); return false; });
        tx.executeSql('DROP TABLE IF EXISTS Register', [], () => console.log('[INFO] Dropped Register table'), (_, err) => { console.error('[ERROR] Drop Register:', err); return false; });
        tx.executeSql('DROP TABLE IF EXISTS Notas', [], () => console.log('[INFO] Dropped Notas table'), (_, err) => { console.error('[ERROR] Drop Notas:', err); return false; });
        tx.executeSql('DROP TABLE IF EXISTS Chats', [], () => console.log('[INFO] Dropped Chats table'), (_, err) => { console.error('[ERROR] Drop Chats:', err); return false; });
        tx.executeSql('DROP TABLE IF EXISTS Messages', [], () => console.log('[INFO] Dropped Messages table'), (_, err) => { console.error('[ERROR] Drop Messages:', err); return false; });
      },
      (err) => {
        console.error('[ERROR] Drop all tables failed:', err);
        reject(err);
      },
      () => {
        console.log('[SUCCESS] All tables dropped');
        resolve();
      }
    );
  });
};