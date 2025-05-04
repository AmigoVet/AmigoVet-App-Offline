import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useChat } from '../../../../lib/hooks/useChat';
import { RootStackParamList } from '../../../navigator/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { newColors } from '../../../styles/colors';
import { constants } from '../../../styles/constants';
import GlobalContainer from '../../../components/GlobalContainer';
import CustomScrollView from '../../../components/customs/CustomScrollView';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AllChats: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { chats, fetchChats, isLoading } = useChat();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const renderChatItem = ({ item }: { item: { id: string; title: string; updated_at: string } }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('GptChat', { chatData: item })}
    >
      <Text style={styles.chatTitle}>{item.title}</Text>
      <Text style={styles.chatDate}>
        {new Date(item.updated_at).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <GlobalContainer style={styles.container}>
      <CustomScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>All Chats</Text>
        </View>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading chats...</Text>
          </View>
        ) : chats.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No chats available</Text>
          </View>
        ) : (
          <FlatList
            data={chats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            style={styles.chatList}
          />
        )}
      </CustomScrollView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: newColors.fondo_secundario,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: newColors.gris,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: newColors.fondo_principal,
    fontFamily: constants.FontText,
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: newColors.gris,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatTitle: {
    fontSize: 16,
    color: newColors.fondo_principal,
    fontFamily: constants.FontText,
  },
  chatDate: {
    fontSize: 14,
    color: newColors.gris,
    fontFamily: constants.FontText,
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
  errorText: {
    fontSize: 16,
    color: newColors.rojo,
    fontFamily: constants.FontText,
    textAlign: 'center',
  },
});

export default AllChats;