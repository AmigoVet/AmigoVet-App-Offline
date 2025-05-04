import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useChat } from '../../../../lib/hooks/useChat';
import { newColors } from '../../../styles/colors';
import { constants } from '../../../styles/constants';
import MessageInput from '../animalView/components/MessageInput';
import SendButton from '../animalView/components/SendButton';
import { RootStackParamList } from '../../../navigator/navigationTypes';
import { RouteProp, useRoute } from '@react-navigation/native';
import GlobalContainer from '../../../components/GlobalContainer';
import CustomScrollView from '../../../components/customs/CustomScrollView';
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';

type GptChatRouteProp = RouteProp<RootStackParamList, 'GptChat'>;

const GptChat: React.FC = () => {
  const route = useRoute<GptChatRouteProp>();
  const chatData = route.params?.chatData;
  const { animals } = useAnimalStore();
  const animal = chatData?.animalId ? animals.find((a) => a.id === chatData.animalId) : undefined;
  const chatId = chatData?.id;

  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState<string>('');
  const { messages, isLoading, fetchMessages, sendMessage } = useChat();

  useEffect(() => {
    if (!animal?.id || !chatId) {
      return;
    }

    const initializeChat = async () => {
      await fetchMessages(chatId);
    };
    initializeChat();
  }, [animal?.id, chatId, fetchMessages]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim() === '' || !animal?.id || !chatId) {
      return;
    }
    await sendMessage(chatId, animal, message);
    setMessage('');
  };

  const isButtonDisabled = isLoading || message.trim() === '' || !animal?.id || !chatId;

  if (!animal || !chatId) {
    return (
      <GlobalContainer style={styles.container}>
        <Text style={styles.errorText}>No animal or chat data available</Text>
      </GlobalContainer>
    );
  }

  return (
    <GlobalContainer style={styles.container}>
      <CustomScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chat with {animal.nombre}</Text>
        </View>

        <ScrollView style={styles.messageContainer} ref={scrollViewRef}>
          {messages.map((item) => (
            <View
              key={item.id}
              style={[
                styles.messageBubble,
                item.owner === 'User'
                  ? styles.userMessage
                  : item.owner === 'IA'
                  ? styles.gptMessage
                  : styles.systemMessage,
              ]}
            >
              <Text style={item.owner === 'User' ? styles.userText : styles.gptText}>
                {item.content}
              </Text>
            </View>
          ))}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={newColors.fondo_secundario} />
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <MessageInput
            value={message}
            onChangeText={setMessage}
            editable={!isLoading && !!animal.id && !!chatId}
          />
          <SendButton
            onPress={handleSendMessage}
            disable={isButtonDisabled}
            isLoading={isLoading}
          />
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: newColors.gris,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: newColors.fondo_principal,
    fontFamily: constants.FontText,
  },
  messageContainer: {
    flexGrow: 1,
    padding: 10,
    maxHeight: 800,
    minHeight: 300,
  },
  messageBubble: {
    padding: 10,
    borderRadius: constants.borderRadius / 2,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: newColors.verde_light,
    alignSelf: 'flex-end',
  },
  gptMessage: {
    backgroundColor: newColors.fondo_secundario,
    alignSelf: 'flex-start',
  },
  systemMessage: {
    backgroundColor: newColors.rojo,
    alignSelf: 'center',
  },
  userText: {
    color: newColors.fondo_secundario,
    fontFamily: constants.FontText,
  },
  gptText: {
    color: newColors.fondo_principal,
    fontFamily: constants.FontText,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: newColors.gris,
  },
  loadingContainer: {
    padding: 10,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: newColors.rojo,
    fontFamily: constants.FontText,
    textAlign: 'center',
  },
});

export default GptChat;