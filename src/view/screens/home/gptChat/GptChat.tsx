import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useChat } from '../../../../lib/hooks/useChat';
import { newColors } from '../../../styles/colors';
import { constants } from '../../../styles/constants';
import MessageInput from '../animalView/components/MessageInput';
import SendButton from '../animalView/components/SendButton';
import { NavigationProp, RootStackParamList } from '../../../navigator/navigationTypes';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import GlobalContainer from '../../../components/GlobalContainer';
import CustomScrollView from '../../../components/customs/CustomScrollView';
import { useAnimalStore } from '../../../../lib/store/useAnimalStore';
import Header from '../../../components/Header';

type GptChatRouteProp = RouteProp<RootStackParamList, 'GptChat'>;

const GptChat: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
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
      <GlobalContainer >
        <Text style={styles.errorText}>No animal or chat data available</Text>
      </GlobalContainer>
    );
  }

  return (
    <GlobalContainer >
      <Header title={chatData.title} iconOnPress="chevron-back-outline" onPress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80}
      >
        <CustomScrollView style={styles.scrollViewContainer}>
          <ScrollView
            style={styles.messageContainer}
            ref={scrollViewRef}
            contentContainerStyle={styles.messageContentContainer}
          >
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
        </CustomScrollView>
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
      </KeyboardAvoidingView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
  messageContainer: {
    flexGrow: 1,
    padding: 10,
  },
  messageContentContainer: {
    flexGrow: 1,
    paddingBottom: 10,
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
    fontWeight: '600',
  },
  gptText: {
    color: newColors.fondo_principal,
    fontFamily: constants.FontText,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: constants.borderWidth,
    borderLeftWidth: constants.borderWidth,
    borderRightWidth: constants.borderWidth,
    gap: 10,
    borderTopColor: newColors.fondo_secundario,
    borderLeftColor: newColors.fondo_secundario,
    borderRightColor: newColors.fondo_secundario,
    borderRadius: constants.borderRadius,
    borderEndEndRadius: 0,
    borderEndStartRadius: 0,
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
