import { Notes } from "../../interfaces/Notes";
import { db } from "../db";

export const updateNote = (note: Notes): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE Notas SET nota = ?, fecha = ?, created_at = ? WHERE id = ?`,
                [
                    note.nota,
                    note.fecha,
                    note.created_at,
                    note.id,
                ],
                (_, result) => {
                    resolve();
                },
                (_, error) => {
                    console.error('Error al actualizar nota:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};