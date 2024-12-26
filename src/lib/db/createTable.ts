import { db } from './db';

export const createAnimalTable = () => {
    db.transaction((tx) => {
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
                embarazada INTEGER
            )`,
            [],
            () => { console.log('Animal table created successfully'); },
            (error) => { console.log('Error creating table:', error); }
        );
    });
};
