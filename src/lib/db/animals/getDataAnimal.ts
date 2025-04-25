import { Animal } from "../../interfaces/Animal";
import { db } from "../db";

export const getDataAnimal = (id: string): Promise<Animal> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Animal WHERE id = ?`,
                [id],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        const item = rows.item(0);
                        resolve({
                            id: item.id,
                            ownerId: item.ownerId,
                            identificador: item.identificador,
                            nombre: item.nombre,
                            especie: item.especie,
                            raza: item.raza,
                            nacimiento: item.nacimiento,
                            genero: item.genero,
                            peso: item.peso,
                            color: item.color,
                            descripcion: item.descripcion,
                            image: item.image,
                            image2: item.image2,
                            image3: item.image3,
                            proposito: item.proposito,
                            ubicacion: item.ubicacion,
                            created_at: item.created_at,
                            updated_at: item.updated_at,
                            embarazada: !!item.embarazada,
                        });
                    } else {
                        reject(new Error('Animal no encontrado'));
                    }
                },
                (_, error) => {
                    console.error('Error al obtener animal:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};