import { Transaction, SQLError } from 'react-native-sqlite-storage';
import { db } from '../db';

export const migrateAnimalTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: Transaction) => {
      // Check if the favorito column exists
      tx.executeSql(
        `PRAGMA table_info(Animal)`,
        [],
        (_, { rows }) => {
          let hasFavoritoColumn = false;
          for (let i = 0; i < rows.length; i++) {
            if (rows.item(i).name === 'favorito') {
              hasFavoritoColumn = true;
              break;
            }
          }

          if (!hasFavoritoColumn) {
            // Add the favorito column
            tx.executeSql(
              `ALTER TABLE Animal ADD COLUMN favorito INTEGER DEFAULT 0`,
              [],
              () => {
                console.log('[SUCCESS] Columna favorito añadida a la tabla Animal');
              },
              (_, error: SQLError) => {
                console.error('[ERROR] Error al añadir la columna favorito:', error.message || error);
                reject(error);
                return false;
              }
            );
          } else {
            console.log('[INFO] La columna favorito ya existe en la tabla Animal');
          }
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