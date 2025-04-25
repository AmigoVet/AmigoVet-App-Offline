import { db } from "../db";

export const deleteEvent = (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM Events WHERE id = ?`,
                [id],
                (_, result) => {
                    resolve();
                },
                (_, error) => {
                    console.error('Error al eliminar evento:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};