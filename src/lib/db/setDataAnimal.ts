import { Animal } from '../interfaces/animal';
import { db } from './db';

export const setDataAnimal = (animal: Animal): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO Animal (id, ownerId, identificador, nombre, especie, raza, nacimiento, genero, peso, color, descripcion, image, image2, image3, proposito, ubicacion, created_at, updated_at, embarazada) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    animal.id,
                    animal.ownerId,
                    animal.identificador,
                    animal.nombre,
                    animal.especie,
                    animal.raza,
                    animal.nacimiento,
                    animal.genero,
                    animal.peso,
                    animal.color,
                    animal.descripcion,
                    animal.image,
                    animal.image2,
                    animal.image3,
                    animal.proposito,
                    animal.ubicacion,
                    animal.created_at,
                    animal.updated_at,
                    animal.embarazada ? 1 : 0,
                ],
                (_, result) => {
                    resolve();
                },
                (_, error) => {
                    console.error('Error en SQL:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
