export const formatearFecha = (fechaISO: string): string => {
    // Convertir la cadena ISO a un objeto Date
    const fecha = new Date(fechaISO);
  
    // Validar que la fecha sea válida
    if (isNaN(fecha.getTime())) {
      return fechaISO;
    }
  
    // Formateador para el día de la semana
    const opcionesDia = { weekday: "long" } as const;
    const nombreDia = new Intl.DateTimeFormat("es-ES", opcionesDia).format(fecha);
  
    // Formateador para el día del mes y año
    const opcionesFechaCompleta = { day: "numeric", month: "long", year: "numeric" } as const;
    const fechaCompleta = new Intl.DateTimeFormat("es-ES", opcionesFechaCompleta).format(fecha);
  
    // Retornar el formato combinado
    return `${nombreDia}, ${fechaCompleta}`;
  };
  