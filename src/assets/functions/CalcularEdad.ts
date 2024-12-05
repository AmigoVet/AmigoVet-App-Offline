export const calcularEdad = (nacimiento: string | Date | undefined): string => {
  if (!nacimiento) {
    return "Fecha desconocida";
  }

  const fechaNacimiento = typeof nacimiento === "string" ? new Date(nacimiento) : nacimiento;
  const hoy = new Date();
  const diferenciaTiempo = hoy.getTime() - fechaNacimiento.getTime();
  const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));

  if (diferenciaDias < 7) {
    return `${diferenciaDias} día${diferenciaDias === 1 ? "" : "s"}`;
  } else if (diferenciaDias < 30) {
    const semanas = Math.floor(diferenciaDias / 7);
    return `${semanas} semana${semanas === 1 ? "" : "s"}`;
  } else if (diferenciaDias < 365) {
    const meses = Math.floor(diferenciaDias / 30);
    return `${meses} mes${meses === 1 ? "" : "es"}`;
  } else {
    const años = Math.floor(diferenciaDias / 365);
    return `${años} año${años === 1 ? "" : "s"}`;
  }
};
