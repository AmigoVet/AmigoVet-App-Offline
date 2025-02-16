import { getDataEventByAnimalId } from "../../../lib/db/events/getDataEvent";
import { getDataAnimalbyId } from "../../../lib/db/getDataAnimal";
import { getDataNotas } from "../../../lib/db/notas/getDataNotas";
import { getDataRegisters } from "../../../lib/db/registers/getDataRegister";
import { Animal, Notes } from "../../../lib/interfaces/animal";
import { Events } from "../../../lib/interfaces/events";
import { Register } from "../../../lib/interfaces/registers";
import { defaultAnimal } from "../AnimalView/AnimalView";

export interface AnimalAllData {
    animal: Animal | null;
    registers: Register[] | null;
    notes: Notes[] | null;
    events: Events[] | null;
}

export const loadAllDataAnimal = async (id: string): Promise<AnimalAllData> => {
    try {

        const animal = await getDataAnimalbyId(id);

        const registers = await getDataRegisters(id);

        const notes = await getDataNotas(id);

        const events = await getDataEventByAnimalId(id);

        return {
            animal: animal || defaultAnimal, 
            registers: registers || [],
            notes: notes || [],
            events: events || [],
        };
    } catch (error) {
        console.error("❌ Error al cargar los datos:", error);
        return {
            animal: defaultAnimal,
            registers: [],
            notes: [],
            events: [],
        };
    }
};
