import React, { useState } from 'react';
import { Alert } from 'react-native';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import CustomImagePicker from '../../../components/customs/CustomImagePicker';
import { Especie, especiesRazasMap, generos, propositosPorEspecie } from '../../../../lib/interfaces/Animal';
import CustomSelect from '../../../components/customs/CustomSelect';
import CustomButton from '../../../components/customs/CustomButton';
import Separator from '../../../components/Separator';
import CustomDatePicker from '../../../components/customs/CustomDatePicker';
import { calculateOld } from '../../../../lib/functions/CalculateOld';
import CustomInput from '../../../components/customs/CustomImput';

const New = () => {
  const [image, setImage] = useState<string | null>(null);
  const [nombre, setNombre] = useState<string>('');
  const [identificador, setIdentificador] = useState<string>('');
  const [especie, setEspecie] = useState<string>(''); // Simplified type
  const [customEspecie, setCustomEspecie] = useState<string>('');
  const [raza, setRaza] = useState<string>('');
  const [customRaza, setCustomRaza] = useState<string>('');
  const [genero, setGenero] = useState<string>('');
  const [peso, setPeso] = useState<string>('');
  const [edad, setEdad] = useState<string>('');
  const [fechaNacimiento, setFechaNacimiento] = useState<Date | null>(null);
  const [color, setColor] = useState<string>('');
  const [proposito, setProposito] = useState<string>('Otro');
  const [customProposito, setCustomProposito] = useState<string>('');
  const [ubicacion, setUbicacion] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');

  // Ensure razasDisponibles and propositosDisponibles are always arrays
  const razasDisponibles =
    especie && especie !== 'Otro' && especiesRazasMap[especie as Especie]
      ? especiesRazasMap[especie as Especie]
      : [];
  const propositosDisponibles =
    especie && especie !== 'Otro' && propositosPorEspecie[especie as Especie]
      ? propositosPorEspecie[especie as Especie]
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
        <CustomImagePicker onImageSelected={(uri) => setImage(uri)} />

        <CustomInput
          required
          label="Nombre"
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre del animal"
        />

        <CustomInput
          label="Identificador"
          value={identificador}
          onChangeText={setIdentificador}
          placeholder="Identificador único"
        />

        <CustomSelect
          required
          label="Especie"
          value={especie}
          options={[...Object.keys(especiesRazasMap), 'Otro']}
          onChange={(value) => {
            console.log('Especie selected:', value); // Debug
            setEspecie(value);
            setCustomEspecie('');
            setRaza('');
            setProposito('Otro');
          }}
        />
        {especie === 'Otro' && (
          <CustomInput
            label="Especie Personalizada"
            value={customEspecie}
            onChangeText={setCustomEspecie}
            placeholder="Escribe la especie"
          />
        )}

        <CustomSelect
          required
          label="Raza"
          value={raza}
          options={[...razasDisponibles, 'Otro']}
          onChange={(value) => {
            console.log('Raza selected:', value); // Debug
            setRaza(value);
          }}
        />
        {raza === 'Otro' && (
          <CustomInput
            label="Raza Personalizada"
            value={customRaza}
            onChangeText={setCustomRaza}
            placeholder="Escribe la raza"
          />
        )}

        <CustomSelect
          label="Propósito"
          value={proposito}
          options={[...propositosDisponibles, 'Otro']}
          onChange={(value) => {
            console.log('Propósito selected:', value); // Debug
            setProposito(value);
          }}
        />
        {proposito === 'Otro' && (
          <CustomInput
            label="Propósito Personalizado"
            value={customProposito}
            onChangeText={setCustomProposito}
            placeholder="Escribe el propósito"
          />
        )}

        <CustomSelect
          label="Género"
          value={genero}
          options={generos}
          onChange={(value) => {
            console.log('Género selected:', value); // Debug
            setGenero(value);
          }}
        />

        <CustomDatePicker
          label="Fecha de Nacimiento"
          value={fechaNacimiento}
          onDateChange={(date) => {
            setFechaNacimiento(date);
            if (date) {
              setEdad(calculateOld(date));
            }
          }}
          onAgeChange={(age) => {
            setEdad(age);
            setFechaNacimiento(null);
          }}
          onBirthDateCalculated={(birthDate) => {
            setFechaNacimiento(birthDate);
          }}
          ageValue={edad}
        />

        <CustomInput
          required
          label="Peso"
          value={peso}
          onChangeText={setPeso}
          placeholder="Peso en kg"
          type="number"
        />
        <CustomInput
          required
          label="Color"
          value={color}
          onChangeText={setColor}
          placeholder="Color del animal"
        />
        <CustomInput
          required
          label="Ubicación"
          value={ubicacion}
          onChangeText={setUbicacion}
          placeholder="Ubicación del animal"
        />
        <CustomInput
          label="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Descripción adicional"
          multiline
        />

        <CustomButton text="Guardar" onPress={() => Alert.alert('IDK')} />
        <Separator height={200} />
      </ScrollView>
    </GlobalContainer>
  );
};

export default New;