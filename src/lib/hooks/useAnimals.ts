import { useState, useEffect } from 'react';
import { Animal } from '../interfaces/animal';
import { getAnimalById } from '../utils/asyncStorage';

const useAnimals = (id: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        setIsLoading(true);
        setError(null); // Reiniciar error en cada llamada
        const fetchedAnimal = await getAnimalById(id);
        if (!fetchedAnimal) {
          setError(`No se encontró información para el animal con ID ${id}`);
        } else {
          setAnimal(fetchedAnimal);
        }
      } catch (err) {
        setError('Error al obtener la información del animal');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  return { animal, isLoading, error };
};

export default useAnimals;
