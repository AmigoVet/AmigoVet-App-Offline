import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../lib/context/';
import { AnimalViewStyles } from '../../../assets/styles/AnimalViewStyles';
import { getDynamicColors } from '../../../assets/styles/colors';
import { createGlobalStyles } from '../../../assets/styles/styles';
import { CustomInput, CustomButton } from '../../Customs';
import { getAvailableRequests, manageDailyRequests } from '../../../lib/utils/limitRequestGpt';
import { gptRequest } from '../../../lib/functions/gptRequest';
import { Animal, Notes } from '../../../lib/interfaces/animal';
import { Register } from '../../../lib/interfaces/registers'; 

interface Props {
  question: string;
  animal: Animal;
  registers: Register[];
  notes: Notes[];
  onClose: () => void; 
}

const ContentModalGptRequest: React.FC<Props> = ({ animal, registers, notes, onClose }) => {
  const [fieldPeticionGpt, setFieldPeticionGpt] = useState("");
  const [availableRequest, setAvailableRequest] = useState<number>(5);

  useEffect(() => {
    const fetchAvailableRequests = async () => {
      const n = await getAvailableRequests();
      setAvailableRequest(n);
    };
    fetchAvailableRequests();
  }, []);

  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const GlobalStyles = createGlobalStyles(isDarkTheme);
  const styles = AnimalViewStyles(colors);

  const handleGPTRequest = async (question: string) => {
    try {
      const canRequest = await manageDailyRequests();
      if (canRequest) {
        const response = await gptRequest(question, animal, registers, notes ?? []);
        console.log(response);
      } else {
        Alert.alert("Límite de solicitudes alcanzado");
      }
    } catch (error) {
      console.error("Error al realizar la petición GPT:", error);
    }
  };

  return (
    <View style={styles.modalContent}>
      <Text>{availableRequest} solicitudes disponibles</Text>
      <Text style={styles.modalTitle}>Hazle tu pregunta a tu veterinario personal!</Text>
      <CustomInput
        label="Escribe aquí tu duda"
        placeholder="Mi animal se siente mal..."
        value={fieldPeticionGpt}
        onChangeText={setFieldPeticionGpt}
      />
      <CustomButton
        text="Enviar"
        onPress={() => handleGPTRequest(fieldPeticionGpt)}
      />
      <CustomButton
        text="Cancelar"
        onPress={onClose} 
        red
      />
    </View>
  );
};

export default ContentModalGptRequest;
