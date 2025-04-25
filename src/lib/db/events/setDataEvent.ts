import { Events } from "../../interfaces/Events";
import { db } from "../db";

export const setDataEvent = (event: Events): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO Events (id, animalId, animalName, comentario, fecha, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    event.id,
                    event.animalId,
                    event.animalName,
                    event.comentario,
                    event.fecha,
                    event.created_at,
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