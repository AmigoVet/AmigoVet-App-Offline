import { Events } from "../../interfaces/Events";
import { db } from "../db";

export const updateEvent = (event: Events): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE Events SET animalName = ?, comentario = ?, fecha = ?, created_at = ? WHERE id = ?`,
                [
                    event.animalName,
                    event.comentario,
                    event.fecha,
                    event.created_at,
                    event.id,
                ],
                (_, result) => {
                    resolve();
                },
                (_, error) => {
                    console.error('Error al actualizar evento:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};