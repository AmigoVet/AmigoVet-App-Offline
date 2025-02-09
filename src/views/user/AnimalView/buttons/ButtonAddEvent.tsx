import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import DatePicker from 'react-native-date-picker';
import { Events } from '../../../../lib/interfaces/events';
import { newColors } from '../../../../assets/styles/colors';
import { CustomIcon, CustomInput } from '../../../../components/Customs';
import { createDataEvent } from '../../../../lib/db/events/createDataEvent';

interface Props {
    animalId: string;
    animalName: string;
    onPress: () => void;
}

const ButtonAddEvent = ({ animalId, animalName, onPress }: Props) => {
    // Estado para los datos del evento
    const [eventData, setEventData] = useState<Events>({
        id: Math.random().toString(36), 
        animalId: animalId,
        animalName: animalName,
        comentario: '',
        fecha: new Date().toISOString().split('T')[0], 
        created_at: new Date().toISOString(),
    });

    const modalRef = useRef<Modalize>(null);

    const openModal = () => {
        modalRef.current?.open();
    };

    const handleDateChange = (selectedDate: Date) => {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setEventData({ ...eventData, fecha: formattedDate });
        console.log('Fecha seleccionada:', formattedDate);
    };

    const handleCommentChange = (text: string) => {
        setEventData({ ...eventData, comentario: text });
    };

    const handleAddEvent = async () => {
        if (!eventData.comentario.trim()) {
            Alert.alert('Error', 'Por favor, ingresa un comentario para el evento.');
            return;
        }

        try {
            await createDataEvent(eventData);
            console.log('Evento guardado correctamente:', eventData);
            modalRef.current?.close(); 
        } catch (error) {
            console.error('Error al guardar el evento:', error);
        }
    };

    onPress();

    return (
        <>
        {/* Botón flotante para abrir el modal */}
        <Pressable style={styles.btn} onPress={openModal}>
            <CustomIcon name="calendar-outline" size={24} color={newColors.fondo_principal} />
        </Pressable>

        {/* Modal con contenido */}
        <Modalize ref={modalRef} modalHeight={600} modalStyle={styles.modal}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Rellena los datos del evento</Text>
                
                <CustomInput 
                    label="Comentario"
                    placeholder="Descripción del evento"
                    value={eventData.comentario}
                    onChangeText={handleCommentChange}
                />

                <View style={styles.datePickerContainer}>
                    <DatePicker
                        mode="date"
                        date={new Date(eventData.fecha)}
                        onDateChange={handleDateChange}
                        theme="light"
                    />
                </View>

                <View style={styles.modalActions}>
                    <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={() => modalRef.current?.close()}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </Pressable>
                    <Pressable style={[styles.modalButton, styles.addButton]} onPress={handleAddEvent}>
                        <Text style={[styles.buttonText]}>Agregar</Text>
                    </Pressable>
                </View>
            </View>
        </Modalize>
        </>
    );
};

export default ButtonAddEvent;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: newColors.verde,
    position: 'absolute',
    zIndex: 10,
    bottom: 200,
    right: 20,
    borderRadius: 50,
    padding: 10,
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: newColors.fondo_principal,
    padding: 20,
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: newColors.fondo_secundario,
    textAlign: 'center',
  },
  datePickerContainer: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: newColors.rojo,
  },
  addButton: {
    backgroundColor: newColors.verde_light,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: newColors.fondo_principal,
  },
});
