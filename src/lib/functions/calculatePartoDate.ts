import { Especie } from "../interfaces/Animal";


export const calculatePartoDate = (startDate: Date, especie: Especie): Date => {
  const gestationDays = {
    Bovino: 280,
    Canino: 63,
    Aviar: 21,
    Equino: 340,
    Caprino: 150,
    Ovino: 147,
    Porcino: 115,
    Felino: 65,
  }[especie];

  if (!gestationDays) {
    throw new Error(`Especie no válida: ${especie}`);
  }

  const partoDate = new Date(startDate);
  partoDate.setDate(partoDate.getDate() + gestationDays);
  return partoDate;
};
