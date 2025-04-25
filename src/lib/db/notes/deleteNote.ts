import { db } from "../db";

export const deleteNote = (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM Notas WHERE id = ?`,
                [id],
                (_, result) => {
                    resolve();
                },
                (_, error) => {
                    console.error('Error al eliminar nota:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};