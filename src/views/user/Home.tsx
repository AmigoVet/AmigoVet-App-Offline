import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useTheme } from '../../lib/context/ThemeContext';
import { getDynamicColors } from '../../assets/styles/colors';
import { createGlobalStyles } from '../../assets/styles/styles';
import { Animal, AnimalWithNotes } from '../../lib/interfaces/animal';
import useAuthStore from '../../lib/store/authStore';
import { getLenghtAnimal, getSimplificatedDataAnimalsWithNotes } from '../../lib/db/getDataAnimal';
import { createTables } from '../../lib/db/createTable';
import { deleteDataAnimal } from '../../lib/db/animals/deleteDataAnimal';
import PrivateAnimalCard from '../../components/AnimalCard/PrivateAnimalCard';

const Home = () => {
  const user = useAuthStore((state) => state.user);
  const [animals, setAnimals] = useState<AnimalWithNotes[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>({} as Animal);
  const [refreshing, setRefreshing] = useState(false);
  const modalRef = useRef<Modalize>(null);

  const { isDarkTheme } = useTheme();
  const colors = getDynamicColors(isDarkTheme);
  const GlobalStyles = createGlobalStyles(isDarkTheme);
  const styles = dynamicStyles(colors);

  const [totalAnimals, setTotalAnimals] = useState<number>(0);

  const loadAnimal = async () => {
    const animales = await getSimplificatedDataAnimalsWithNotes(String(user?.userId));
    const lengthAnimals = await getLenghtAnimal(user!.userId);
    setTotalAnimals(lengthAnimals);
    setAnimals(animales);
  };

  useEffect(() => {
    loadAnimal();
  }, []);

  const openModal = (animal: Animal) => {
    setSelectedAnimal(animal);
    modalRef.current?.open();
  };


  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAnimal();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: AnimalWithNotes }) => (
    <View style={[styles.rowFront, styles.row]}>
      <PrivateAnimalCard animal={item} />
    </View>
  );

  const renderHiddenItem = ({ item }: { item: AnimalWithNotes }) => (
    <View style={[styles.rowBack, styles.row]}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => openModal(item)}>
        <Text style={styles.hiddenText}>Eliminar</Text>
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
                leftOpenValue={0}
                rightOpenValue={-65} 
                refreshing={refreshing}
                disableRightSwipe
                onRefresh={handleRefresh}
                disableLeftSwipe={false}
                />

        ) : (
          <Text style={[GlobalStyles.error, { color: colors.rojo }]}>No hay animales registrados</Text>
        )}
      </View>

      <Modalize ref={modalRef} modalHeight={200} modalStyle={{ backgroundColor: colors.fondo }}>
        <ContendModal selectedAnimal={selectedAnimal!} modalRef={modalRef} onPress={loadAnimal}/>
      </Modalize>
    </>
  );
};

const dynamicStyles = (colors: ReturnType<typeof getDynamicColors>) =>
    StyleSheet.create({
      container: {
        width: '100%',
      },
      row:{
        width: '100%',
        height: 150,
        marginVertical: 10,
        borderRadius: 30,
      },
      rowFront: {
        backgroundColor: colors.fondo,
      },
      rowBack: {
        overflow: 'hidden',
      },
      deleteButton: {
        flex: 1, 
        height: '100%', 
        width: 340,
        justifyContent: 'center',
        alignItems: 'flex-end', 
        backgroundColor: colors.rojo,
        padding: 10,
      },
      hiddenText: {
        color: 'white',
        fontWeight: 'bold',
      },
      modalContent: {
        flex: 1,
        padding: 20,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      modalId: {
        fontSize: 16,
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
  
interface ContendModalProps {
    selectedAnimal: Animal;
    modalRef: React.RefObject<Modalize>;
    onPress: () => void;
}
    const ContendModal: React.FC<ContendModalProps> = ({ selectedAnimal, modalRef, onPress }) => {
    const { isDarkTheme } = useTheme();
    const colors = getDynamicColors(isDarkTheme);
    const styles = dynamicStyles(colors);
    
    const deleteAnimal = async () => {
        if (selectedAnimal) {
          await deleteDataAnimal(selectedAnimal.id);
          modalRef.current?.close();
          onPress();
        }
      };

    return  (
        <View style={styles.modalContent}>
          <Text style={[styles.modalTitle, { color: colors.naranja }]}>¿Estás seguro de eliminar este animal?</Text>
          {selectedAnimal && (
            <>
              <Text style={[styles.modalId, { color: colors.blanco }]}>ID del animal: {selectedAnimal.id}</Text>
              <Text style={[styles.modalId, { color: colors.blanco }]}>Nombre del animal: {selectedAnimal.nombre}</Text>
            </>
          )}
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.naranja }]}
              onPress={() => modalRef.current?.close()}
            >
              <Text style={[styles.modalButtonText, { color: colors.blanco }]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.rojo }]}
              onPress={deleteAnimal}
            >
              <Text style={[styles.modalButtonText, { color: 'white' }]}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}

export default Home;
