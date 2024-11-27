import SQLite from 'react-native-sqlite-storage';
import { Animal, Animalset } from './src/assets/interfaces/animal';

// Asegúrate de habilitar promesas si no lo has hecho aún
SQLite.enablePromise(true);

const db = SQLite.openDatabase(
    {
        name: 'animalia.db',
        location: 'default',
    },
    () => {
        console.log('Base de datos abierta');
    },
    error => {
        console.log('Error abriendo la base de datos:', error);
    }
);

const createTableAnimals = () => {
    return db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS animals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                species TEXT NOT NULL,
                breed TEXT NOT NULL,
                age INTEGER NOT NULL,
                gender TEXT NOT NULL,
                weight INTEGER NOT NULL,
                ubicacion TEXT NOT NULL,
                color TEXT NOT NULL,
                image TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )`,
            [],
            () => {
                console.log('Tabla de animales creada correctamente');
            },
            error => {
                console.log('Error creando la tabla de animales:', error);
            }
        );
    });
};

const insertAnimal = async (animal: Animalset) => {
    return db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO animals (name, description, species, breed, age, gender, weight, color, image, ubicacion, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                animal.name, animal.description, animal.species, animal.breed, 
                animal.age, animal.gender, animal.weight, animal.color, 
                animal.image, animal.ubicacion, animal.created_at, animal.updated_at
            ],
            () => {
                console.log('Animal insertado correctamente:', animal);
            },
            error => {
                console.log('Error insertando animal:', error);
            }
        );
    });
};

const getAllAnimals = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM animals`,
                [],
                (tx, results) => {
                    const len = results.rows.length;
                    console.log(`Número de filas obtenidas: ${len}`);
                    const animals = [];
                    for (let i = 0; i < len; i++) {
                        animals.push(results.rows.item(i));
                    }
                    console.log('Animales obtenidos:', animals);
                    resolve(animals);
                },
                error => {
                    console.log('Error obteniendo animales:', error);
                    reject(error);
                }
            );
        });
    });
};

export { db, createTableAnimals, getAllAnimals, insertAnimal };
