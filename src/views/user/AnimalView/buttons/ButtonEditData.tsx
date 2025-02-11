import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRef, useState, useCallback, useMemo } from 'react';
import { newColors } from '../../../../assets/styles/colors';
import { CustomIcon, CustomInput, CustomSelect, CustomImage, CustomButton } from '../../../../components/Customs';
import { Animal, propositosPorEspecie } from '../../../../lib/interfaces/animal';
import { Modalize } from 'react-native-modalize';
import { pickImageFromGallery, takePhoto } from '../../../../utils/imagePickerUtils';
import Separator from '../../../../components/global/Separator';
import { updateAnimal } from '../../../../lib/db/animals/updateDataAnimal';
import { EditDataEstyles } from './styles/EditDataStyles';
import { setDataRegister } from '../../../../lib/db/registers/setDataRegister';

interface ButtonEditDataProps {
    id: string;
    animal: Animal;
    onPress: () => void;
}

const ButtonEditData = ({id,  onPress, animal }: ButtonEditDataProps) => {
    const modalRef = useRef<Modalize>(null);
    const styles = EditDataEstyles;
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [valueLabel, setValueLabel] = useState<string>("");
    const [propositoValue, setPropositoValue] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const options = useMemo(() => ['Nombre', 'Descripción', 'Peso', 'Proposito', 'Ubicacion', 'Imagen Principal', 'Imagen Secundaria', 'Imagen Extra'], []);

    const openModal = useCallback(() => {
        modalRef.current?.open();
    }, []);

    const handleSelectChange = useCallback((text: string) => {
        setSelectedValue(text);

        if (text.includes('Imagen')) {
            const imageMap = {
                'Imagen Principal': animal.image,
                'Imagen Secundaria': animal.image2,
                'Imagen Extra': animal.image3
            };
            setImage(imageMap[text as keyof typeof imageMap] || null);
            setValueLabel('');
        } else if (text === 'Proposito') {
            setValueLabel(animal.proposito || '');
            setPropositoValue(animal.proposito || '');
        } else {
            setImage(null);
            const newValue = animal[text.toLowerCase() as keyof Animal];
            setValueLabel(typeof newValue === "boolean" ? (newValue ? "Sí" : "No") : String(newValue || ""));
        }
    }, [animal]);

    const handlePickImage = useCallback(() => pickImageFromGallery(setImage), []);
    const handleTakePhoto = useCallback(() => takePhoto(setImage), []);

    const getUpdateData = useCallback(() => {
        const fieldMap: Record<string, keyof Animal> = {
            'Nombre': 'nombre',
            'Descripción': 'descripcion',
            'Peso': 'peso',
            'Proposito': 'proposito',
            'Ubicacion': 'ubicacion',
            'Imagen Principal': 'image',
            'Imagen Secundaria': 'image2',
            'Imagen Extra': 'image3'
        };

        const field = fieldMap[selectedValue];
        if (!field) return null;

        let value;
        if (selectedValue.includes('Imagen')) {
            value = image;
        } else if (selectedValue === 'Proposito') {
            value = propositoValue;
        } else {
            value = valueLabel;
        }

        return { field, value };
    }, [selectedValue, image, valueLabel, propositoValue]);

    const handleSave = useCallback(async () => {
        try {
            setIsLoading(true);
            const updateData = getUpdateData();
            
            if (!updateData) {
                console.error('No hay datos válidos para actualizar');
                return;
            }

            const { field, value } = updateData;
            
            if (value === null || value === undefined || value === '') {
                console.error('El valor no puede estar vacío');
                return;
            }

            await updateAnimal(id, { [field]: value});
            await setDataRegister({
                id: Math.random().toString(36).substr(2, 9),
                animalId: id,
                comentario: `Actualizado ${selectedValue} a ${value}`,
                accion: "Actualizar datos",
                fecha: new Date().toISOString()
            });

            modalRef.current?.close();
            if (onPress) onPress();
            
        } catch (error) {
            console.error('Error al guardar:', error);
        } finally {
            setIsLoading(false);
        }
    }, [id, getUpdateData, onPress]);

    const modalContent = useMemo(() => (
        <>
            <Text style={styles.title}>¿Qué datos deseas editar?</Text>

            <CustomSelect 
                label="Qué datos deseas actualizar"
                value={selectedValue}
                options={options}
                onValueChange={handleSelectChange}
            />

            {selectedValue.includes("Imagen") ? (
                <View style={styles.imageContainer}>
                    {image ? (
                        <CustomImage 
                            source={image} 
                            style={styles.image}
                        />
                    ) : (
                        <Text style={styles.noImageText}>No hay imagen disponible</Text>
                    )}

                    <View style={styles.imageButtonContainer}>
                        <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
                            <CustomIcon name="image-outline" size={40} color={newColors.verde} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageButton} onPress={handleTakePhoto}>
                            <CustomIcon name="camera-outline" size={40} color={newColors.verde} />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : selectedValue === 'Proposito' ? (
                <CustomSelect
                    label="Selecciona el propósito"
                    value={propositoValue}
                    options={propositosPorEspecie[animal.especie] || []}
                    onValueChange={setPropositoValue}
                />
            ) : (
                selectedValue && (
                    <CustomInput
                        label={`Actualiza el ${selectedValue}`}
                        placeholder={valueLabel} 
                        value={valueLabel}
                        onChangeText={setValueLabel}
                        multiline={selectedValue === 'Descripción'}
                    />
                )
            )}
            <View style={styles.modalActions}>
                <CustomButton 
                    text="Guardar" 
                    onPress={handleSave}
                    disabled={isLoading} 
                />
                <CustomButton 
                    text="Cancelar" 
                    onPress={() => modalRef.current?.close()} 
                    red 
                    disabled={isLoading}
                />       
            </View>
            <Separator />
        </>
    ), [selectedValue, image, valueLabel, propositoValue, handleSelectChange, handlePickImage, handleTakePhoto, options, animal.especie]);

    return (
        <>
            <Pressable style={styles.button} onPress={openModal}>
                <CustomIcon name="create-outline" size={30} color={newColors.fondo_principal} />
            </Pressable>

            <Modalize 
                ref={modalRef}
                adjustToContentHeight
                modalStyle={styles.modal}
                scrollViewProps={{ 
                    keyboardShouldPersistTaps: "handled",
                    removeClippedSubviews: true
                }}
                withHandle={true}
            >
                {modalContent}


            </Modalize>
        </>
    );
}



export default ButtonEditData;