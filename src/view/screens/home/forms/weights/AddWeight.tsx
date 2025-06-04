import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { RootStackParamList } from '../../../../navigator/navigationTypes';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import CustomButton from '../../../../components/customs/CustomButton';
import CustomInput from '../../../../components/customs/CustomImput';
import CustomScrollView from '../../../../components/customs/CustomScrollView';
import GlobalContainer from '../../../../components/GlobalContainer';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import Header from '../../../../components/Header';

type AddWeightRouteProp = RouteProp<RootStackParamList, 'AddWeight'>;

const AddWeight = () => {
  const { animalId, animalName } = useRoute<AddWeightRouteProp>().params;
  const { addWeight } = useAnimalStore();
  const { goBack } = useNavigation();
  const [weight, setWeight] = useState<string>('');

  const handleSubmit = async () => {
    if (!weight) {
      Alert.alert('Error', 'Por favor ingresa un peso');
      return;
    }

    const weightValue = parseFloat(weight);
    if (isNaN(weightValue) || weightValue <= 0) {
      Alert.alert('Error', 'El peso debe ser un número positivo');
      return;
    }

    try {
      const weightData = {
        id: uuidv4(),
        animalId,
        fecha: new Date().toISOString(),
        peso: weightValue.toString(),
      };

      await addWeight(weightData);

      Alert.alert('Éxito', 'Peso registrado correctamente');
      goBack();
    } catch (error: any) {
      console.error('[ERROR] Error al registrar peso:', error.message);
      Alert.alert('Error', `No se pudo registrar el peso: ${error.message || 'Error desconocido'}`);
    }
  };

  return (
    <GlobalContainer>
      <Header
        title={`Registrar Peso para ${animalName}`}
        onPress={goBack}
        iconOnPress="chevron-back-outline"
      />
      <CustomScrollView style={GlobalStyles.padding20}>
        <CustomInput
          label="Peso (kg)"
          value={weight}
          onChangeText={setWeight}
          placeholder="Ingresa el peso en kg"
          type="number"
        />
        <CustomButton text="Guardar Peso" onPress={handleSubmit} />
      </CustomScrollView>
    </GlobalContainer>
  );
};

export default AddWeight;
