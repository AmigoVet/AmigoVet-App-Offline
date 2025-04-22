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
import ModalSelectOptions from '../../../components/ModalSelectOptions';

const New = () => {
  const [image, setImage] = useState<string | null>(null);
  const [nombre, setNombre] = useState<string>('');
  const [identificador, setIdentificador] = useState<string>('');
  const [especie, setEspecie] = useState<Especie | 'Otro' | ''>('');
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalOptions, setModalOptions] = useState<string[]>([]);
  const [modalOnSelect, setModalOnSelect] = useState<(value: string) => void>(() => {});

  const razasDisponibles = especie && especie !== 'Otro' ? especiesRazasMap[especie] : [];
  const propositosDisponibles = especie && especie !== 'Otro' ? propositosPorEspecie[especie] : [];

  const openModal = (options: string[], onSelect: (value: string) => void) => {
    setModalOptions(options);
    setModalOnSelect(() => onSelect);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        scrollEnabled={!isModalOpen}
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
          onOpenModal={(options) => openModal(options, (value) => {
            setEspecie(value as Especie | 'Otro');
            setCustomEspecie('');
            setRaza('');
            setProposito('Otro');
          })}
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
          onOpenModal={(options) => openModal(options, setRaza)}
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
          onOpenModal={(options) => openModal(options, setProposito)}
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
          onOpenModal={(options) => openModal(options, setGenero)}
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

      <ModalSelectOptions
        isOpen={isModalOpen}
        options={modalOptions}
        onSelect={modalOnSelect}
        onClose={closeModal}
      />
    </GlobalContainer>
  );
};

export default New;