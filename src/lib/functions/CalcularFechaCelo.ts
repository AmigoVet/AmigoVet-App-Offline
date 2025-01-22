type EspeciesFrecuencias = {
  [key: string]: number;
};

const especiesFrecuencias: EspeciesFrecuencias = {
  Canino: 180,
  Felino: 21,
  Bovino: 21,
  Equino: 21,
  Porcino: 21,
  Caprino: 18,
};

export const calcularProximaFechaCelo = (
  ultimaFechaCalor: string,
  especie: keyof EspeciesFrecuencias
): string => {
  const frecuenciaDias = especiesFrecuencias[especie];

  if (!frecuenciaDias) {
    throw new Error(`Especie no reconocida: ${especie}`);
  }

  const ultimaFecha = new Date(ultimaFechaCalor);

  // Calcula la próxima fecha de celo
  const proximaFecha = new Date(ultimaFecha);
  proximaFecha.setDate(ultimaFecha.getDate() + frecuenciaDias);

  const opciones: Intl.DateTimeFormatOptions = {
    weekday: "long", // Día de la semana
    day: "numeric",  // Día del mes
    month: "long",   // Mes completo
    year: "numeric", // Año completo
  };

  const formatoFecha = new Intl.DateTimeFormat("es-ES", opciones).format(proximaFecha);

  return `Próximo ${formatoFecha}`; 
};
