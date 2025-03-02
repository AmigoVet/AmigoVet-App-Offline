import { View } from 'react-native';
import React, { useState } from 'react';
import { CustomInput, CustomButton } from '../../Customs'; // Asegúrate de importar estos componentes correctamente
import { useTheme } from '../../../lib/context/';
import { getDynamicColors } from '../../../assets/styles/colors';
import { AnimalViewStyles } from '../../../assets/styles/AnimalViewStyles';

// Props para el componente
interface Props {
  currentField: string; // Campo actual que se está actualizando
  initialValue: string; // Valor inicial del campo
  animalId: string; // ID del animal
  onSave: (field: string, value: string, animalId: string, callback: () => void) => void; // Función para guardar los datos
  onClose: () => void; // Función para cerrar el modal
  onReload: () => void; // Función para recargar los datos
}

const ContentModalUpdateData: React.FC<Props> = ({ currentField, initialValue, animalId, onSave, onClose, onReload }) => {
  const [fieldValue, setFieldValue] = useState<string>(initialValue);

  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const styles = AnimalViewStyles(colors);

  return (
    <View style={styles.modalContent}>
      <CustomInput
        label={`Ingresa el ${currentField}`}
        placeholder={currentField}
        value={fieldValue}
        onChangeText={setFieldValue}
      />
      {/* Botón para guardar los cambios */}
      <CustomButton
        text="Guardar"
        onPress={() => {
          onSave(currentField, fieldValue, animalId, () => {
            onClose(); // Cerrar el modal
            onReload(); // Recargar los datos
            setFieldValue(""); // Reiniciar el estado
          });
        }}
      />
      {/* Botón para cancelar */}
      <CustomButton
        text="Cancelar"
        onPress={() => {
          setFieldValue(initialValue); // Reiniciar al valor inicial
          onClose(); // Cerrar el modal
        }}
        red
      />
    </View>
  );
};

export default ContentModalUpdateData;
