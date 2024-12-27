import { db } from './db';
import { create } from 'zustand';

export const createTables = () => {
    createAnimalTable();
    createRegisterTable();
    createNotesTable();

};


const createAnimalTable = () => {
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
                embarazada INTEGER DEFAULT 0
            )`,
            [],
            () => { console.log('Animal table created successfully'); },
            (error) => { console.log('Error creating table:', error); }
        );
    });
}
const createRegisterTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Register (
                id TEXT PRIMARY KEY,
                animalId TEXT,
                comentario TEXT,
                accion TEXT,
                fecha TEXT,
                FOREIGN KEY (animalId) REFERENCES Animal (id)
            )`,
            [],
            () => { console.log('Register table created successfully'); },
            (error) => { console.log('Error creating table:', error); }
        );
    });
}
const createNotesTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Notas (
                id TEXT PRIMARY KEY,
                animalId TEXT,
                fecha TEXT,
                created_at TEXT,
                FOREIGN KEY (animalId) REFERENCES Animal (id)
            )`,
            [],
            () => { console.log('Notas table created successfully'); },
            (error) => { console.log('Error creating table:', error); }
        );
    });
}