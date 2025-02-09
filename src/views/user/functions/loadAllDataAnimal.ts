import { Register } from "@tanstack/react-query";
import { getDataEventByAnimalId } from "../../../lib/db/events/getDataEvent";
import { getDataAnimalbyId } from "../../../lib/db/getDataAnimal";
import { getDataNotas } from "../../../lib/db/notas/getDataNotas";
import { getDataRegisters } from "../../../lib/db/registers/getDataRegister";
import { Animal, Notes } from "../../../lib/interfaces/animal";
import { Events } from "../../../lib/interfaces/events";

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
            animal,
            registers,
            notes,
            events,
        };
    } catch (error) {
        console.error("Error al cargar los datos del animal:", error);
        return {
            animal: null,
            registers: null,
            notes: null,
            events: null,
        };
    }
};
