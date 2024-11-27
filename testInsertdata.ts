import { insertAnimal } from "./SQLiteConfig";

export const testInsertAnimal = async () => {
    const animal = {
        name: 'Fido',
        description: 'Un perro amigable',
        species: 'Perro',
        breed: 'Labrador',
        age: 3,
        gender: 'Macho',
        weight: 30,
        color: 'Marrón',
        image: 'ruta/a/imagen.jpg',
        ubicacion: 'Parque',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
    try {
        await insertAnimal(animal);
        console.log('Animal insertado correctamente:', animal);
    } catch (error) {
        console.log('Error insertando animal:', error);
    }
};
