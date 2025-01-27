

export const calcularEdadAños = (fechaNacimiento: string) => {
    const fechaNac = new Date(fechaNacimiento); // Convierte la fecha de nacimiento en un objeto Date
    const hoy = new Date(); // Fecha actual
  
    let edad = hoy.getFullYear() - fechaNac.getFullYear(); // Calcula la diferencia de años
    const mes = hoy.getMonth() - fechaNac.getMonth(); // Calcula la diferencia de meses
  
    // Si el mes actual es menor que el mes de nacimiento, o si es el mismo mes pero el día actual es menor, resta un año
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
  
    return edad; // Devuelve la edad en años
  };
  
  