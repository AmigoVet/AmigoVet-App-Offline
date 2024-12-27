import { Notes } from "../../interfaces/animal";
import { db } from "../db";

export const setDataNotas = async (nota: Notes): Promise<void> => {
    try {  
      // Validate required fields
      if (!nota.id || !nota.animalId || !nota.nota || !nota.fecha) {
        throw new Error('Missing required fields in nota object');
      }
      console.log("Datos de la nota antes de guardar:", JSON.stringify(nota, null, 2));

      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO Notas (id, animalId, nota, fecha, created_at) 
                 VALUES (?, ?, ?, ?, ?)`,
                [
                    nota.id,
                    nota.animalId,
                    nota.nota,
                    nota.fecha,
                    nota.created_at || new Date().toISOString(),
                ],
                (_, result) => {
                    console.log("Nota guardada correctamente:", JSON.stringify(nota, null, 2));
                    resolve();
                },
                (_, error) => {
                    console.error("Error en SQL al guardar nota:", {
                        code: error?.code,
                        message: error?.message,
                        data: JSON.stringify(nota, null, 2),
                    });
                    reject(error);
                    return false;
                }
            );
        });        
      });
    } catch (error) {
      console.error("Error en el proceso de guardado:", error);
      throw error;
    }
  };

