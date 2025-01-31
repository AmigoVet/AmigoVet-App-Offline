import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getLastFiveAnimals } from '../../../../lib/db/getDataAnimal';
import { newColors } from '../../../../assets/styles/colors';
import { constants } from '../../../../assets/styles/constants';

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
        <View style={{ marginTop: 10 }}>
            <FlatList
                data={animals}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                        <Image 
                            source={{ uri: item.image }} 
                            style={styles.circle} 
                        />
                        <Text style={[styles.text]}>{item.nombre}</Text>
                        <Text style={[styles.text2]}>{item.especie}</Text>
                    </View>
                )}
            />
        </View>
    );
}

export default MiniAnimalList;

const styles = StyleSheet.create({
    circle:{
        width: 85, 
        height: 85, 
        borderRadius: 55, 
        borderWidth: 3,
        borderColor: newColors.fondo_secundario
    },
    text:{
        fontSize: 14,
        fontWeight: 'bold',
        color: newColors.fondo_secundario,
        marginTop: 3,
    },
    text2:{
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
