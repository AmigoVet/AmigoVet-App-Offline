import { db } from "../db";

export const updateDataNota = (notaId: string, updatedFields: Partial<{ nota: string; fecha: string; created_at: string }>): Promise<void> => {
    return new Promise((resolve, reject) => {
        const fields = Object.keys(updatedFields);
        const values = Object.values(updatedFields);

        // Construir la parte de SET dinámicamente
        const setClause = fields.map((field) => `${field} = ?`).join(", ");

        if (fields.length === 0) {
            console.error("No se proporcionaron campos para actualizar.");
            reject(new Error("No se proporcionaron campos para actualizar."));
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE Notas SET ${setClause} WHERE id = ?`,
                [...values, notaId], // Los valores seguidos del ID de la nota
                (_, result) => {
                    console.log(`Nota con ID ${notaId} actualizada correctamente.`);
                    resolve();
                },
                (_, error) => {
                    console.error("Error al actualizar la nota:", error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
