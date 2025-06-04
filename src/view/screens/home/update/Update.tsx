import React, { useState } from 'react';
import { Alert } from 'react-native';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '../../../navigator/navigationTypes';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import CustomScrollView from '../../../components/customs/CustomScrollView';
import { Animal, Especie, propositosPorEspecie } from '../../../../lib/interfaces/Animal';
import CustomButton from '../../../components/customs/CustomButton';
import Separator from '../../../components/Separator';
import CustomInput from '../../../components/customs/CustomImput';
import CustomSelect from '../../../components/customs/CustomSelect';
import { useAuthStore } from '../../../../lib/store/authStore';
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';
import { GlobalStyles } from '../../../styles/GlobalStyles';

type AnimalViewRouteProp = RouteProp<RootStackParamList, 'AnimalView'>;

interface FormData {
  nombre: string;
  identificador: string;
  proposito: string;
  ubicacion: string;
  descripcion: string;
}

const Update = () => {
  const { goBack } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<AnimalViewRouteProp>();
  const { user } = useAuthStore();
  const { updateAnimal } = useAnimalStore();

  const { animal } = route.params;

  const [formData, setFormData] = useState<FormData>({
    nombre: animal.nombre || '',
    identificador: animal.identificador || '',
    proposito: animal.proposito || '',
    ubicacion: animal.ubicacion || '',
    descripcion: animal.descripcion || '',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.nombre ||
      !formData.proposito ||
      !formData.ubicacion
    ) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    if (!user?.id) {
      Alert.alert('Error', 'Usuario no autenticado');
      return;
    }

    const updatedAnimal: Animal = {
      ...animal, // Retain all unchanged fields from the original animal
      nombre: formData.nombre,
      identificador: formData.identificador,
      proposito: formData.proposito,
      ubicacion: formData.ubicacion,
      descripcion: formData.descripcion,
      updated_at: new Date().toISOString(),
      isChanged: true,
    };

    try {
      await updateAnimal(updatedAnimal);
      Alert.alert('Éxito', 'Animal actualizado correctamente');
      goBack();
    } catch (error) {
      console.error('[ERROR] Error al actualizar animal:', error);
      Alert.alert('Error', 'No se pudo actualizar el animal');
    }
  };

  const propositosDisponibles =
    animal.especie && propositosPorEspecie[animal.especie as Especie]
      ? propositosPorEspecie[animal.especie as Especie]
      : [];

  return (
    <GlobalContainer>
      <Header title="Actualizar Animal" onPress={goBack} iconOnPress="chevron-back-outline" />
      <CustomScrollView style={GlobalStyles.padding20}>
        <CustomInput
          required
          label="Nombre"
          value={formData.nombre}
          onChangeText={(value) => handleChange('nombre', value)}
          placeholder="Nombre del animal"
        />

        <CustomInput
          label="Identificador"
          value={formData.identificador}
          onChangeText={(value) => handleChange('identificador', value)}
          placeholder="Identificador único"
        />

        <CustomSelect
          required
          label="Propósito"
          value={formData.proposito}
          options={propositosDisponibles}
          onChange={(value) => handleChange('proposito', value)}
        />

        <CustomInput
          required
          label="Ubicación"
          value={formData.ubicacion}
          onChangeText={(value) => handleChange('ubicacion', value)}
          placeholder="Ubicación del animal"
        />

        <CustomInput
          label="Descripción"
          value={formData.descripcion}
          onChangeText={(value) => handleChange('descripcion', value)}
          placeholder="Descripción adicional"
          multiline
        />

        <CustomButton text="Actualizar" onPress={handleSubmit} />
        <Separator height={200} />
      </CustomScrollView>
    </GlobalContainer>
  );
};

export default Update;