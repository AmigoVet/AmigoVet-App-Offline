import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { CustomInput, CustomButton } from '../../Customs'; // Asegúrate de importar estos componentes correctamente
import { useTheme } from '../../../lib/context/';
import { getDynamicColors } from '../../../assets/styles/colors';
import { AnimalViewStyles } from '../../../assets/styles/AnimalViewStyles';

// Props para el componente
interface Props {
  currentField: string; // Campo actual que se está creando
  animalId: string; // ID del animal
  animalEspecie: string; // Especie del animal
  onSave: (field: string, value: string, animalId: string, animalEspecie: string, callback: () => void) => void; // Función para guardar
  onClose: () => void; // Función para cerrar el modal
}

const ContentModalCreateRegister: React.FC<Props> = ({ currentField, animalId, animalEspecie, onSave, onClose }) => {
  const [fieldValue, setFieldValue] = useState<string>("");

  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const styles = AnimalViewStyles(colors);

  return (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{currentField}</Text>

      {/* Renderiza el input según el campo actual */}
      {currentField === "Registro Preñes" && (
        <CustomInput
          label="Comentario"
          placeholder="Comentario"
          value={fieldValue}
          onChangeText={setFieldValue}
        />
      )}
      {currentField === "Registro Tratamiento" && (
        <CustomInput
          label="Comentario del tratamiento"
          placeholder="Tipo de tratamiento"
          value={fieldValue}
          onChangeText={setFieldValue}
        />
      )}
      {currentField === "Registro Inseminacion" && (
        <CustomInput
          label="Comentario de inseminación"
          placeholder="Proveedor del semen"
          value={fieldValue}
          onChangeText={setFieldValue}
        />
      )}

      {/* Botón para guardar */}
      <CustomButton
        text="Guardar"
        onPress={() => {
          onSave(currentField, fieldValue, animalId, animalEspecie, () => {
            onClose(); // Cerrar el modal
            setFieldValue(""); // Reiniciar el campo
          });
        }}
      />

      {/* Botón para cancelar */}
      <CustomButton
        text="Cancelar"
        onPress={() => {
          onClose(); // Cerrar el modal
          setFieldValue(""); // Reiniciar el campo
        }}
        red
      />
    </View>
  );
};

export default ContentModalCreateRegister;
