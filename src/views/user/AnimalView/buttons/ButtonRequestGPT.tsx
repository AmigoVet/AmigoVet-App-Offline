import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { Modalize } from 'react-native-modalize';
import { Register } from '@tanstack/react-query';
import { AnimalViewStyles } from '../../../../assets/styles/AnimalViewStyles';
import { getDynamicColors, newColors } from '../../../../assets/styles/colors';
import { CustomIcon, CustomInput, CustomButton } from '../../../../components/Customs';
import { gptRequest } from '../../../../lib/functions/gptRequest';
import { Animal, Notes } from '../../../../lib/interfaces/animal';
import { getAvailableRequests, manageDailyRequests } from '../../../../lib/utils/limitRequestGpt';
import { useTheme } from '../../../../lib/context/ThemeContext';

interface Props {
  animal: Animal;
  registers: Register[];
  notes: Notes[];
}

const ButtonRequestGPT: React.FC<Props> = ({ animal, registers, notes }) => {
  const modalRefGpt = useRef<Modalize>(null);
  const [fieldPeticionGpt, setFieldPeticionGpt] = useState("");
  const [availableRequest, setAvailableRequest] = useState<number>(0);

  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const styles = dynamicStyles(colors);
  const modalStyles = AnimalViewStyles(colors);

  // Cargar la configuración inicial
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const availableRequests = await getAvailableRequests();
        setAvailableRequest(availableRequests);
      } catch (error) {
        console.error("Error al cargar la configuración:", error);
      }
    };
    loadSettings();
  }, []);

  // Petición GPT
  const handleGPTRequest = async () => {
    try {
      if (!fieldPeticionGpt.trim()) {
        Alert.alert("Error", "Por favor ingresa tu duda antes de enviar.");
        return;
      }

      const canRequest = await manageDailyRequests();
      if (canRequest) {
        setAvailableRequest((prev) => prev - 1);
        const response = await gptRequest(fieldPeticionGpt, animal, registers, notes);
        console.log("Respuesta GPT:", response);
        Alert.alert("Respuesta", response || "No se obtuvo una respuesta válida.");
      } else {
        Alert.alert("Límite alcanzado", "Has alcanzado el límite de solicitudes disponibles.");
      }
    } catch (error) {
      console.error("Error al realizar la petición GPT:", error);
      Alert.alert("Error", "No se pudo realizar la petición. Inténtalo nuevamente más tarde.");
    }
  };

  return (
    <>
      <Pressable style={styles.button} onPress={() => modalRefGpt.current?.open()}>
        <CustomIcon name="sparkles-sharp" size={30} color={newColors.fondo_principal} />
      </Pressable>
      <Modalize ref={modalRefGpt} modalHeight={600} modalStyle={{ backgroundColor: colors.fondo }}>
        <View style={modalStyles.modalContent}>
          <Text>{availableRequest} solicitudes disponibles</Text>
          <Text style={modalStyles.modalTitle}>Hazle tu pregunta a tu veterinario personal!</Text>
          <CustomInput
            label="Escribe aquí tu duda"
            placeholder="Mi animal se siente mal..."
            value={fieldPeticionGpt}
            onChangeText={setFieldPeticionGpt}
          />
          <CustomButton text="Enviar" onPress={handleGPTRequest} />
          <CustomButton text="Cancelar" onPress={() => modalRefGpt.current?.close()} red />
        </View>
      </Modalize>
    </>
  );
};

const dynamicStyles = (colors: ReturnType<typeof getDynamicColors>) =>
  StyleSheet.create({
    button: {
      backgroundColor: newColors.verde,
      position: 'absolute',
      zIndex: 10,
      bottom: 20,
      right: 20,
      borderRadius: 50,
      padding: 10,
      height: 50,
      width: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default ButtonRequestGPT;
