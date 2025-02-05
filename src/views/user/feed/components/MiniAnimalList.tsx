import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getLastFiveAnimals } from '../../../../lib/db/getDataAnimal';
import { newColors } from '../../../../assets/styles/colors';
import { constants } from '../../../../assets/styles/constants';
import ArcoArribaCentro from '../../../../assets/svgs/components/ArcoArribaCentro';
import ArcoArribaDerecha from '../../../../assets/svgs/components/ArcoArribaDerecha';
import ArcoArribaIzquierda from '../../../../assets/svgs/components/ArcoArribaIzquierda';

interface MiniAnimalListProps {
  userId: string;
}

const MiniAnimalList = ({ userId }: MiniAnimalListProps) => {
    const [animals, setAnimals] = useState<{ nombre: string, especie: string, image: string }[]>([]);

    useEffect(() => {
        const loadAnimals = async () => {
            const data = await getLastFiveAnimals(userId);
            setAnimals(data);
        };
        loadAnimals();
    }, []);

    return (
        <View style={{ marginTop: 0 }}>
            <FlatList
                data={animals}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.animalContainer}>
                        {/* Imagen del animal */}
                        <Image 
                            source={{ uri: item.image }} 
                            style={styles.circle} 
                        />

                        {/* SVG encima de la imagen */}
                        <View style={styles.overlay}>
                            {index === 0 ? (
                                <ArcoArribaIzquierda width={90} height={50} />
                            ) : index === animals.length - 1 ? (
                                <ArcoArribaDerecha width={90} height={50} />
                            ) : (
                                <ArcoArribaCentro width={90} height={50} />
                            )}
                        </View>

                        {/* Texto debajo */}
                        <Text style={styles.text}>{item.nombre}</Text>
                        <Text style={styles.text2}>{item.especie}</Text>
                    </View>
                )}
            />
        </View>
    );
}

export default MiniAnimalList;

const styles = StyleSheet.create({
    animalContainer: {
        alignItems: 'center',
        marginHorizontal: 7,
        position: 'relative',
        marginTop: 9, 
    },
    circle: {
        width: 75, 
        height: 75, 
        borderRadius: 55, 
        borderWidth: 3,
        borderColor: newColors.fondo_secundario
    },
    overlay: {
        position: 'absolute',
        top: -25,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: newColors.fondo_secundario,
        marginTop: 3,
    },
    text2: {
        marginTop: 3,
        fontSize: 12,
        fontWeight: 'bold',
        color: newColors.fondo_principal,
        backgroundColor: newColors.fondo_secundario,
        paddingHorizontal: 20,
        paddingVertical: 2,
        borderRadius: constants.borderRadius,
    }
});