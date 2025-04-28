import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { Register } from '../../../../../lib/interfaces/Register';
import { Events } from '../../../../../lib/interfaces/Events';
import { newColors } from '../../../../styles/colors';
import { styleSections } from './styles';
import MiniButton from '../../../../components/MiniButton';
import { Modalize } from 'react-native-modalize';
import CustomButton from '../../../../components/customs/CustomButton';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import Separator from '../../../../components/Separator';
import { v4 as uuidv4 } from 'uuid';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import CustomSelect from '../../../../components/customs/CustomSelect';
import { calculatePartoDate } from '../../../../../lib/functions/calculatePartoDate';
import { calculateCycleDates } from '../../../../../lib/functions/calculateCycleDates';
import CustomInput from '../../../../components/customs/CustomImput';

interface RegistersProps {
  registers: Register[];
  animalId: string;
  animalName: string;
  genero: 'Macho' | 'Hembra';
  embarazada: boolean;
}

const RegisterSection = ({ registers: initialRegisters, animalId, animalName, genero, embarazada }: RegistersProps) => {
  const modalizeRef = useRef<Modalize>(null);
  const [comentario, setComentario] = useState('');
  const [accion, setAccion] = useState<string>('');
  const [frecuencia, setFrecuencia] = useState<string>('1'); // Días entre ciclos
  const [repeticiones, setRepeticiones] = useState<string>('1'); // Número de ciclos
  const [editingRegister, setEditingRegister] = useState<Register | null>(null);
  const { addRegister, updateRegister, deleteRegister, updateAnimalPregnancy, addEvent, deleteEvent, animals } = useAnimalStore();

  // Obtener los registros del animal desde el store
  const animalRegisters = animals.find((animal) => animal.id === animalId)?.registers || initialRegisters;

  // Opciones de acción según género y estado de embarazo
  const acciones = genero === 'Hembra'
    ? embarazada
      ? ['Aborto', 'Tratamiento']
      : ['Embarazo', 'Inseminación', 'Tratamiento']
    : ['Tratamiento'];

  const openModal = (register?: Register) => {
    if (register) {
      setEditingRegister(register);
      setComentario(register.comentario);
      setAccion(register.accion);
      setFrecuencia('1');
      setRepeticiones('1');
    } else {
      setEditingRegister(null);
      setComentario('');
      setAccion(acciones.length > 0 ? acciones[0] : '');
      setFrecuencia('1');
      setRepeticiones('1');
    }
    modalizeRef.current?.open();
  };

  const closeModal = () => {
    modalizeRef.current?.close();
    setComentario('');
    setAccion('');
    setFrecuencia('1');
    setRepeticiones('1');
    setEditingRegister(null);
  };

  const handleSaveRegister = async () => {
    if (!comentario.trim()) {
      Alert.alert('Error', 'El comentario no puede estar vacío.');
      return;
    }
    if (!accion) {
      Alert.alert('Error', 'Por favor, selecciona una acción.');
      return;
    }
    if (accion === 'Tratamiento') {
      const freq = parseInt(frecuencia);
      const reps = parseInt(repeticiones);
      if (isNaN(freq) || freq < 1) {
        Alert.alert('Error', 'La frecuencia debe ser un número mayor a 0.');
        return;
      }
      if (isNaN(reps) || reps < 1) {
        Alert.alert('Error', 'El número de repeticiones debe ser mayor a 0.');
        return;
      }
    }
    if (!animalId || !animalName) {
      Alert.alert('Error', 'Faltan datos del animal (ID o nombre).');
      return;
    }

    const registerDate = new Date();
    const registerData: Register = {
      id: editingRegister ? editingRegister.id : uuidv4(),
      animalId,
      comentario: comentario.trim(),
      accion,
      fecha: registerDate.toISOString().split('T')[0],
    };

    try {
      if (editingRegister) {
        await updateRegister(registerData);
        Alert.alert('Éxito', 'Registro actualizado correctamente.');
      } else {
        await addRegister(registerData);
        if (accion === 'Embarazo' || accion === 'Inseminación') {
          // Crear evento de parto
          const partoDate = calculatePartoDate(registerDate);
          const partoEvent: Events = {
            id: uuidv4(),
            animalId,
            animalName,
            comentario: `Parto estimado (${accion})`,
            fecha: partoDate.toISOString().split('T')[0],
            created_at: new Date().toISOString(),
          };
          await addEvent(partoEvent);
          await updateAnimalPregnancy(animalId, true);
        } else if (accion === 'Aborto') {
          // Eliminar evento de parto y actualizar estado de embarazo
          const events = animals.find((animal) => animal.id === animalId)?.events || [];
          const partoEvent = events.find((event) => event.comentario.includes('Parto estimado'));
          if (partoEvent) {
            await deleteEvent(partoEvent.id);
          }
          await updateAnimalPregnancy(animalId, false);
        } else if (accion === 'Tratamiento') {
          // Crear eventos para ciclos de tratamiento
          const freq = parseInt(frecuencia);
          const reps = parseInt(repeticiones);
          const cycleDates = calculateCycleDates(registerDate, freq, reps);
          for (let i = 0; i < cycleDates.length; i++) {
            const cycleEvent: Events = {
              id: uuidv4(),
              animalId,
              animalName,
              comentario: `${comentario} (Ciclo ${i + 1})`,
              fecha: cycleDates[i].toISOString().split('T')[0],
              created_at: new Date().toISOString(),
            };
            await addEvent(cycleEvent);
          }
        }
        Alert.alert('Éxito', 'Registro creado correctamente.');
      }
      closeModal();
    } catch (error: any) {
      Alert.alert('Error', `No se pudo guardar el registro: ${error.message || 'Error desconocido'}`);
      console.error('Error al guardar registro:', error);
    }
  };

  const handleDeleteRegister = (registerId: string) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteRegister(registerId);
              Alert.alert('Éxito', 'Registro eliminado correctamente.');
            } catch (error: any) {
              Alert.alert('Error', `No se pudo eliminar el registro: ${error.message || 'Error desconocido'}`);
              console.error('Error al eliminar registro:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <>
      <View style={styleSections.container}>
        <View style={styleSections.header}>
          <Text style={styleSections.title}>Registros</Text>
          <MiniButton text="Agregar" icon="add-outline" onPress={() => openModal()} />
        </View>
        {animalRegisters.length === 0 ? (
          <Text style={styleSections.noDataText}>No hay registros</Text>
        ) : (
          animalRegisters.map((register) => (
            <View key={register.id} style={styleSections.itemContainer}>
              <TouchableOpacity style={styles.itemContainer} onPress={() => openModal(register)}>
                <Text style={styles.itemText}>{register.comentario} ({register.accion})</Text>
                <Text style={styles.itemDate}>
                  {new Date(register.fecha).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </Text>
              </TouchableOpacity>
              <MiniButton
                text=""
                icon="trash-outline"
                bg={newColors.rojo}
                color={newColors.fondo_principal}
                onPress={() => handleDeleteRegister(register.id)}
              />
            </View>
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
            {editingRegister ? 'Editar Registro' : 'Agregar Registro'}
          </Text>
          <MiniButton
            text="Cerrar"
            icon="close-outline"
            bg={newColors.rojo}
            onPress={closeModal}
            color={newColors.fondo_principal}
          />
        </View>
        <View style={{ padding: 20 }}>
          <CustomSelect
            label="Acción"
            value={accion}
            options={acciones}
            onChange={setAccion}
            required
          />
          <CustomInput
            value={comentario}
            onChangeText={setComentario}
            label="Comentario"
            placeholder="Escribe un comentario sobre el registro"
            multiline
            required
          />
          {accion === 'Tratamiento' && (
            <>
              <CustomInput
                value={frecuencia}
                onChangeText={setFrecuencia}
                label="Frecuencia (días)"
                placeholder="Cada cuántos días"
                keyboardType="numeric"
                required
              />
              <CustomInput
                value={repeticiones}
                onChangeText={setRepeticiones}
                label="Repeticiones"
                placeholder="Número de ciclos"
                keyboardType="numeric"
                required
              />
            </>
          )}
          <Separator height={20} />
          <CustomButton text={editingRegister ? 'Actualizar' : 'Guardar'} onPress={handleSaveRegister} />
        </View>
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 10,
  },
  itemText: {
    fontSize: 14,
    color: newColors.fondo_secundario,
  },
  itemDate: {
    fontSize: 12,
    color: newColors.fondo_secundario,
    marginTop: 5,
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default RegisterSection;