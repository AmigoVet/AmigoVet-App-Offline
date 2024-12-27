import { db } from "../db";

export const deleteDataNotas = (notaId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM Notas WHERE id = ?`,
                [notaId], 
                (_, result) => {
                    console.log(`Nota con ID ${notaId} eliminada correctamente.`);
                    resolve();
                },
                (_, error) => {
                    console.error("Error en SQL:", error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};