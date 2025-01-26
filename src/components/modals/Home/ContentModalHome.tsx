import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import { getDynamicColors } from "../../../assets/styles/colors";
import { useTheme } from "../../../lib/context/ThemeContext";
import { deleteDataAnimal } from "../../../lib/db/animals/deleteDataAnimal";
import { Animal } from "../../../lib/interfaces/animal";
import { constants } from "../../../assets/styles/constants";
import { HomeViewStyles } from "../../../assets/styles/HomeViewStyles";

interface ContendModalProps {
    selectedAnimal: Animal;
    modalRef: React.RefObject<Modalize>;
    onPress: () => void;
}
const ContentModalHome: React.FC<ContendModalProps> = ({ selectedAnimal, modalRef, onPress }) => {
    const { isDarkTheme } = useTheme();
    const colors = getDynamicColors(isDarkTheme);
    const styles = HomeViewStyles(colors);
    
    const deleteAnimal = async () => {
        if (selectedAnimal) {
          await deleteDataAnimal(selectedAnimal.id);
          modalRef.current?.close();
          onPress();
        }
      };

    return  (
        <View style={styles.modalContent}>
          <Text style={[styles.modalTitle, { color: colors.naranja }]}>¿Estás seguro de eliminar este animal?</Text>
          {selectedAnimal && (
            <>
              <Text style={[styles.modalId, { color: colors.blanco }]}>ID del animal: {selectedAnimal.id}</Text>
              <Text style={[styles.modalId, { color: colors.blanco }]}>Nombre del animal: {selectedAnimal.nombre}</Text>
            </>
          )}
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.naranja }]}
              onPress={() => modalRef.current?.close()}
            >
              <Text style={[styles.modalButtonText, { color: colors.blanco }]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.rojo }]}
              onPress={deleteAnimal}
            >
              <Text style={[styles.modalButtonText, { color: 'white' }]}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}


export default ContentModalHome;