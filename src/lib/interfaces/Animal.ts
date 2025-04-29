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
    favorito: boolean;
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
    // Bovino
    | "Holstein"
    | "Jersey"
    | "Angus"
    | "Hereford"
    | "Brahman"
    | "Simmental"
    | "Charolais"
    | "Limousin"
    | "Shorthorn"
    | "Guernsey"
    | "Ayrshire"
    | "Brown Swiss"
    | "Chianina"
    | "Gelbvieh"
    | "Red Angus"
    | "Santa Gertrudis"
    | "Brangus"
    | "Normande"
    | "Piedmontese"
    | "Salers"
    // Canino (FCI: 360 razas)
    // Grupo 1: Perros de pastor y boyeros (excepto boyeros suizos)
    | "Pastor Alemán"
    | "Pastor Australiano"
    | "Border Collie"
    | "Collie Pelo Largo"
    | "Collie Pelo Corto"
    | "Pastor Belga Malinois"
    | "Pastor Belga Tervuren"
    | "Pastor Belga Groenendael"
    | "Pastor Belga Laekenois"
    | "Pastor de Beauce"
    | "Bobtail"
    | "Shetland Sheepdog"
    | "Komondor"
    | "Kuvasz"
    | "Mudi"
    | "Puli"
    | "Pumi"
    | "Pastor de los Pirineos"
    | "Pastor Catalán"
    | "Pastor Croata"
    | "Pastor Holandés"
    | "Schipperke"
    | "Pastor Blanco Suizo"
    | "Pastor de Brie"
    | "Pastor de Picardía"
    | "Pastor Bergamasco"
    | "Pastor Maremmano-Abruzzese"
    | "Pastor Polaco de las Tierras Bajas"
    | "Pastor de Tatra"
    | "Australian Cattle Dog"
    | "Kelpie Australiano"
    | "Cão da Serra de Aires"
    | "Cão de Castro Laboreiro"
    | "Cão Fila de São Miguel"
    | "Pastor Checoslovaco"
    | "Pastor Rumano de Mioritic"
    | "Pastor Rumano de los Cárpatos"
    | "Pastor de Bosnia-Herzegovina y Croacia"
    | "Pastor de Europa del Sureste"
    | "Pastor de Kangal"
    | "Pastor de Anatolia"
    | "Pastor de Karst"
    | "Pastor Islandés"
    | "Pastor Noruego Buhund"
    // Grupo 2: Perros tipo pinscher, schnauzer, molosoides, montaña y boyeros suizos
    | "Boxer"
    | "Rottweiler"
    | "Dogo Argentino"
    | "Doberman"
    | "Schnauzer Gigante"
    | "Schnauzer Estándar"
    | "Schnauzer Miniatura"
    | "Pinscher Alemán"
    | "Pinscher Miniatura"
    | "Affenpinscher"
    | "Mastín Español"
    | "Mastín Napolitano"
    | "Mastín Inglés"
    | "Mastín del Pirineo"
    | "Mastín Tibetano"
    | "Dogo de Burdeos"
    | "Bulldog Inglés"
    | "Bullmastiff"
    | "Tosa Inu"
    | "Fila Brasileño"
    | "Shar Pei"
    | "Gran Danés"
    | "Cane Corso"
    | "Perro de Presa Canario"
    | "Perro de Presa Mallorquín"
    | "Leonberger"
    | "Terranova"
    | "San Bernardo"
    | "Boyero de Berna"
    | "Boyero de Appenzell"
    | "Boyero de Entlebuch"
    | "Boyero de las Ardenas"
    | "Boyero de Flandes"
    | "Boyero de Montaña Bernés"
    | "Cão de Água Português"
    | "Ciobănesc Românesc de Bucovina"
    | "Dogo Alemán"
    | "Hovawart"
    | "Landseer"
    | "Perro de Montaña de los Pirineos"
    | "Perro de Serra da Estrela"
    | "Perro Lobo Checoslovaco"
    | "Rafeiro do Alentejo"
    | "Sennenhund del Gran Suiza"
    | "Smoushollandés"
    | "Tchiorny Terrier"
    | "Terrier Ruso Negro"
    | "Perro de Pastor del Cáucaso"
    | "Perro de Pastor de Asia Central"
    | "Perro de Pastor de Rusia Meridional"
    | "Gampr Armenio"
    | "Tornjak"
    | "Šarplaninac"
    // Grupo 3: Terriers
    | "Jack Russell Terrier"
    | "Bull Terrier"
    | "Fox Terrier Pelo Liso"
    | "Fox Terrier Pelo Duro"
    | "Airedale Terrier"
    | "Bedlington Terrier"
    | "Border Terrier"
    | "Cairn Terrier"
    | "Kerry Blue Terrier"
    | "Lakeland Terrier"
    | "Manchester Terrier"
    | "Norfolk Terrier"
    | "Norwich Terrier"
    | "Parson Russell Terrier"
    | "Scottish Terrier"
    | "Sealyham Terrier"
    | "Skye Terrier"
    | "Soft Coated Wheaten Terrier"
    | "Staffordshire Bull Terrier"
    | "Welsh Terrier"
    | "West Highland White Terrier"
    | "Dandie Dinmont Terrier"
    | "Australian Terrier"
    | "Cesky Terrier"
    | "Glen of Imaal Terrier"
    | "Irish Terrier"
    | "Miniature Bull Terrier"
    | "American Staffordshire Terrier"
    | "Deutscher Jagdterrier"
    | "Ned. Schapendoes"
    | "Terrier Brasileño"
    | "Terrier Japonés"
    | "Terrier de Lucas"
    | "Terrier Tibetano"
    // Grupo 4: Teckels
    | "Dachshund Pelo Corto"
    | "Dachshund Pelo Duro"
    | "Dachshund Pelo Largo"
    | "Dachshund Miniatura Pelo Corto"
    | "Dachshund Miniatura Pelo Duro"
    | "Dachshund Miniatura Pelo Largo"
    | "Dachshund Kaninchen Pelo Corto"
    | "Dachshund Kaninchen Pelo Duro"
    | "Dachshund Kaninchen Pelo Largo"
    // Grupo 5: Spitz y tipo primitivo
    | "Husky Siberiano"
    | "Akita Inu"
    | "Samoyedo"
    | "Malamute de Alaska"
    | "Shiba Inu"
    | "Chow Chow"
    | "Spitz Alemán Grande"
    | "Spitz Alemán Mediano"
    | "Spitz Alemán Pequeño"
    | "Spitz Alemán Enano"
    | "Spitz Alemán Lobo"
    | "Spitz Japonés"
    | "Spitz Finlandés"
    | "Keeshond"
    | "Schipperke"
    | "Eurasier"
    | "Basenji"
    | "Perro de Canaán"
    | "Perro Sin Pelo Mexicano"
    | "Perro Sin Pelo Peruano"
    | "Pharaoh Hound"
    | "Cirneco del Etna"
    | "Podenco Canario"
    | "Podenco Ibicenco"
    | "Podenco Portugués"
    | "Thai Ridgeback"
    | "Akita Americano"
    | "Laika de Siberia Occidental"
    | "Laika de Siberia Oriental"
    | "Laika Ruso-Europeo"
    | "Nenets Herding Laika"
    | "Perro de Groenlandia"
    | "Perro Lobo de Saarloos"
    | "Perro Nórdico de Caza"
    | "Perro de Osos de Carelia"
    | "Perro de Taiwan"
    | "Perro Esquimal Canadiense"
    | "Perro de Chukotka"
    | "Perro de Kamchatka"
    | "Perro de Yakutia"
    | "Perro de Caza de Halden"
    | "Perro de Caza de Hygen"
    | "Perro de Caza de Dunker"
    | "Perro de Caza de Småland"
    | "Perro de Caza de Gotland"
    | "Perro de Caza de Schiller"
    // Grupo 6: Sabuesos, rastreadores y razas semejantes
    | "Beagle"
    | "Bloodhound"
    | "Dálmata"
    | "Basset Hound"
    | "Basset Artesiano Normando"
    | "Basset Bleu de Gascogne"
    | "Basset Fauve de Bretagne"
    | "Grand Basset Griffon Vendéen"
    | "Petit Basset Griffon Vendéen"
    | "Foxhound Inglés"
    | "Foxhound Americano"
    | "Harrier"
    | "Otterhound"
    | "Rhodesian Ridgeback"
    | "Sabueso Español"
    | "Sabueso Italiano"
    | "Sabueso Polaco"
    | "Sabueso Suizo"
    | "Sabueso de Bosnia"
    | "Sabueso de Istria"
    | "Sabueso de Posavac"
    | "Sabueso de Transilvania"
    | "Sabueso de Hannover"
    | "Sabueso de Baviera"
    | "Sabueso de Hygen"
    | "Sabueso de Halden"
    | "Sabueso de Schiller"
    | "Sabueso de Småland"
    | "Sabueso de Dunker"
    | "Sabueso de Gotland"
    | "Sabueso de Serbia"
    | "Sabueso de Montenegro"
    | "Sabueso de Estonia"
    | "Sabueso de Finlandia"
    | "Sabueso de Noruega"
    | "Sabueso de Hamilton"
    // Grupo 7: Perros de muestra
    | "Setter Inglés"
    | "Pointer"
    | "Braco Alemán Pelo Corto"
    | "Braco Alemán Pelo Duro"
    | "Braco de Weimar"
    | "Braco Italiano"
    | "Braco Francés Tipo Gascuña"
    | "Braco Francés Tipo Pirineos"
    | "Setter Irlandés"
    | "Setter Irlandés Rojo y Blanco"
    | "Setter Gordon"
    | "Spinone Italiano"
    | "Vizsla"
    | "Grifón de Pelo Duro"
    | "Perdiguero de Burgos"
    | "Perdiguero Portugués"
    | "Perdiguero de Drente"
    | "Perdiguero de Frisia"
    | "Perdiguero de Münster Grande"
    | "Perdiguero de Münster Pequeño"
    | "Perdiguero de Oldenburgo"
    | "Perdiguero de Dinamarca"
    | "Perdiguero de Pelo Corto"
    | "Perdiguero de Pelo Largo"
    | "Perdiguero de Pelo Duro"
    | "Perdiguero de Pelo Sedoso"
    | "Perdiguero de Pelo Rizado"
    | "Perdiguero de Pelo Plano"
    | "Perdiguero de Chesapeake"
    | "Perdiguero de Nueva Escocia"
    | "Perdiguero de Labrador"
    | "Perdiguero Dorado"
    | "Perdiguero de Pelo Corto Alemán"
    | "Perdiguero de Pelo Duro Alemán"
    | "Perdiguero de Pelo Largo Alemán"
    | "Perdiguero de Pelo Corto Húngaro"
    | "Perdiguero de Pelo Duro Húngaro"
    // Grupo 8: Cobradores, levantadores y perros de agua
    | "Labrador Retriever"
    | "Golden Retriever"
    | "Cocker Spaniel Inglés"
    | "Cocker Spaniel Americano"
    | "Springer Spaniel Inglés"
    | "Springer Spaniel Galés"
    | "Field Spaniel"
    | "Sussex Spaniel"
    | "Clumber Spaniel"
    | "Perro de Agua Español"
    | "Perro de Agua Americano"
    | "Perro de Agua Irlandés"
    | "Perro de Agua Frisón"
    | "Perro de Agua Portugués"
    | "Perro de Agua Italiano"
    | "Perro de Agua Francés"
    | "Perro de Agua de Romagna"
    | "Perro de Agua de Cantabria"
    | "Perro de Agua de Moscú"
    | "Perro de Agua de los Pirineos"
    | "Perro de Agua de San Juan"
    | "Perro de Agua de Terranova"
    | "Perro de Agua de Virginia"
    | "Perro de Agua de Wisconsin"
    | "Perro de Agua de Yorkshire"
    | "Perro de Agua de Newfoundland"
    | "Perro de Agua de Chesapeake"
    | "Perro de Agua de Curly"
    // Grupo 9: Perros de compañía
    | "Chihuahua"
    | "Bichón Maltés"
    | "Pug"
    | "Bichón Frisé"
    | "Bichón Habanero"
    | "Bichón Bolonés"
    | "Cavalier King Charles Spaniel"
    | "King Charles Spaniel"
    | "Pekinés"
    | "Shih Tzu"
    | "Lhasa Apso"
    | "Bulldog Francés"
    | "Boston Terrier"
    | "Caniche Toy"
    | "Caniche Miniatura"
    | "Caniche Mediano"
    | "Caniche Estándar"
    | "Perro Crestado Chino"
    | "Perro León"
    | "Perro de Compañía Holandés"
    | "Perro de Compañía Italiano"
    | "Perro de Compañía Japonés"
    | "Perro de Compañía Ruso"
    | "Perro de Compañía Tibetano"
    | "Perro de Compañía Francés"
    | "Perro de Compañía Belga"
    | "Perro de Compañía Alemán"
    | "Perro de Compañía Español"
    | "Perro de Compañía Portugués"
    | "Perro de Compañía Brasileño"
    | "Perro de Compañía Argentino"
    | "Perro de Compañía Chileno"
    | "Perro de Compañía Colombiano"
    | "Perro de Compañía Mexicano"
    | "Perro de Compañía Peruano"
    | "Perro de Compañía Uruguayo"
    | "Perro de Compañía Venezolano"
    // Grupo 10: Lebreles
    | "Galgo"
    | "Borzoi"
    | "Whippet"
    | "Saluki"
    | "Afghan Hound"
    | "Azawakh"
    | "Deerhound"
    | "Irish Wolfhound"
    | "Lebrel Español"
    | "Lebrel Húngaro"
    | "Lebrel Italiano"
    | "Lebrel Polaco"
    | "Sloughi"
    // Aviar
    | "Gallina Leghorn"
    | "Rhode Island Red"
    | "Plymouth Rock"
    | "Sussex"
    | "Orpington"
    | "Australorp"
    | "Cornish"
    | "Wyandotte"
    | "Brahma"
    | "Cochin"
    | "Silkie"
    | "Araucana"
    | "Minorca"
    | "Hamburg"
    | "Barnevelder"
    // Equino
    | "Árabe"
    | "Percherón"
    | "Mustang"
    | "Cuarto de Milla"
    | "Appaloosa"
    | "Pura Sangre"
    | "Frisón"
    | "Morgan"
    | "Andaluz"
    | "Lusitano"
    | "Haflinger"
    | "Clydesdale"
    | "Shire"
    | "Paso Fino"
    | "Tennessee Walker"
    // Caprino
    | "Boer"
    | "Nubian"
    | "Saanen"
    | "Toggenburg"
    | "Alpina"
    | "Kiko"
    | "Angora"
    | "LaMancha"
    | "Oberhasli"
    | "Pygmy"
    | "Nigerian Dwarf"
    | "Damascus"
    // Ovino
    | "Merino"
    | "Suffolk"
    | "Dorper"
    | "Rambouillet"
    | "Hampshire"
    | "Southdown"
    | "Cheviot"
    | "Texel"
    | "Romney"
    | "Corriedale"
    | "Lincoln"
    | "Border Leicester"
    // Porcino
    | "Yorkshire"
    | "Landrace"
    | "Duroc"
    | "Hampshire"
    | "Berkshire"
    | "Tamworth"
    | "Gloucestershire Old Spot"
    | "Large Black"
    | "Pietrain"
    | "Mangalitsa"
    // Felino
    | "Persa"
    | "Siamés"
    | "Maine Coon"
    | "Bengalí"
    | "Angora"
    | "Abisinio"
    | "Ragdoll"
    | "Sphynx"
    | "Birmano"
    | "British Shorthair"
    | "Devon Rex"
    | "Norwegian Forest Cat"
    | "Siberian";

