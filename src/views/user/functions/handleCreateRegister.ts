import { updateAnimal } from "../../../lib/db/animals/updateDataAnimal";
import { deleteDataNotas } from "../../../lib/db/notas/deleteDataNotas";
import { getDataNotas } from "../../../lib/db/notas/getDataNotas";
import { setDataNotas } from "../../../lib/db/notas/setDataNotas";
import { setDataRegister } from "../../../lib/db/registers/setDataRegister";
import { calculateDueDate } from "../../../lib/functions/CalcularFechaParto";
import { Especie, Notes } from "../../../lib/interfaces/animal";
import { Register } from "../../../lib/interfaces/registers";

export const handleCreateRegister = async (
  field: string,
  fieldValue: string,
  animalId: string,
  animalSpecies: Especie,
  onFinish: () => void
) => {
  // espacioEntreTesteo();
  console.log(":");
  console.log(":");
  console.log(":");
  console.log(":");
  console.log(":");
  console.log(":");
  if (!field) return;

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const baseRegister: Register = {
    id: generateId(),
    animalId: animalId,
    comentario: fieldValue,
    accion: field,
    fecha: new Date().toISOString(),
  };

  const baseNote: Notes = {
    id: generateId(),
    animalId: animalId,
    nota: fieldValue,
    fecha: new Date().toISOString(),
    created_at: new Date().toISOString(),
  };

  if (field === "Registro Preñes") {
    baseNote.nota = "Posible fecha de parto:";
    baseNote.fecha = calculateDueDate(animalSpecies, new Date());
    await updateAnimal(animalId, { embarazada: true });

  } else if (field === "Registro Tratamiento") {
    baseNote.nota = "Ultimo tratamiento de " + fieldValue + ": " ;

    // Elimina la nota anterior de "Último tratamiento"
    try {
      const notes = await getDataNotas(animalId);
      for (const note of notes) {
        if (note.nota.startsWith("Ultimo tratamiento de")) {
          await deleteDataNotas(note.id);
        }
      }
    } catch (error) {
      console.error("Error al eliminar notas previas de tratamiento:", error);
    }

  } else if (field === "Registro Inseminacion") {
    baseNote.nota = "Posible fecha de parto:";
    baseNote.fecha = calculateDueDate(animalSpecies, new Date());
    await updateAnimal(animalId, { embarazada: true });

  } else if (field === "Registro Aborto") {
    baseNote.nota = `Hubo un aborto el: ${new Date().toISOString()}`;
    await updateAnimal(animalId, { embarazada: false });
    // Elimina la nota de "Posible fecha de parto:"
    try {
      const notes = await getDataNotas(animalId);
      for (const note of notes) {
        if (note.nota.startsWith("Posible fecha de parto:")) {
          await deleteDataNotas(note.id);
        }
      }
    } catch (error) {
      console.error("Error al eliminar notas previas de tratamiento:", error);
    }
  }

  // Guardar registro
  try {
    await setDataRegister(baseRegister);
    console.log("Registro guardado exitosamente:", baseRegister);
  } catch (error) {
    console.error("Error al guardar el registro:", error);
  }


  // Guardar nota

  try {
    await setDataNotas(baseNote);
    console.log("Nota guardada exitosamente:", baseNote);
  } catch (error) {
    console.error("Error al guardar la nota:", error);
  }


  onFinish();
};