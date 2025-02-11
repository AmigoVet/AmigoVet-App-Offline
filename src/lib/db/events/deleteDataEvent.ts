import { db } from "../db";

export const deleteDataEvent = (comentario: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM Events WHERE comentario = ?`,
                [comentario],
                (_, result) => {
                    if (result.rowsAffected > 0) {
                        console.log(`Evento eliminado con éxito con comentario: "${comentario}"`);
                        resolve();
                    } else {
                        console.warn(`No se encontró ningún evento con comentario: "${comentario}"`);
                        reject(new Error("Evento no encontrado"));
                    }
                },
                (_, error) => {
                    console.error("Error al eliminar el evento:", error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