export const especiesRazasMap: Record<Especie, Raza[]> = {
    Bovino: [
        "Holstein", "Jersey", "Angus", "Hereford", "Brahman", "Simmental", "Charolais", "Limousin",
        "Shorthorn", "Guernsey", "Ayrshire", "Brown Swiss", "Chianina", "Gelbvieh", "Red Angus",
        "Santa Gertrudis", "Brangus", "Normande", "Piedmontese", "Salers"
    ],
    Canino: [
        // Grupo 1: Perros de pastor y boyeros
        "Pastor Alemán", "Pastor Australiano", "Border Collie", "Collie Pelo Largo", "Collie Pelo Corto",
        "Pastor Belga Malinois", "Pastor Belga Tervuren", "Pastor Belga Groenendael", "Pastor Belga Laekenois",
        "Pastor de Beauce", "Bobtail", "Shetland Sheepdog", "Komondor", "Kuvasz", "Mudi", "Puli", "Pumi",
        "Pastor de los Pirineos", "Pastor Catalán", "Pastor Croata", "Pastor Holandés", "Schipperke",
        "Pastor Blanco Suizo", "Pastor de Brie", "Pastor de Picardía", "Pastor Bergamasco",
        "Pastor Maremmano-Abruzzese", "Pastor Polaco de las Tierras Bajas", "Pastor de Tatra",
        "Australian Cattle Dog", "Kelpie Australiano", "Cão da Serra de Aires", "Cão de Castro Laboreiro",
        "Cão Fila de São Miguel", "Pastor Checoslovaco", "Pastor Rumano de Mioritic",
        "Pastor Rumano de los Cárpatos", "Pastor de Bosnia-Herzegovina y Croacia", "Pastor de Europa del Sureste",
        "Pastor de Kangal", "Pastor de Anatolia", "Pastor de Karst", "Pastor Islandés", "Pastor Noruego Buhund",
        // Grupo 2: Pinscher, schnauzer, molosoides
        "Boxer", "Rottweiler", "Dogo Argentino", "Doberman", "Schnauzer Gigante", "Schnauzer Estándar",
        "Schnauzer Miniatura", "Pinscher Alemán", "Pinscher Miniatura", "Affenpinscher", "Mastín Español",
        "Mastín Napolitano", "Mastín Inglés", "Mastín del Pirineo", "Mastín Tibetano", "Dogo de Burdeos",
        "Bulldog Inglés", "Bullmastiff", "Tosa Inu", "Fila Brasileño", "Shar Pei", "Gran Danés", "Cane Corso",
        "Perro de Presa Canario", "Perro de Presa Mallorquín", "Leonberger", "Terranova", "San Bernardo",
        "Boyero de Berna", "Boyero de Appenzell", "Boyero de Entlebuch", "Boyero de las Ardenas",
        "Boyero de Flandes", "Boyero de Montaña Bernés", "Cão de Água Português", "Ciobănesc Românesc de Bucovina",
        "Dogo Alemán", "Hovawart", "Landseer", "Perro de Montaña de los Pirineos", "Perro de Serra da Estrela",
        "Perro Lobo Checoslovaco", "Rafeiro do Alentejo", "Sennenhund del Gran Suiza", "Smoushollandés",
        "Tchiorny Terrier", "Terrier Ruso Negro", "Perro de Pastor del Cáucaso", "Perro de Pastor de Asia Central",
        "Perro de Pastor de Rusia Meridional", "Gampr Armenio", "Tornjak", "Šarplaninac",
        // Grupo 3: Terriers
        "Jack Russell Terrier", "Bull Terrier", "Fox Terrier Pelo Liso", "Fox Terrier Pelo Duro",
        "Airedale Terrier", "Bedlington Terrier", "Border Terrier", "Cairn Terrier", "Kerry Blue Terrier",
        "Lakeland Terrier", "Manchester Terrier", "Norfolk Terrier", "Norwich Terrier", "Parson Russell Terrier",
        "Scottish Terrier", "Sealyham Terrier", "Skye Terrier", "Soft Coated Wheaten Terrier",
        "Staffordshire Bull Terrier", "Welsh Terrier", "West Highland White Terrier", "Dandie Dinmont Terrier",
        "Australian Terrier", "Cesky Terrier", "Glen of Imaal Terrier", "Irish Terrier", "Miniature Bull Terrier",
        "American Staffordshire Terrier", "Deutscher Jagdterrier", "Ned. Schapendoes", "Terrier Brasileño",
        "Terrier Japonés", "Terrier de Lucas", "Terrier Tibetano",
        // Grupo 4: Teckels
        "Dachshund Pelo Corto", "Dachshund Pelo Duro", "Dachshund Pelo Largo", "Dachshund Miniatura Pelo Corto",
        "Dachshund Miniatura Pelo Duro", "Dachshund Miniatura Pelo Largo", "Dachshund Kaninchen Pelo Corto",
        "Dachshund Kaninchen Pelo Duro", "Dachshund Kaninchen Pelo Largo",
        // Grupo 5: Spitz y tipo primitivo
        "Husky Siberiano", "Akita Inu", "Samoyedo", "Malamute de Alaska", "Shiba Inu", "Chow Chow",
        "Spitz Alemán Grande", "Spitz Alemán Mediano", "Spitz Alemán Pequeño", "Spitz Alemán Enano",
        "Spitz Alemán Lobo", "Spitz Japonés", "Spitz Finlandés", "Keeshond", "Schipperke", "Eurasier",
        "Basenji", "Perro de Canaán", "Perro Sin Pelo Mexicano", "Perro Sin Pelo Peruano", "Pharaoh Hound",
        "Cirneco del Etna", "Podenco Canario", "Podenco Ibicenco", "Podenco Portugués", "Thai Ridgeback",
        "Akita Americano", "Laika de Siberia Occidental", "Laika de Siberia Oriental", "Laika Ruso-Europeo",
        "Nenets Herding Laika", "Perro de Groenlandia", "Perro Lobo de Saarloos", "Perro Nórdico de Caza",
        "Perro de Osos de Carelia", "Perro de Taiwan", "Perro Esquimal Canadiense", "Perro de Chukotka",
        "Perro de Kamchatka", "Perro de Yakutia", "Perro de Caza de Halden", "Perro de Caza de Hygen",
        "Perro de Caza de Dunker", "Perro de Caza de Småland", "Perro de Caza de Gotland", "Perro de Caza de Schiller",
        // Grupo 6: Sabuesos, rastreadores y razas semejantes
        "Beagle", "Bloodhound", "Dálmata", "Basset Hound", "Basset Artesiano Normando", "Basset Bleu de Gascogne",
        "Basset Fauve de Bretagne", "Grand Basset Griffon Vendéen", "Petit Basset Griffon Vendéen",
        "Foxhound Inglés", "Foxhound Americano", "Harrier", "Otterhound", "Rhodesian Ridgeback",
        "Sabueso Español", "Sabueso Italiano", "Sabueso Polaco", "Sabueso Suizo", "Sabueso de Bosnia",
        "Sabueso de Istria", "Sabueso de Posavac", "Sabueso de Transilvania", "Sabueso de Hannover",
        "Sabueso de Baviera", "Sabueso de Hygen", "Sabueso de Halden", "Sabueso de Schiller",
        "Sabueso de Småland", "Sabueso de Dunker", "Sabueso de Gotland", "Sabueso de Serbia",
        "Sabueso de Montenegro", "Sabueso de Estonia", "Sabueso de Finlandia", "Sabueso de Noruega",
        "Sabueso de Hamilton",
        // Grupo 7: Perros de muestra
        "Setter Inglés", "Pointer", "Braco Alemán Pelo Corto", "Braco Alemán Pelo Duro", "Braco de Weimar",
        "Braco Italiano", "Braco Francés Tipo Gascuña", "Braco Francés Tipo Pirineos", "Setter Irlandés",
        "Setter Irlandés Rojo y Blanco", "Setter Gordon", "Spinone Italiano", "Vizsla", "Grifón de Pelo Duro",
        "Perdiguero de Burgos", "Perdiguero Portugués", "Perdiguero de Drente", "Perdiguero de Frisia",
        "Perdiguero de Münster Grande", "Perdiguero de Münster Pequeño", "Perdiguero de Oldenburgo",
        "Perdiguero de Dinamarca", "Perdiguero de Pelo Corto", "Perdiguero de Pelo Largo",
        "Perdiguero de Pelo Duro", "Perdiguero de Pelo Sedoso", "Perdiguero de Pelo Rizado",
        "Perdiguero de Pelo Plano", "Perdiguero de Chesapeake", "Perdiguero de Nueva Escocia",
        "Perdiguero de Labrador", "Perdiguero Dorado", "Perdiguero de Pelo Corto Alemán",
        "Perdiguero de Pelo Duro Alemán", "Perdiguero de Pelo Largo Alemán", "Perdiguero de Pelo Corto Húngaro",
        "Perdiguero de Pelo Duro Húngaro",
        // Grupo 8: Cobradores, levantadores y perros de agua
        "Labrador Retriever", "Golden Retriever", "Cocker Spaniel Inglés", "Cocker Spaniel Americano",
        "Springer Spaniel Inglés", "Springer Spaniel Galés", "Field Spaniel", "Sussex Spaniel",
        "Clumber Spaniel", "Perro de Agua Español", "Perro de Agua Americano", "Perro de Agua Irlandés",
        "Perro de Agua Frisón", "Perro de Agua Portugués", "Perro de Agua Italiano", "Perro de Agua Francés",
        "Perro de Agua de Romagna", "Perro de Agua de Cantabria", "Perro de Agua de Moscú",
        "Perro de Agua de los Pirineos", "Perro de Agua de San Juan", "Perro de Agua de Terranova",
        "Perro de Agua de Virginia", "Perro de Agua de Wisconsin", "Perro de Agua de Yorkshire",
        "Perro de Agua de Newfoundland", "Perro de Agua de Chesapeake", "Perro de Agua de Curly",
        // Grupo 9: Perros de compañía
        "Chihuahua", "Bichón Maltés", "Pug", "Bichón Frisé", "Bichón Habanero", "Bichón Bolonés",
        "Cavalier King Charles Spaniel", "King Charles Spaniel", "Pekinés", "Shih Tzu", "Lhasa Apso",
        "Bulldog Francés", "Boston Terrier", "Caniche Toy", "Caniche Miniatura", "Caniche Mediano",
        "Caniche Estándar", "Perro Crestado Chino", "Perro León", "Perro de Compañía Holandés",
        "Perro de Compañía Italiano", "Perro de Compañía Japonés", "Perro de Compañía Ruso",
        "Perro de Compañía Tibetano", "Perro de Compañía Francés", "Perro de Compañía Belga",
        "Perro de Compañía Alemán", "Perro de Compañía Español", "Perro de Compañía Portugués",
        "Perro de Compañía Brasileño", "Perro de Compañía Argentino", "Perro de Compañía Chileno",
        "Perro de Compañía Colombiano", "Perro de Compañía Mexicano", "Perro de Compañía Peruano",
        "Perro de Compañía Uruguayo", "Perro de Compañía Venezolano",
        // Grupo 10: Lebreles
        "Galgo", "Borzoi", "Whippet", "Saluki", "Afghan Hound", "Azawakh", "Deerhound",
        "Irish Wolfhound", "Lebrel Español", "Lebrel Húngaro", "Lebrel Italiano", "Lebrel Polaco", "Sloughi"
    ],
    Aviar: [
        "Gallina Leghorn", "Rhode Island Red", "Plymouth Rock", "Sussex", "Orpington",
        "Australorp", "Cornish", "Wyandotte", "Brahma", "Cochin", "Silkie", "Araucana",
        "Minorca", "Hamburg", "Barnevelder"
    ],
    Equino: [
        "Árabe", "Percherón", "Mustang", "Cuarto de Milla", "Appaloosa", "Pura Sangre",
        "Frisón", "Morgan", "Andaluz", "Lusitano", "Haflinger", "Clydesdale", "Shire",
        "Paso Fino", "Tennessee Walker"
    ],
    Caprino: [
        "Boer", "Nubian", "Saanen", "Toggenburg", "Alpina", "Kiko", "Angora", "LaMancha",
        "Oberhasli", "Pygmy", "Nigerian Dwarf", "Damascus"
    ],
    Ovino: [
        "Merino", "Suffolk", "Dorper", "Rambouillet", "Hampshire", "Southdown", "Cheviot",
        "Texel", "Romney", "Corriedale", "Lincoln", "Border Leicester"
    ],
    Porcino: [
        "Yorkshire", "Landrace", "Duroc", "Hampshire", "Berkshire", "Tamworth",
        "Gloucestershire Old Spot", "Large Black", "Pietrain", "Mangalitsa"
    ],
    Felino: [
        "Persa", "Siamés", "Maine Coon", "Bengalí", "Angora", "Abisinio", "Ragdoll",
        "Sphynx", "Birmano", "British Shorthair", "Devon Rex", "Norwegian Forest Cat", "Siberian"
    ],
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