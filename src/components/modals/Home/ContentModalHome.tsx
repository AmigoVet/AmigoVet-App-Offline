import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import { getDynamicColors, newColors } from "../../../assets/styles/colors";
import { useTheme } from "../../../lib/context/ThemeContext";
import { deleteDataAnimal } from "../../../lib/db/animals/deleteDataAnimal";
import { Animal } from "../../../lib/interfaces/animal";
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
          <Text style={[styles.modalTitle, { color: newColors.verde }]}>¿Estás seguro de eliminar este animal?</Text>
          {selectedAnimal && (
            <>
              <Text style={[styles.modalId, { color: newColors.fondo_secundario }]}>
                  ID del animal: 
                  <Text style={{fontWeight: '200'}}> {selectedAnimal.id}</Text>
              </Text>
              <Text style={[styles.modalId, { color: newColors.fondo_secundario }]}>
                Nombre del animal: 
                <Text  style={{fontWeight: '200'}}> {selectedAnimal.nombre}</Text>
              </Text>
            </>
          )}
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: newColors.verde_light }]}
              onPress={() => modalRef.current?.close()}
            >
              <Text style={[styles.modalButtonText, { color: newColors.fondo_principal }]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: newColors.rojo }]}
              onPress={deleteAnimal}
            >
              <Text style={[styles.modalButtonText, { color: newColors.fondo_principal }]}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}


export default ContentModalHome;