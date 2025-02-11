import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { newColors } from '../../../../assets/styles/colors';
import { CustomButton, CustomIcon, CustomInput, CustomSelect } from '../../../../components/Customs';
import { Animal } from '../../../../lib/interfaces/animal';
import { Modalize } from 'react-native-modalize';
import { createGlobalStyles } from '../../../../assets/styles/styles';
import { setDataRegister } from '../../../../lib/db/registers/setDataRegister';
import { updateAnimal } from '../../../../lib/db/animals/updateDataAnimal';
import { setDataNotas } from '../../../../lib/db/notas/setDataNotas';
import { getDataNotaByText } from '../../../../lib/db/notas/getDataNotaByText';
import { formatearFecha } from '../../../../lib/functions/FormateraFecha';
import { createDataEvent } from '../../../../lib/db/events/createDataEvent';
import { calcularFechaParto } from '../../../../lib/functions/CalcularFechaParto';
import { deleteDataEvent } from '../../../../lib/db/events/deleteDataEvent';

interface ButtonAddRegisterProps {
  animalId: string;
    animal: Animal;
    onPress: () => void;
}

const ButtonAddRegister = ({ animalId, onPress, animal }: ButtonAddRegisterProps) => {
    console.log(animalId)
    const styles = dynamicStyles();
    const globalStyles = createGlobalStyles()
    const modalRef = useRef<Modalize>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [comentario, setComentario] = useState<string>("");

    const openModal = () => {
        setIsOpen(true);
        modalRef.current?.open();
    };

    const closeModal = () => {
        setIsOpen(false);
        modalRef.current?.close();
    };

    // Definir opciones con un valor interno y una etiqueta visible
    const options = [
        { label: "Registrar tratamiento", value: "tratamiento" },
    ];

    if (animal.genero === "Hembra") {
      if (!animal.embarazada) {
          options.push(
              { label: "Registrar preñez", value: "preñez" },
              { label: "Registrar inseminación", value: "inseminacion" }
          );
      }
      
      if (animal.embarazada) {
          options.push({ label: "Registrar aborto", value: "aborto" });
      }
    }
  

    const handleSave = async () => {
        await setDataRegister({
            id: Math.random().toString(36).substr(2, 9),
            animalId: animalId,
            comentario: comentario,
            accion: 'Registro ' + selectedValue,
            fecha: new Date().toISOString()
        });

        if(selectedValue === 'inseminacion' || selectedValue === 'preñez') {
          await updateAnimal(animalId, { embarazada: true });
          await setDataNotas({
            id: Math.random().toString(36).substr(2, 9),
            animalId: animalId,
            nota: "Hubo una Preñez el" + formatearFecha(new Date().toISOString()) + ": " + comentario,
            fecha: new Date().toISOString(),
            created_at: new Date().toISOString()
          })
          await createDataEvent({
            id: Math.random().toString(36).substr(2, 9),
            animalId: animalId,
            animalName: animal.nombre,
            comentario: "Posible fecha de parto",
            fecha: calcularFechaParto(animal.especie, new Date()),
            created_at: new Date().toISOString(),
          })
        }
        else if(selectedValue === 'aborto') {
          await updateAnimal(animalId, { embarazada: false });
          await setDataNotas({
            id: Math.random().toString(36).substr(2, 9),
            animalId: animalId,
            nota: "Hubo un Aborto el " + formatearFecha(new Date().toISOString()) + ": " + comentario,
            fecha: new Date().toISOString(),
            created_at: new Date().toISOString()
          })
          await deleteDataEvent("Posible fecha de parto");
        }
        else if(selectedValue === 'tratamiento') {
          await setDataNotas({
            id: Math.random().toString(36).substr(2, 9),
            animalId: animalId,
            nota: "Hubo un Tratamiento el " + formatearFecha(new Date().toISOString()) + ": " + comentario,
            fecha: new Date().toISOString(),
            created_at: new Date().toISOString()
          })
        }


        closeModal();
    }

    return (
        <>
            <Pressable style={styles.button} onPress={openModal}>
                <CustomIcon name="book-outline" size={30} color={newColors.fondo_principal} />
            </Pressable>

            <Modalize
                ref={modalRef}
                threshold={600}
                adjustToContentHeight
                handlePosition="outside"
                modalStyle={styles.modalContent}
            >
                {isOpen && (
                    <View>
                        <Text style={globalStyles.titleModal}>Registrar evento</Text>
                        <CustomSelect 
                            label="Elige una opción"
                            value={selectedValue}
                            options={options.map(option => option.label)} 
                            onValueChange={(label) => {
                                const selectedOption = options.find(option => option.label === label);
                                setSelectedValue(selectedOption ? selectedOption.value : "");
                            }}
                        />
                        <CustomInput 
                            label="Comentario"
                            placeholder="Escribe los detalles"
                            value={comentario}
                            onChangeText={(value) => setComentario(value)}
                        />
                        <View style={{alignItems: 'center'}}>
                          <CustomButton text="Guardar" onPress={handleSave} />
                          <CustomButton text="Cancelar" onPress={closeModal} red />
                        </View>
                    </View>
                )}
            </Modalize>
        </>
    )
}

const dynamicStyles = () =>
    StyleSheet.create({
        button: {
            backgroundColor: newColors.verde,
            position: 'absolute',
            zIndex: 10,
            bottom: 80,
            right: 20,
            borderRadius: 50,
            padding: 10,
            height: 50,
            width: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            padding: 20,
            backgroundColor: newColors.fondo_principal,
        },
    });

export default ButtonAddRegister;
