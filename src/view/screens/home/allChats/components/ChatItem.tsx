import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import { RootStackParamList } from '../../../../navigator/navigationTypes';
import { Chat } from '../../../../../lib/interfaces/chats';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ChatItem = ({ item }: { item: Chat }) => {
  const { animals } = useAnimalStore();
  const navigation = useNavigation<NavigationProp>();

  const animal = animals.find((a) => a.id === item.animalId);
  const animalImage = animal?.image ?? 'https://example.com/default-image.png';
  const lastMessage = item.lastMessage?.content
    ? item.lastMessage.content.substring(0, 50) + (item.lastMessage.content.length > 50 ? '...' : '')
    : 'No messages yet';

  return (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('GptChat', { chatData: item })}
    >
      <View style={styles.chatContent}>
        <Image source={{ uri: animalImage }} style={styles.circle} />
        <View style={styles.textContainer}>
          <View style={styles.headerContent}>
            <Text style={styles.chatTitle}>{item.title}</Text>
            <Text style={styles.chatDate}>
              {new Date(item.updated_at).toLocaleDateString()}
            </Text>
          </View>
          <Text style={styles.lastMessage}>{lastMessage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: constants.borderWidth,
    borderColor: newColors.fondo_secundario,
    borderRadius: constants.borderRadius,
  },
  chatContent: {
    flexDirection: 'row',
    gap: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: newColors.fondo_secundario,
    fontFamily: constants.FontTitle,
  },
  animalName: {
    fontSize: 14,
    color: newColors.fondo_secundario,
    fontFamily: constants.FontText,
    marginTop: 4,
    opacity: 0.9,
  },
  lastMessage: {
    fontSize: 12,
    color: newColors.gris,
    fontFamily: constants.FontText,
    marginTop: 4,
    opacity: 0.8,
  },
  chatDate: {
    fontSize: 12,
    color: newColors.gris,
    fontFamily: constants.FontText,
    marginTop: 4,
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: newColors.fondo_secundario,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ChatItem;
