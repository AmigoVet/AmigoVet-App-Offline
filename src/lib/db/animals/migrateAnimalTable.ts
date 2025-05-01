import { Transaction, SQLError } from 'react-native-sqlite-storage';
import { db } from '../db';

export const migrateAnimalTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      // Check the current structure of the Animal table
      tx.executeSql(
        'PRAGMA table_info(Animal)',
        [],
        (_, { rows }) => {
          const columns = Array.from({ length: rows.length }, (_, i) => rows.item(i).name);

          // Define the columns to check/add
          const columnsToAdd = [
            { name: 'isPublic', sql: 'isPublic INTEGER DEFAULT 0' },
            { name: 'isRespalded', sql: 'isRespalded INTEGER DEFAULT 0' },
            { name: 'isChanged', sql: 'isChanged INTEGER DEFAULT 0' },
          ];

          // Process each column
          columnsToAdd.forEach(({ name, sql }) => {
            if (!columns.includes(name)) {
              tx.executeSql(
                `ALTER TABLE Animal ADD COLUMN ${sql}`,
                [],
                () => {
                  console.log(`[SUCCESS] Columna ${name} añadida a la tabla Animal`);
                },
                (_, error: SQLError) => {
                  console.error(`[ERROR] Error al añadir la columna ${name}:`, error.message || error);
                  reject(error);
                  return false;
                }
              );
            } else {
              console.log(`[INFO] La columna ${name} ya existe en la tabla Animal`);
            }
          });

          // Resolve the promise after checking/adding all columns
          resolve(true);
        },
        (_, error: SQLError) => {
          console.error('[ERROR] Error al verificar la estructura de la tabla Animal:', error.message || error);
          reject(error);
          return false;
        }
      );
    });
  });
};