import { db } from "../db";

export const deleteDataAnimal = (animalId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM Animal WHERE id = ?`, 
                [animalId], 
                (_, result) => {
                    console.log(`Animal con ID ${animalId} eliminado correctamente.`);
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
