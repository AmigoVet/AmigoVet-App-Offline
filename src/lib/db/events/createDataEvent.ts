import { Events } from "../../interfaces/events";
import { db } from "../db";

export const createDataEvent = (event: Events): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO Events (id, animalId, animalName, comentario, fecha, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
                [event.id, event.animalId, event.animalName, event.comentario, event.fecha, event.created_at],
                () => {
                    console.log(`Evento creado con éxito para el animalId: ${event.animalId}`);
                    resolve();
                },
                (_, error) => {
                    console.error('Error inserting event:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};