import { Register } from "./registers";

export interface Animal {
    ownerId: string;
    id: string;
    identificador: string;
    nombre: string;
    especie: Especie;
    raza: Raza;
    edad: string;
    genero: Genero;
    peso: string;
    color: string;
    descripcion: string;
    image: string;
    proposito: string;
    ubicacion: string;
    created_at: string;
    updated_at: string;
    notas?: Notes[];
}

export interface Notes {
  nota: string
}

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
  Bovino: [
    "Holstein", 
    "Jersey", 
    "Angus", 
    "Hereford", 
    "Brahman"],
  Canino: [
    "Labrador Retriever",
    "Pastor Alemán",
    "Golden Retriever",
    "Chihuahua",
    "Beagle",
  ],
  Aviar: [
    "Gallina Leghorn", 
    "Rhode Island Red", 
    "Plymouth Rock", 
    "Sussex"],
  Equino: [
    "Árabe", 
    "Percherón", 
    "Mustang", 
    "Cuarto de Milla", 
    "Appaloosa"],
  Caprino: [
    "Boer", 
    "Nubian", 
    "Saanen", 
    "Toggenburg"],
  Ovino: [
    "Merino", 
    "Suffolk", 
    "Dorper", 
    "Rambouillet"],
  Porcino: [
    "Yorkshire", 
    "Landrace", 
    "Duroc", 
    "Hampshire"],
  Felino: [
    "Persa", 
    "Siamés", 
    "Maine Coon", 
    "Bengalí", 
    "Angora"],
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
