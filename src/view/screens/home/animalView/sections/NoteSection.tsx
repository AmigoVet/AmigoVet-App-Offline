import { View, Text, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { Notes } from '../../../../../lib/interfaces/Notes';
import { newColors } from '../../../../styles/colors';
import { styleSections } from './styles';
import MiniButton from '../../../../components/MiniButton';
import { Modalize } from 'react-native-modalize';
import CustomButton from '../../../../components/customs/CustomButton';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import { v4 as uuidv4 } from 'uuid';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import Separator from '../../../../components/Separator';
import CustomInput from '../../../../components/customs/CustomImput';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../../../navigator/navigationTypes';
import NoteSectionCard from '../cards/NoteSectionCard';

interface NotesProps {
  notes: Notes[];
  animalId: string;
  animalName: string; // Opcional, ya que no se usa en la interfaz Notes
}

const NoteSection = ({ notes: initialNotes, animalId, animalName }: NotesProps) => {
  const modalizeRef = useRef<Modalize>(null);
  const {navigate} = useNavigation<NavigationProp>();
  const [nota, setNota] = useState('');
  const [editingNote, setEditingNote] = useState<Notes | null>(null);
  const { addNote, updateNote, animals } = useAnimalStore();

  // Obtener las notas del animal desde el store
  const animalNotes = animals.find((animal) => animal.id === animalId)?.notes || initialNotes;

  const openModal = (note?: Notes) => {
    if (note) {
      setEditingNote(note);
      setNota(note.nota);
    } else {
      setEditingNote(null);
      setNota('');
    }
    modalizeRef.current?.open();
  };

  const closeModal = () => {
    modalizeRef.current?.close();
    setNota('');
    setEditingNote(null);
  };

  const handleSaveNote = async () => {
    if (!nota.trim()) {
      Alert.alert('Error', 'La nota no puede estar vacía.');
      return;
    }
    if (!animalId) {
      Alert.alert('Error', 'Falta el ID del animal.');
      return;
    }

    const noteData: Notes = {
      id: editingNote ? editingNote.id : uuidv4(),
      animalId,
      nota: nota.trim(),
      fecha: new Date().toISOString().split('T')[0], // Fecha actual
      created_at: new Date().toISOString(),
    };

    try {
      if (editingNote) {
        await updateNote(noteData);
        Alert.alert('Éxito', 'Nota actualizada correctamente.');
      } else {
        await addNote(noteData);
        Alert.alert('Éxito', 'Nota creada correctamente.');
      }
      closeModal();
    } catch (error: any) {
      Alert.alert('Error', `No se pudo guardar la nota: ${error.message || 'Error desconocido'}`);
      console.error('Error al guardar nota:', error);
    }
  };
  return (
    <>
      <View style={styleSections.container}>
        <View style={styleSections.header}>
          <Text style={styleSections.title}>Notas</Text>
          <View style={styleSections.buttonsContainer}>
          <MiniButton text="Agregar" icon="add-outline" onPress={() => openModal()} />
          <MiniButton text="Ver todos" icon="book-outline" onPress={() => navigate('AllNotes', {animalId, animalName})} />
          </View>

        </View>
        {animalNotes.length === 0 ? (
          <Text style={styleSections.noDataText}>No hay notas</Text>
        ) : (
          animalNotes.map((note) => (
            <NoteSectionCard note={note} />
          ))
        )}
      </View>

      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={GlobalStyles.modalContainer}
        handlePosition="outside"
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <View style={GlobalStyles.modalHeader}>
          <Text style={[styleSections.title, { color: newColors.fondo_secundario }]}>
            {editingNote ? 'Editar Nota' : 'Agregar Nota'}
          </Text>
          <MiniButton
            text="Cerrar"
            icon="close-outline"
            backgroundColor={newColors.rojo}
            onPress={closeModal}
            color={newColors.fondo_principal}
          />
        </View>
        <View style={GlobalStyles.padding20}>
          <CustomInput
            value={nota}
            onChangeText={setNota}
            label="Nota"
            placeholder="Escribe el contenido de la nota"
            multiline
          />
          <Separator height={20} />
          <CustomButton text={editingNote ? 'Actualizar' : 'Guardar'} onPress={handleSaveNote} />
        </View>
      </Modalize>
    </>
  );
};

export default NoteSection;
