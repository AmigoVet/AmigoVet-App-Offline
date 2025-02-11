import { Especie } from "../interfaces/animal";

export const calculateDueDate = (species: Especie, inseminationDate: Date): string => {
  const gestationPeriods: { [key in Especie]: number } = {
    Bovino: 283,
    Canino: 63,
    Aviar: 21,
    Equino: 340,
    Caprino: 150,
    Ovino: 152,
    Porcino: 114,
    Felino: 63,
    Desconocida: 0,
  };

  if (!gestationPeriods[species]) {
    return `Especie no reconocida: ${species}`;
  }

  const gestationDays = gestationPeriods[species];

  const dueDate = new Date(inseminationDate);
  dueDate.setDate(dueDate.getDate() + gestationDays);

  // Formatear la fecha en estilo largo
  const formatter = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatter.format(dueDate);
};

