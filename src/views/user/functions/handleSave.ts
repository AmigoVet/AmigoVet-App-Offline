import { Alert } from "react-native";
import { updateAnimal } from "../../../lib/db/animals/updateDataAnimal";
import { setDataRegister } from "../../../lib/db/registers/setDataRegister";
import { Register } from "../../../lib/interfaces/registers";

export const handleSave = async (
    currentField: string,
    fieldValue: string,
    animalId: string,
    onFinish: () => void
) => {
    if (currentField) {
        const generateId = () => Math.random().toString(36).substr(2, 9);

        // Actualizar los datos del animal
        try {
            await updateAnimal(animalId, {
                [currentField]: fieldValue, 
            });
            console.log("Datos del animal actualizados exitosamente.");
        } catch (error) {
            console.error("Error al actualizar los datos del animal:", error);
            return;
        }

        // Verificar FieldValue para guardar el registro de manera legible
        if (currentField === "image"){
            fieldValue = "Imagen principal";
            currentField = "Imagen principal";
        } else if (currentField === "image2"){
            fieldValue = "Imagen secundaria";
            currentField = "Imagen secundaria";
        } else if (currentField === "image3"){
            fieldValue = "Imagen extra";
            currentField = "Imagen extra";
        }
        const register: Register = {
            id: generateId(),
            animalId: animalId,
            comentario: "Nuevo " + currentField + ": " + fieldValue,
            accion: `Cambio de ${currentField}`,
            fecha: new Date().toISOString(),
        };

        // Guardar el registro
        try {
            // console.log("Registro a guardar:", JSON.stringify(register, null, 2));
            await setDataRegister(register);
        } catch (error) {
            console.error("Error al guardar el registro:", error);
        }
        Alert.alert(currentField, "actualizado correctamente");
        onFinish();
    } else {
        console.error("No se proporcionó un campo o valor para guardar.");
    }
};

