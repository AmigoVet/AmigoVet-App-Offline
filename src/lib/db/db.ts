import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

// Usar LibraryDirectoryPath en iOS para mayor persistencia
const getStoragePath = () => {
  return Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.DocumentDirectoryPath;
};

export const db = SQLite.openDatabase(
  {
    name: 'test.db',
    location: 'default',
  },
  async () => {
    console.log('Database opened successfully');
    // Crear directorio para imágenes
    try {
      await RNFS.mkdir(`${getStoragePath()}/animals`);
      console.log('Animals directory created successfully');
    } catch (error) {
      console.error('Error creating animals directory:', error);
    }
  },
  (error) => {
    console.log('Error opening database:', error);
  }
);

export { getStoragePath }; // Exportar para usar en otros archivos