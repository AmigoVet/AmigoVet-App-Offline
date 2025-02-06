import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { CustomIcon, CustomInput } from '../Customs';
import { newColors } from '../../assets/styles/colors';
import { Modalize } from 'react-native-modalize';
import DatePicker from 'react-native-date-picker';


interface Props {
    animalId: string;
    animalName: string;
}

const ButtonAddEvent = ({ animalId, animalName }: Props) => {
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [comentary, setComentary] = useState<string>('');
    const modalRef = useRef<Modalize>(null);

    const openModal = () => {
        modalRef.current?.open();
    };

    const handleDateChange = (selectedDate: Date) => {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(selectedDate.getDate()).padStart(2, '0');
    
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
    };
    

    const handleCreateEvent = (animalId: string, animalName: string, date: string, comentary: string) => {
        console.log(animalId, animalName, date, comentary);
    }

    return (
        <>
        <Pressable style={styles.btn} onPress={openModal}>
            <CustomIcon name="calendar-outline" size={24} color={newColors.fondo_principal} />
        </Pressable>

        <Modalize ref={modalRef} modalHeight={600} modalStyle={styles.modal}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Rellena los datos del evento</Text>
                <CustomInput 
                    label="Nombre del evento"
                    placeholder="Nombre del evento"
                    value={comentary}
                    onChangeText={(text) => setComentary(text)}
                />

                <View style={styles.datePickerContainer}>
                    <DatePicker
                        mode="date"
                        date={new Date(date)}
                        onDateChange={handleDateChange}
                        theme="light"
                    />
                </View>

                <View style={styles.modalActions}>
                    <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={() => modalRef.current?.close()}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </Pressable>
                    <Pressable style={[styles.modalButton, styles.addButton]} onPress={() => handleCreateEvent(animalId, animalName, date, comentary)}>
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
    backgroundColor: newColors.verde_light,
    position: 'absolute',
    zIndex: 10,
    bottom: 140,
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
