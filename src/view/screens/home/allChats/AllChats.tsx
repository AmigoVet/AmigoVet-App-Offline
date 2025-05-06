import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useChat } from '../../../../lib/hooks/useChat';
import { RootStackParamList } from '../../../navigator/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { newColors } from '../../../styles/colors';
import { constants } from '../../../styles/constants';
import GlobalContainer from '../../../components/GlobalContainer';
import { Chat } from '../../../../lib/interfaces/chats';
import Header from '../../../components/Header';
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AllChats: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { chats, fetchChats, isLoading } = useChat();
  const { animals } = useAnimalStore();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const renderChatItem = ({ item }: { item: Chat }) => {
    const animal = animals.find((a) => a.id === item.animalId);
    const animalName = animal ? animal.nombre : 'Animal desconocido';
    const animalImage = animal ? animal.image : 'https://example.com/default-image.png'; // Default image URL

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('GptChat', { chatData: item })}
      >
        <View style={styles.chatContent}>
          <Text style={styles.chatTitle}>{item.title}</Text>
          <Text style={styles.animalName}>{animalName}</Text>
          <Text style={styles.chatDate}>
            {new Date(item.updated_at).toLocaleDateString()}
          </Text>
          <View style={styles.imageContainer}>
            <Image source={{ uri: animalImage }} style={styles.circle} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <GlobalContainer style={styles.container}>
      <Header title="Mensajes" iconOnPress="chevron-back-outline" onPress={() => navigation.goBack()} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando chats...</Text>
        </View>
      ) : chats.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay chats disponibles</Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
        />
      )}
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: newColors.fondo_principal,
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: newColors.gris,
    backgroundColor: newColors.fondo_secundario,
  },
  chatContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: newColors.fondo_principal,
    fontFamily: constants.FontText,
  },
  animalName: {
    fontSize: 14,
    color: newColors.fondo_principal,
    fontFamily: constants.FontText,
    marginTop: 4,
    opacity: 0.9,
  },
  chatDate: {
    fontSize: 12,
    color: newColors.gris,
    fontFamily: constants.FontText,
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: newColors.fondo_principal,
    fontFamily: constants.FontText,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: newColors.fondo_principal,
    fontFamily: constants.FontText,
  },
  imageContainer: {
    backgroundColor: newColors.fondo_principal,
    padding: 5,
    borderRadius: 55,
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: newColors.fondo_secundario,
  },
});
export default AllChats;