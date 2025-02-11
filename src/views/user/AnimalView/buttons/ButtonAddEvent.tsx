import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import DatePicker from 'react-native-date-picker';
import { Events } from '../../../../lib/interfaces/events';
import { newColors } from '../../../../assets/styles/colors';
import { CustomIcon, CustomInput } from '../../../../components/Customs';
import { createDataEvent } from '../../../../lib/db/events/createDataEvent';
import { addEventStyles } from './styles/AddEventStyles';
import Separator from '../../../../components/global/Separator';

interface Props {
    animalId: string;
    animalName: string;
    onPress: () => void;
}

const ButtonAddEvent = ({ animalId, animalName, onPress }: Props) => {
  const styles = addEventStyles;
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
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setEventData(prev => ({ ...prev, fecha: formattedDate }));
  };

    const handleCommentChange = (text: string) => {
      setEventData(prev => ({ ...prev, comentario: text }));
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
        <Modalize 
          ref={modalRef} 
          modalStyle={styles.modal}
          adjustToContentHeight
          scrollViewProps={{ 
            keyboardShouldPersistTaps: "handled",
            removeClippedSubviews: true
        }}
        >
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
                <Separator />
            </View>
        </Modalize>
        </>
    );
};

export default ButtonAddEvent;

