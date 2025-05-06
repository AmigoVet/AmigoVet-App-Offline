import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { useChat } from '../../../../lib/hooks/useChat';
import { RootStackParamList } from '../../../navigator/navigationTypes';
import { newColors } from '../../../styles/colors';
import { constants } from '../../../styles/constants';
import GlobalContainer from '../../../components/GlobalContainer';
import Header from '../../../components/Header';
import ChatItem from './components/ChatItem';
import { Chat } from '../../../../lib/interfaces/chats';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AllChats: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { chats, fetchChats, isLoading } = useChat();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const renderChatItem = ({ item }: { item: Chat }) => <ChatItem item={item} />;

  return (
    <GlobalContainer style={styles.container}>
      <Header
        title="Mensajes"
        iconOnPress="chevron-back-outline"
        onPress={() => navigation.goBack()}
      />
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
  },
  emptyText: {
    fontSize: 16,
    color: newColors.fondo_principal,
    fontFamily: constants.FontText,
  },
});

export default AllChats;
