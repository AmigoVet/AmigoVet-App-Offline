export const obtenerPalabras = (text: string) => {
    const palabras = text.trim().split(/\s+/);
    const cantidad = palabras.length;
  
    if (cantidad >= 4) {
      return `${palabras[0]} ${palabras[2]}`; // Retorna la primera y tercera palabra si hay cuatro o más
    } else if (cantidad === 3) {
      return `${palabras[0]} ${palabras[1]}`; // Retorna la primera y segunda si hay tres
    } else if (cantidad === 2) {
      return `${palabras[0]} ${palabras[1]}`; // Retorna las dos palabras si hay solo dos
    }
    
    return text; 
  };
  
  