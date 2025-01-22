import { View, Text } from 'react-native';
import React from 'react';
import { useTheme } from '../../../lib/context/ThemeContext';
import { getDynamicColors } from '../../../assets/styles/colors';
import { AnimalViewStyles } from '../../../assets/styles/AnimalViewStyles';
import { ModalButton } from '../../global';
import { Animal } from '../../../lib/interfaces/animal';

// Props para el componente
interface Props {
  animal: Animal;
  onPressEditNombre: () => void;
  onPressEditImagen: () => void;
  onPressEditSecondImagen: () => void;
  onPressEditExtraImagen: () => void;
  onPressEditIdentificador: () => void;
  onPressEditPeso: () => void;
  onPressEditProposito: () => void;
  onPressEditUbicacion: () => void;
  onPressEditDescripcion: () => void;
  onPressEditFechaCalor: () => void;
  onPressRegistroPrenos: () => void;
  onPressRegistroAborto: () => void;
  onPressRegistroTratamiento: () => void;
  onPressRegistroInseminacion: () => void;
}

const ContentModalSelecionaropcion: React.FC<Props> = ({
  animal,
  onPressEditNombre,
  onPressEditImagen,
  onPressEditSecondImagen,
  onPressEditExtraImagen,
  onPressEditIdentificador,
  onPressEditPeso,
  onPressEditProposito,
  onPressEditUbicacion,
  onPressEditDescripcion,
  onPressEditFechaCalor,
  onPressRegistroPrenos,
  onPressRegistroTratamiento,
  onPressRegistroInseminacion,
  onPressRegistroAborto,
}) => {
  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const styles = AnimalViewStyles(colors);

  // **Validar datos del animal**
  if (!animal) {
    return (
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>No se encontró información del animal.</Text>
      </View>
    );
  }

  return (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>¿Qué registro deseas realizar?</Text>

      {/* Botones para editar campos */}
      <ModalButton text="Editar Nombre" actualData={animal.nombre} onPress={onPressEditNombre} />
      <ModalButton text="Editar Imagen Principal" onPress={onPressEditImagen} />
      <ModalButton text="Editar Imagen Secundaria" onPress={onPressEditSecondImagen} />
      <ModalButton text="Editar Imagen Extra" onPress={onPressEditExtraImagen} />
      <ModalButton text="Editar Identificador" actualData={animal.identificador} onPress={onPressEditIdentificador} />
      <ModalButton text="Editar Peso" actualData={animal.peso} onPress={onPressEditPeso} />
      <ModalButton text="Editar Propósito" actualData={animal.proposito} onPress={onPressEditProposito} />
      <ModalButton text="Editar Ubicación" actualData={animal.ubicacion} onPress={onPressEditUbicacion} />
      <ModalButton text="Editar Descripción" actualData={animal.descripcion} onPress={onPressEditDescripcion} />
      <ModalButton text="Editar ultimo celo" actualData={animal.celo} onPress={onPressEditFechaCalor} />

      {/* Separador */}
      <View style={{ width: "100%", height: 0.5, backgroundColor: colors.blanco, marginVertical: 10 }} />

      {/* Opciones condicionales */}
      {animal.genero === "Hembra" && !animal.embarazada && (
        <ModalButton text="Registrar Preñes" onPress={onPressRegistroPrenos} />
      )}
      {animal.genero === "Hembra" &&
        ["Bovino", "Equino", "Ovino", "Porcino", "Caprino"].includes(animal.especie) &&
        !animal.embarazada && (
          <ModalButton text="Registrar Inseminación" onPress={onPressRegistroInseminacion} />
        )}
      {animal.embarazada && <ModalButton text="Registrar Aborto" onPress={onPressRegistroAborto} />}
      <ModalButton text="Registrar Tratamiento" onPress={onPressRegistroTratamiento} />
    </View>
  );
};

export default ContentModalSelecionaropcion;
