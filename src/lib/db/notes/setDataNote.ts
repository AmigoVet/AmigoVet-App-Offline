import { Notes } from "../../interfaces/Notes";
import { db } from "../db";

export const setDataNote = (note: Notes): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO Notas (id, animalId, nota, fecha, created_at) VALUES (?, ?, ?, ?, ?)`,
                [
                    note.id,
                    note.animalId,
                    note.nota,
                    note.fecha,
                    note.created_at,
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




