import { Animal } from "../../interfaces/animal";
import { db } from "../db";

export const updateAnimal = (id: string, updates: Partial<Record<keyof Animal, any>>): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!Object.keys(updates).length) {
            return reject(new Error("No hay datos para actualizar."));
        }

        // Construir la consulta dinámica
        const fields = Object.keys(updates).map((key) => `${key} = ?`).join(", ");
        const values = Object.values(updates);

        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE Animal SET ${fields}, updated_at = ? WHERE id = ?`,
                [...values, new Date().toISOString(), id], 
                (_, result) => {
                    console.log("Animal actualizado correctamente:", result);
                    resolve();
                },
                (_, error) => {
                    console.error("Error al actualizar el animal:", error);
                    reject(error);
                }
            );
        });
    });
};
