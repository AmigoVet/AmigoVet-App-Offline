import { useState, useEffect } from 'react';
import { Animal, AnimalWithNotes } from '../interfaces/animal';
import { getAnimalById } from '../utils/asyncStorage';
import { getSimplificatedDataAnimalsWithNotes, getLenghtAnimal } from '../db/getDataAnimal';

const useCardPrivateAnimal = (userId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [animals, setAnimals] = useState<AnimalWithNotes[]>();
  const [lenght, setLenght] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        setIsLoading(true);
        const animales = await getSimplificatedDataAnimalsWithNotes(String(userId));
        const lengthAnimals = await getLenghtAnimal(userId);
        setLenght(lengthAnimals);
        setAnimals(animales);
        setIsLoading(false);
      } catch (err) {
        setError('Error al obtener la información del animal');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimal();
  }, [userId]);

  return { animals, isLoading, error, lenght };
};

export default useCardPrivateAnimal;
