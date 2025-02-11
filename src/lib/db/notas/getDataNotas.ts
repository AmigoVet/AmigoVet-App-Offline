import { Notes } from "../../interfaces/animal";
import { db } from "../db";

export const getDataNotas = (animalId: string): Promise<Notes[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Notas WHERE animalId = ? ORDER BY fecha DESC`,
                [animalId],
                (_, result) => {
                    const notas: Notes[] = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        notas.push(result.rows.item(i));
                    }
                    resolve(getLatestUniqueNotes(notas));
                },
                (_, error) => {
                    console.error('Error fetching registers:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

const getLatestUniqueNotes = (notes: Notes[]): Notes[] => {
    const uniqueNotes: Record<string, Notes> = {};
    
    const sortedNotes = notes.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

    for (const note of sortedNotes) {
        if (note.nota.includes("Hubo un Aborto") && !uniqueNotes["Aborto"]) {
            uniqueNotes["Aborto"] = note;
        }
        if (note.nota.includes("Hubo una Preñez") && !uniqueNotes["Preñez"]) {
            uniqueNotes["Preñez"] = note;
        }
        if (note.nota.includes("Hubo un Tratamiento") && !uniqueNotes["Tratamiento"]) {
            uniqueNotes["Tratamiento"] = note;
        }

        if (Object.keys(uniqueNotes).length === 3) break;
    }

    // Retornar los 3 elementos más recientes
    return Object.values(uniqueNotes);
};