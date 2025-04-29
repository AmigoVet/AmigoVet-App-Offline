import { db } from './db';
import { create } from 'zustand';
import { SQLiteDatabase, Transaction, SQLError } from 'react-native-sqlite-storage';

export const createTables = () => {
    createAnimalTable();
    createRegisterTable();
    createNotesTable();
    createEventsTable();
};

const createAnimalTable = () => {
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
                favorito INTEGER DEFAULT 0
            )`,
            [],
            () => { 
                console.log('[SUCCESS] Tabla Animal creada exitosamente'); 
                verifyTableExists('Animal');
            },
            (_: Transaction, error: SQLError) => { 
                console.error('[ERROR] Error al crear la tabla Animal:', {
                    message: error.message,
                    code: error.code,
                    sql: 'CREATE TABLE IF NOT EXISTS Animal ...'
                }); 
                return false;
            }
        );
    });
};

const createRegisterTable = () => {
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
                verifyTableExists('Register');
            },
            (_: Transaction, error: SQLError) => { 
                console.error('[ERROR] Error al crear la tabla Register:', {
                    message: error.message,
                    code: error.code,
                    sql: 'CREATE TABLE IF NOT EXISTS Register ...'
                }); 
                return false;
            }
        );
    });
};

const createNotesTable = () => {
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
                verifyTableExists('Notas');
            },
            (_: Transaction, error: SQLError) => { 
                console.error('[ERROR] Error al crear la tabla Notas:', {
                    message: error.message,
                    code: error.code,
                    sql: 'CREATE TABLE IF NOT EXISTS Notas ...'
                }); 
                return false;
            }
        );
    });
};

const createEventsTable = () => {
    db.transaction((tx: Transaction) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Events (
                id TEXT PRIMARY KEY NOT NULL,
                animalId TEXT NOT NULL,
                animalName TEXT NOT NULL,
                comentario TEXT NOT NULL,
                fecha TEXT NOT NULL,
                created_at TEXT NOT NULL,
                FOREIGN KEY (animalId) REFERENCES Animal (id) ON DELETE CASCADE
            )`,
            [],
            () => { 
                console.log('[SUCCESS] Tabla Events creada exitosamente'); 
                verifyTableExists('Events');
            },
            (_: Transaction, error: SQLError) => { 
                console.error('[ERROR] Error al crear la tabla Events:', {
                    message: error.message,
                    code: error.code,
                    sql: 'CREATE TABLE IF NOT EXISTS Events ...'
                }); 
                return false;
            }
        );
    });
};

const verifyTableExists = (tableName: string) => {
    db.transaction((tx: Transaction) => {
        tx.executeSql(
            `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
            [tableName],
            (_: Transaction, { rows }: { rows: any }) => {
                if (rows.length > 0) {
                    console.log(`[INFO] La tabla ${tableName} existe en la base de datos`);
                    tx.executeSql(
                        `PRAGMA table_info(${tableName})`,
                        [],
                        (_: Transaction, { rows: tableInfo }: { rows: any }) => {
                            console.log(`[INFO] Estructura de la tabla ${tableName}:`, tableInfo.raw());
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