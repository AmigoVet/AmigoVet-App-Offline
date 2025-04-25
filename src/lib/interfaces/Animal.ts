import { Register } from "./Register";
import { Notes } from "./Notes";
import { Events } from "./Events";

export interface Animal {
    ownerId: string;
    id: string;
    identificador: string;
    nombre: string;
    especie: Especie; 
    raza: Raza; 
    nacimiento?: string;
    genero: Genero;
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
    notes?: Notes[];
    registers?: Register[];
    events?: Events[];
}

export interface AnimalWithNotes extends Animal {
    notes: Notes[];
}

export type Image = string;
export type PropositosDomesticos = "Mascota" | "Cuidados" | "Animal de compañía";
export type PropositosRurales = "Leche" | "Carne" | "Doble Propósito";

export const generos: Genero[] = ["Macho", "Hembra"];

export type Genero = "Macho" | "Hembra";

export type Especie =
    | "Bovino"
    | "Canino"
    | "Aviar"
    | "Equino"
    | "Caprino"
    | "Ovino"
    | "Porcino"
    | "Felino";

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
    | "Angora";

export const especiesRazasMap: Record<Especie, Raza[]> = {
    Bovino: ["Holstein", "Jersey", "Angus", "Hereford", "Brahman"],
    Canino: ["Labrador Retriever", "Pastor Alemán", "Golden Retriever", "Chihuahua", "Beagle"],
    Aviar: ["Gallina Leghorn", "Rhode Island Red", "Plymouth Rock", "Sussex"],
    Equino: ["Árabe", "Percherón", "Mustang", "Cuarto de Milla", "Appaloosa"],
    Caprino: ["Boer", "Nubian", "Saanen", "Toggenburg"],
    Ovino: ["Merino", "Suffolk", "Dorper", "Rambouillet"],
    Porcino: ["Yorkshire", "Landrace", "Duroc", "Hampshire"],
    Felino: ["Persa", "Siamés", "Maine Coon", "Bengalí", "Angora"],
};

export const propositosPorEspecie: Record<Especie, string[]> = {
    Bovino: ["Leche", "Carne", "Doble Propósito"],
    Canino: ["Mascota", "Animal de compañía", "Cuidados"],
    Felino: ["Mascota", "Animal de compañía", "Cuidados"],
    Aviar: ["Producción de huevos", "Carne"],
    Equino: ["Trabajo", "Deporte"],
    Caprino: ["Leche", "Carne"],
    Ovino: ["Carne", "Lana"],
    Porcino: ["Carne", "Reproducción"],
};

export interface PregnancyRegister extends Register {
    fechaPartoEstimada?: string;
}

export interface TreatmentRegister extends Register {
    tipoTratamiento?: string;
}

export interface InseminationRegister extends Register {
    semenProveedor?: string;
}

export interface AbortoRegister extends Register {
    fechaAborto?: string;
}