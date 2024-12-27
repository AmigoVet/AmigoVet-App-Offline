import { updateAnimal } from "../../../lib/db/animals/updateDataAnimal";
import { setDataRegister } from "../../../lib/db/registers/setDataRegister";
import { calculateDueDate } from '../../../lib/functions/CalcularFechaParto';
import { PregnancyRegister, TreatmentRegister, InseminationRegister, AbortoRegister, Especie } from "../../../lib/interfaces/animal";
import { Register } from "../../../lib/interfaces/registers";

interface props {
    field: string;
    fieldValue: string;
    animalId: string;
    animalSpecies: Especie;
    onFinish?: () => void;
}

export const handleCreateRegister = async (field: string, fieldValue: string, animalId: string, animalSpecies: Especie, onFinish: () => void) => {


    if (field) {
      const generateId = () => Math.random().toString(36).substr(2, 9);
  
      const baseRegister: Register = {
        id: generateId(),
        animalId: animalId,
        comentario: fieldValue,
        accion: field,
        fecha: new Date().toISOString(),
      };
  
      let specificRegister: Register | PregnancyRegister | TreatmentRegister | InseminationRegister | AbortoRegister;
  
      if (field === 'Registro Preñes') {
        specificRegister = {
          ...baseRegister,
          fechaPartoEstimada: calculateDueDate(animalSpecies, new Date()),
        };
        // await saveNoteAnimal(animalId, { nota: `Posible fecha de parto: ${actualDay}` });
        try {
          await updateAnimal(animalId, {
            embarazada: true,
          });
        } catch (error) {
          console.error("Error al cambiar el estado de preñes:", error);
        }
      } else if (field === 'Registro Tratamiento') {
        specificRegister = {
          ...baseRegister,
          tipoTratamiento: fieldValue,
        };
        // await saveNoteAnimal(animal!.id, { nota: `Ultimo tratamiento: ${actualDay} de ${fieldValue}` });
      } else if (field === 'Registro Inseminacion') {
        specificRegister = {
          ...baseRegister,
          semenProveedor: fieldValue,
        };
        // await saveNoteAnimal(animal!.id, { nota: `Posible fecha de parto: ${actualDay}` });
        try {
          await updateAnimal(animalId, {
            embarazada: true,
          });
        } catch (error) {
          console.error("Error al cambiar el estado de preñes:", error);
        }
      } else if (field === 'Registro Aborto') {
        specificRegister = {
          ...baseRegister,
          fechaAborto: fieldValue,
        };
        // await saveNoteAnimal(animal!.id, { nota: `Hubo un aborto el : ${actualDay}` });
        try {
          await updateAnimal(animalId, {
            embarazada: false,
          });
        } catch (error) {
          console.error("Error al cambiar el estado de preñes:", error);
        }
  
        // Elimina la nota de "Posible fecha de parto:"
        // await deleteNoteAnimal(animal!.id, 'Posible fecha de parto:');
      } else {
        specificRegister = baseRegister;
      }
      
      
  
      await setDataRegister(baseRegister);
  
      // Actualizar lista de registros
    //   await setDataRegister(specificRegister);
      onFinish();
    //   modalCreateRegister.current?.close();
    }
  };
  