import React, { useState } from 'react';
import { Alert } from 'react-native';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import CustomImagePicker from '../../../components/customs/CustomImagePicker';
import { Especie, especiesRazasMap, generos, propositosPorEspecie, Animal, Raza } from '../../../../lib/interfaces/Animal';
import CustomSelect from '../../../components/customs/CustomSelect';
import CustomButton from '../../../components/customs/CustomButton';
import Separator from '../../../components/Separator';
import CustomDatePicker from '../../../components/customs/CustomDatePicker';
import { calculateOld } from '../../../../lib/functions/CalculateOld';
import CustomInput from '../../../components/customs/CustomImput';

// Extend Animal interface to include temporary form fields
interface FormData extends Partial<Animal> {
  edad?: string;
  fechaNacimiento?: Date | null;
}

const New = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    identificador: '',
    especie: undefined,
    raza: undefined,
    genero: undefined,
    peso: '',
    edad: '',
    fechaNacimiento: null,
    color: '',
    proposito: '',
    ubicacion: '',
    descripcion: '',
    image: '',
    ownerId: '',
    id: '',
    created_at: '',
    updated_at: '',
    embarazada: false,
  });

  // Generic handler for updating form fields
  const handleChange = (field: keyof FormData, value: string | Date | null) => {
    setFormData((prev) => {
      const newFormData = { ...prev, [field]: value };

      // Reset raza and proposito when especie changes
      if (field === 'especie') {
        newFormData.raza = undefined;
        newFormData.proposito = '';
      }
      // Update edad and nacimiento when fechaNacimiento changes
      if (field === 'fechaNacimiento' && value instanceof Date) {
        newFormData.edad = calculateOld(value);
        newFormData.nacimiento = value.toISOString();
      }
      // Clear fechaNacimiento and nacimiento when edad is manually set
      if (field === 'edad') {
        newFormData.fechaNacimiento = null;
        newFormData.nacimiento = undefined;
      }

      return newFormData;
    });
  };

  // Ensure razasDisponibles and propositosDisponibles are always arrays
  const razasDisponibles =
    formData.especie && especiesRazasMap[formData.especie as Especie]
      ? especiesRazasMap[formData.especie as Especie]
      : [];
  const propositosDisponibles =
    formData.especie && propositosPorEspecie[formData.especie as Especie]
      ? propositosPorEspecie[formData.especie as Especie]
      : [];

  return (
    <GlobalContainer>
      <Header
        title="Agrega un Animal"
        onPress={() => Alert.alert('Debería mostrar info de cómo agregar un animal y cosas así')}
      />
      <ScrollView
        style={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <CustomImagePicker
          onImageSelected={(uri) => handleChange('image', uri || '')}
        />

        <CustomInput
          required
          label="Nombre"
          value={formData.nombre || ''}
          onChangeText={(value) => handleChange('nombre', value)}
          placeholder="Nombre del animal"
        />

        <CustomInput
          label="Identificador"
          value={formData.identificador || ''}
          onChangeText={(value) => handleChange('identificador', value)}
          placeholder="Identificador único"
        />

        <CustomSelect
          required
          label="Especie"
          value={formData.especie || ''}
          options={Object.keys(especiesRazasMap)}
          onChange={(value) => handleChange('especie', value)}
        />

        <CustomSelect
          required
          label="Raza"
          value={formData.raza || ''}
          options={razasDisponibles}
          onChange={(value) => handleChange('raza', value)}
        />

        <CustomSelect
          required
          label="Propósito"
          value={formData.proposito || ''}
          options={propositosDisponibles}
          onChange={(value) => handleChange('proposito', value)}
        />

        <CustomSelect
          required
          label="Género"
          value={formData.genero || ''}
          options={generos}
          onChange={(value) => handleChange('genero', value)}
        />

        <CustomDatePicker
          label="Fecha de Nacimiento"
          value={formData.fechaNacimiento || null}
          onDateChange={(date) => handleChange('fechaNacimiento', date)}
          onAgeChange={(age) => handleChange('edad', age)}
          onBirthDateCalculated={(birthDate) => handleChange('fechaNacimiento', birthDate)}
          ageValue={formData.edad || ''}
        />

        <CustomInput
          required
          label="Peso"
          value={formData.peso || ''}
          onChangeText={(value) => handleChange('peso', value)}
          placeholder="Peso en kg"
          type="number"
        />
        <CustomInput
          required
          label="Color"
          value={formData.color || ''}
          onChangeText={(value) => handleChange('color', value)}
          placeholder="Color del animal"
        />
        <CustomInput
          required
          label="Ubicación"
          value={formData.ubicacion || ''}
          onChangeText={(value) => handleChange('ubicacion', value)}
          placeholder="Ubicación del animal"
        />
        <CustomInput
          label="Descripción"
          value={formData.descripcion || ''}
          onChangeText={(value) => handleChange('descripcion', value)}
          placeholder="Descripción adicional"
          multiline
        />

        <CustomButton
          text="Guardar"
          onPress={() => {
            if (
              !formData.nombre ||
              !formData.especie ||
              !formData.raza ||
              !formData.proposito ||
              !formData.genero ||
              !formData.peso ||
              !formData.color ||
              !formData.ubicacion
            ) {
              Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
              return;
            }

            const animalData: Animal = {
              ownerId: formData.ownerId || '',
              id: formData.id || '',
              identificador: formData.identificador || '',
              nombre: formData.nombre || '',
              especie: formData.especie,
              raza: formData.raza,
              nacimiento: formData.nacimiento,
              genero: formData.genero,
              peso: formData.peso || '',
              color: formData.color || '',
              descripcion: formData.descripcion || '',
              image: formData.image || '',
              image2: formData.image2,
              image3: formData.image3,
              proposito: formData.proposito || '',
              ubicacion: formData.ubicacion || '',
              created_at: formData.created_at || '',
              updated_at: formData.updated_at || '',
              embarazada: formData.embarazada || false,
            };

            console.log('Animal data:', animalData);
            Alert.alert('Formulario enviado', JSON.stringify(animalData, null, 2));
          }}
        />
        <Separator height={200} />
      </ScrollView>
    </GlobalContainer>
  );
};

export default New;