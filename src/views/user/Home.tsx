// **Librerías externas**
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import RNFS from 'react-native-fs';
import { SwipeListView } from 'react-native-swipe-list-view';

// **Contexto y estilos**
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors } from '../../assets/styles/colors';
import { createGlobalStyles } from '../../assets/styles/styles';

// **Interfaces y tipos**
import { Animal } from '../../lib/interfaces/animal';

// **Funciones utilitarias**
import { deleteAnimalById, getRegisteredAnimalsCount, loadData } from '../../lib/utils/asyncStorage';

// **Hooks **
import useAuthStore from '../../lib/store/authStore';

// **Componentes locales**
import { AnimalCard } from '../../components/AnimalDataView';
import { getDataAnimal, getLenghtAnimal } from '../../lib/db/getDataAnimal';
import { createTables } from '../../lib/db/createTable';


const Home = () => {
    const user = useAuthStore((state) => state.user);
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const [refreshing, setRefreshing] = useState(false); 
    const modalRef = useRef<Modalize>(null);

    const { isDarkTheme } = useTheme();
    const colors = getDynamicColors(isDarkTheme);
    const GlobalStyles = createGlobalStyles(isDarkTheme);
    const styles = dymanycStyles(colors);

    const [totalAnimals, setTotalAnimals] = useState<number>(0);

    const loadAnimal = async () => {
        const animales = await getDataAnimal(String(user?.userId));
        const lenghtAnimals = await getLenghtAnimal(user!.userId)
        setTotalAnimals(lenghtAnimals);
        setAnimals(animales);
    };

    useEffect(() => {
        createTables();
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

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadAnimal();
        setRefreshing(false);
    };

    const renderItem = ({ item }: { item: Animal }) => (
        <View style={[styles.rowFront, { backgroundColor: colors.fondo }]}>
            <AnimalCard animal={item} />
        </View>
    );

    const renderHiddenItem = ({ item }: { item: Animal }) => (
        <View style={[styles.rowBack, { backgroundColor: colors.fondo }]}>
            <TouchableOpacity
                style={[styles.deleteButton, { backgroundColor: colors.rojo }]}
                onPress={() => openModal(item)}
            >
                <Text style={[styles.hiddenText, { color: 'white' }]}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <View style={[GlobalStyles.container, styles.container]}>
                {animals.length > 0 ? (
                    <SwipeListView
                        data={animals}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        keyExtractor={(item) => item.id}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        ListFooterComponent={
                            <Text style={{ textAlign: 'center', marginVertical: 20, color: colors.blanco, fontWeight: 'bold' }}>
                                Aun te quedan {30 - totalAnimals} animales para registrar.
                            </Text>
                        }
                    />
                ) : (
                    <Text style={[GlobalStyles.error, { color: colors.rojo }]}>
                        No hay animales registrados
                    </Text>
                )}
            </View>

            <Modalize
                ref={modalRef}
                modalHeight={200}
                modalStyle={{ backgroundColor: colors.fondo }}
            >
                <View style={styles.modalContent}>
                    <Text style={[styles.modalTitle, { color: colors.naranja }]}>
                        ¿Estás seguro de eliminar este animal?
                    </Text>
                    {selectedAnimal && (
                        <>
                        <Text style={[styles.modalId, { color: colors.blanco }]}>
                            ID del animal: {selectedAnimal.id}
                        </Text>
                         <Text style={[styles.modalId, { color: colors.blanco }]}>
                            Nombre del animal: {selectedAnimal.nombre}
                        </Text>
                        </>
                    )}
                    <View style={styles.modalActions}>
                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: colors.naranja }]}
                            onPress={() => modalRef.current?.close()}
                        >
                            <Text style={[styles.modalButtonText, { color: colors.blanco }]}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: colors.rojo }]}
                            onPress={deleteAnimal}
                        >
                            <Text style={[styles.modalButtonText, { color: "white" }]}>
                                Eliminar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
        </>
    );
};

const dymanycStyles = (colors: ReturnType<typeof getDynamicColors>) =>
    StyleSheet.create({
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
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
        borderRadius: 10,
    },
    hiddenText: {
        width: 58,
        fontWeight: 'bold',
    },
    // Modales
    modalContent: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalId: {
        fontSize: 16,
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
    modalButtonText: {
        fontWeight: 'bold',
    },
});

export default Home;
