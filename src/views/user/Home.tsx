import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import useAuthStore from '../../assets/store/authStore';
import { colors, GlobalStyles } from '../../assets/styles';
import Header from '../../assets/components/Header';
import { Animal } from '../../assets/interfaces/animal';
import { deleteAnimalById, loadData } from '../../assets/utils/asyncStorage';
import RNFS from 'react-native-fs';
import { SwipeListView } from 'react-native-swipe-list-view';
import { AnimalCard } from '../../assets/components';

const Home = () => {
    const user = useAuthStore((state) => state.user);
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const [refreshing, setRefreshing] = useState(false); 
    const modalRef = useRef<Modalize>(null);

    const loadAnimal = async () => {
        const animales = await loadData(String(user?.userId));

        const validatedAnimals = await Promise.all(
            animales.map(async (animal: Animal) => {
                if (animal.image) {
                    try {
                        const fileExists = await RNFS.exists(animal.image);
                        if (!fileExists) {
                            animal.image = '';
                        }
                    } catch (error) {
                        console.error(`Error verificando imagen para ${animal.nombre}:`, error);
                        animal.image = '';
                    }
                }
                return animal;
            })
        );

        setAnimals(validatedAnimals);
    };

    useEffect(() => {
        loadAnimal();
    }, []);

    const openModal = (animal: Animal) => {
        setSelectedAnimal(animal);
        modalRef.current?.open();
    };

    const deleteAnimal = async () => {
        if (selectedAnimal) {
            await deleteAnimalById(selectedAnimal.id);
            loadAnimal();
            modalRef.current?.close();
        }
    };

    // Función para manejar la recarga
    const handleRefresh = async () => {
        setRefreshing(true); 
        await loadAnimal(); 
        setRefreshing(false);
    };

    const renderItem = ({ item }: { item: Animal }) => (
        <View style={styles.rowFront}>
            <AnimalCard animal={item} />
        </View>
    );

    const renderHiddenItem = ({ item }: { item: Animal }) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => openModal(item)}
            >
                <Text style={styles.hiddenText}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <Header />
            <View style={[GlobalStyles.container, styles.container]}>
                {animals.length > 0 ? (
                    <SwipeListView
                        data={animals}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        keyExtractor={(item) => item.id}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        refreshing={refreshing} // Indicador de recarga
                        onRefresh={handleRefresh} // Función de recarga
                    />
                ) : (
                    <Text style={GlobalStyles.error}>No hay animales registrados</Text>
                )}
            </View>

            <Modalize
                ref={modalRef}
                modalHeight={200}
                modalStyle={{ backgroundColor: colors.fondo }}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        ¿Estás seguro de eliminar este animal?
                    </Text>
                    {selectedAnimal && (
                        <Text style={styles.modalId}>
                            ID del animal: {selectedAnimal.id}
                        </Text>
                    )}
                    <View style={styles.modalActions}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={() => modalRef.current?.close()}
                        >
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.deleteButtonModal]}
                            onPress={deleteAnimal}
                        >
                            <Text style={styles.modalButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    rowFront: {
        flex: 1,
    },
    rowBack: {
        paddingTop: 20,
        paddingBottom: 5,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderRadius: 10,
        marginVertical: 5,
    },
    deleteButton: {
        backgroundColor: colors.rojo,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
        borderRadius: 10,
    },
    hiddenText: {
        width: 58,
        color: 'white',
        fontWeight: 'bold',
    },
    modalContent: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.naranja,
    },
    modalId: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 20,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        width: '40%',
        alignItems: 'center',
    },
    deleteButtonModal: {
        backgroundColor: colors.rojo,
    },
    cancelButton: {
        backgroundColor: colors.naranja,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Home;
