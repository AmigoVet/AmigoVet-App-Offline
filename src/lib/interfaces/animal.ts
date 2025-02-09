import { Register } from "./registers";

export interface Animal {
    ownerId: string;
    id: string;
    identificador: string;
    nombre: string;
    especie: Especie | "Desconocida";
    raza: Raza | "Desconocida";
    edad?: string;
    nacimiento?: string;
    genero: Genero | "Desconocido";
    peso: string;
    color: string;
    descripcion: string;
    image: string;
    image2?: string;
    image3?: string;
    proposito: string; 
    ubicacion: string;
    created_at: string;
    updated_at: string;
    embarazada: boolean;
    celo?: string;
}

export interface AnimalWithNotes extends Animal {
    notes: Notes[];
}

export interface Notes {
    id: string;
    animalId: string;
    nota: string;
    fecha: string;
    created_at: string;

}
export type Image = string
export type PropositosDomesticos = "Mascota" | "Cuidados" | "Animal de compañía" ;
export type PropositosRurales = "Leche" | "Carne" | "Doble Propósito";

export const generos: Genero[] = ["Macho", "Hembra", "Desconocida"];

export type Genero = "Macho" | "Hembra" | "Desconocida";

export type Especie =
    | "Bovino"
    | "Canino"
    | "Aviar"
    | "Equino"
    | "Caprino"
    | "Ovino"
    | "Porcino"
    | "Felino"
    | "Desconocida"
    ;

export type Raza =
    | "Holstein"
    | "Jersey"
    | "Angus"
    | "Hereford"
    | "Brahman"
    | "Labrador Retriever"
    | "Pastor Alemán"
    | "Golden Retriever"
    | "Chihuahua"
    | "Beagle"
    | "Gallina Leghorn"
    | "Rhode Island Red"
    | "Plymouth Rock"
    | "Sussex"
    | "Árabe"
    | "Percherón"
    | "Mustang"
    | "Cuarto de Milla"
    | "Appaloosa"
    | "Boer"
    | "Nubian"
    | "Saanen"
    | "Toggenburg"
    | "Merino"
    | "Suffolk"
    | "Dorper"
    | "Rambouillet"
    | "Yorkshire"
    | "Landrace"
    | "Duroc"
    | "Hampshire"
    | "Persa"
    | "Siamés"
    | "Maine Coon"
    | "Bengalí"
    | "Angora"
    | "Desconocida"
    ;

    export const especiesRazasMap: Record<Especie, Raza[]> = {
        Bovino: ["Holstein", "Jersey", "Angus", "Hereford", "Brahman", "Desconocida"],
        Canino: ["Labrador Retriever", "Pastor Alemán", "Golden Retriever", "Chihuahua", "Beagle", "Desconocida"],
        Aviar: ["Gallina Leghorn", "Rhode Island Red", "Plymouth Rock", "Sussex", "Desconocida"],
        Equino: ["Árabe", "Percherón", "Mustang", "Cuarto de Milla", "Appaloosa", "Desconocida"],
        Caprino: ["Boer", "Nubian", "Saanen", "Toggenburg", "Desconocida"],
        Ovino: ["Merino", "Suffolk", "Dorper", "Rambouillet", "Desconocida"],
        Porcino: ["Yorkshire", "Landrace", "Duroc", "Hampshire", "Desconocida"],
        Felino: ["Persa", "Siamés", "Maine Coon", "Bengalí", "Angora", "Desconocida"],
        Desconocida: ["Desconocida"], // ✅ Se agrega la clave faltante
    };
    
    export const propositosPorEspecie: Record<Especie, string[]> = {
        Bovino: ["Leche", "Carne", "Doble Propósito", "Desconocida"],
        Canino: ["Mascota", "Animal de compañía", "Cuidados", "Desconocida"],
        Felino: ["Mascota", "Animal de compañía", "Cuidados", "Desconocida"],
        Aviar: ["Producción de huevos", "Carne", "Desconocida"],
        Equino: ["Trabajo", "Deporte", "Desconocida"],
        Caprino: ["Leche", "Carne", "Desconocida"],
        Ovino: ["Carne", "Lana", "Desconocida"],
        Porcino: ["Carne", "Reproducción", "Desconocida"],
        Desconocida: ["Desconocida"], // ✅ Se agrega la clave faltante
    };
    

export interface PregnancyRegister extends Register {
    fechaPartoEstimada?: string; // Fecha estimada de parto
}

export interface TreatmentRegister extends Register {
    tipoTratamiento?: string; // Tipo de tratamiento
}

export interface InseminationRegister extends Register {
    semenProveedor?: string; // Proveedor del semen
}

export interface AbortoRegister extends Register {
    fechaAborto?: string; // Proveedor del semen
}
