import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

// Habilitar promesas globalmente (solo se necesita una vez)
SQLite.enablePromise(true);

// Usar LibraryDirectoryPath en iOS para mayor persistencia
export const getStoragePath = (): string => {
  return Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.DocumentDirectoryPath;
};

// Inicializar la base de datos con promesas
const initDatabase = async (): Promise<SQLiteDatabase> => {
  try {
    const db = await SQLite.openDatabase({
      name: 'test.db',
      location: 'default',
    });
    console.log('Database opened successfully');

    // Crear directorio para imágenes
    await RNFS.mkdir(`${getStoragePath()}/animals`);
    console.log('Animals directory created successfully');

    return db;
  } catch (error) {
    console.error('Error opening database or creating directory:', error);
    throw error;
  }
};

// Singleton para la instancia de la base de datos
let dbInstance: SQLiteDatabase | null = null;
export const getDatabase = async (): Promise<SQLiteDatabase> => {
  if (!dbInstance) {
    dbInstance = await initDatabase();
  }
  return dbInstance;
};
