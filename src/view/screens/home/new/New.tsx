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
  customEspecie?: string;
  customRaza?: string;
  customProposito?: string;
  edad?: string;
  fechaNacimiento?: Date | null;
  especieSeleccionada?: string;
  razaSeleccionada?: string;
}

const New = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    identificador: '',
    especie: undefined,
    especieSeleccionada: '',
    customEspecie: '',
    raza: undefined,
    razaSeleccionada: '',
    customRaza: '',
    genero: undefined,
    peso: '',
    edad: '',
    fechaNacimiento: null,
    color: '',
    proposito: '',
    customProposito: '',
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

      // Handle especie and especieSeleccionada
      if (field === 'especieSeleccionada') {
        newFormData.especie = value === 'Otro' || value === 'Desconocida' ? 'Desconocida' : (value as Especie);
        newFormData.customEspecie = '';
        newFormData.raza = undefined;
        newFormData.razaSeleccionada = '';
        newFormData.proposito = '';
      }
      // Handle raza and razaSeleccionada
      if (field === 'razaSeleccionada') {
        newFormData.raza = value === 'Otro' || value === 'Desconocida' ? 'Desconocida' : (value as Raza);
        newFormData.customRaza = '';
      }
      // Reset customProposito when proposito changes
      if (field === 'proposito' && value !== 'Otro') {
        newFormData.customProposito = '';
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
    formData.especie && formData.especie !== 'Desconocida' && especiesRazasMap[formData.especie as Especie]
      ? especiesRazasMap[formData.especie as Especie]
      : [];
  const propositosDisponibles =
    formData.especie && formData.especie !== 'Desconocida' && propositosPorEspecie[formData.especie as Especie]
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
          value={formData.especieSeleccionada || ''}
          options={[...Object.keys(especiesRazasMap), 'Otro']}
          onChange={(value) => handleChange('especieSeleccionada', value)}
        />
        {formData.especieSeleccionada === 'Otro' && (
          <CustomInput
            label="Especie Personalizada"
            value={formData.customEspecie || ''}
            onChangeText={(value) => handleChange('customEspecie', value)}
            placeholder="Escribe la especie"
          />
        )}

        <CustomSelect
          required
          label="Raza"
          value={formData.razaSeleccionada || ''}
          options={[...razasDisponibles, 'Otro']}
          onChange={(value) => handleChange('razaSeleccionada', value)}
        />
        {formData.razaSeleccionada === 'Otro' && (
          <CustomInput
            label="Raza Personalizada"
            value={formData.customRaza || ''}
            onChangeText={(value) => handleChange('customRaza', value)}
            placeholder="Escribe la raza"
          />
        )}

        <CustomSelect
        required
          label="Propósito"
          value={formData.proposito || ''}
          options={[...propositosDisponibles, 'Otro']}
          onChange={(value) => handleChange('proposito', value)}
        />
        {formData.proposito === 'Otro' && (
          <CustomInput
            required
            label="Propósito Personalizado"
            value={formData.customProposito || ''}
            onChangeText={(value) => handleChange('customProposito', value)}
            placeholder="Escribe el propósito"
          />
        )}

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
            if (!formData.nombre || !formData.especieSeleccionada || !formData.razaSeleccionada || !formData.peso || !formData.color || !formData.ubicacion) {
              Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
              return;
            }


            console.log('Animal data:', formData);
            Alert.alert('Formulario enviado', JSON.stringify(formData, null, 2));
          }}
        />
        <Separator height={400} />
      </ScrollView>
    </GlobalContainer>
  );
};

export default New;