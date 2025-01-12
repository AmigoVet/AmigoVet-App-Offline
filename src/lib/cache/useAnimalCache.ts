import { useQuery } from '@tanstack/react-query';

// Carga de datos del animal
const useAnimalData = (id: string) => {
  return useQuery(['animal', id], () => getDataAnimalbyId(id), {
    enabled: !!id, // Solo ejecuta si el ID existe
    staleTime: 1000 * 60 * 5, // 5 minutos antes de que se considere obsoleto
    cacheTime: 1000 * 60 * 30, // Mantener en caché por 30 minutos
  });
};

// Carga de registros
const useRegisterData = (id: string) => {
  return useQuery(['registers', id], () => getDataRegisters(id), {
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Carga de notas
const useNotesData = (id: string) => {
  return useQuery(['notes', id], () => getDataNotas(id), {
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Carga de configuración
const useSettingsData = () => {
  return useQuery(['settings'], getAvailableRequests, {
    staleTime: 1000 * 60 * 10,
  });
};
