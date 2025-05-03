import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Animal } from '../../../../../lib/interfaces/Animal';
import CustomButton from '../../../../components/customs/CustomButton';
import { questionIA } from '../../../../../lib/api/artificialInteligence';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';
import MessageInput from './MessageInput';
import SendButton from './SendButton';

interface Message {
  id: string;
  message: string;
  owner: 'User' | 'IA' | 'System';
}

interface GptRequestProps {
  animal: Animal;
}

const GptRequest: React.FC<GptRequestProps> = ({ animal }) => {
  const modalRef = useRef<Modalize>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);

  const splitResponseIntoParagraphs = (response: string): string[] => {
    return response
      .split('\n')
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => paragraph.length > 0);
  };

  const handleSendMessage = async () => {
    if (message.trim() === '') {return;}

    setIsLoadingRequest(true);
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      owner: 'User',
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');

    try {
      const response = await questionIA(animal, message);
      const content = response.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('No se recibió contenido en la respuesta del servidor');
      }

      const paragraphs = splitResponseIntoParagraphs(content);
      paragraphs.forEach((paragraph) => {
        const responseMessage: Message = {
          id: Math.random().toString(36).substr(2, 9),
          message: paragraph,
          owner: 'IA',
        };
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
      });
    } catch (error) {
      console.error('Error al procesar el mensaje:', error);
      const errorMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        message: 'Lo siento, hubo un error al procesar tu mensaje.',
        owner: 'System',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoadingRequest(false);
    }
  };

  const isButtonDisabled = isLoadingRequest || message.trim() === '';

  return (
    <>
      <View style={styles.container}>
        <CustomButton
          backgroundColor={newColors.fondo_secundario}
          text="Pregunta a GPT"
          onPress={() => modalRef.current?.open()}
        />
      </View>

      <Modalize
        ref={modalRef}
        adjustToContentHeight
        modalStyle={styles.modal}
        scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
        closeOnOverlayTap={false}
        panGestureEnabled={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Escribe tu pregunta a tu asistente personal
          </Text>
          <CustomButton
            text=""
            icon="close-circle-outline"
            onPress={() => modalRef.current?.close()}
            backgroundColor="transparent"
          />
        </View>

        <ScrollView
          style={styles.messageContainer}
          ref={(scrollViewRef) => {
            if (scrollViewRef) {
              scrollViewRef.scrollToEnd({ animated: true });
            }
          }}
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
              <Text
                style={
                  item.owner === 'User' ? styles.userText : styles.gptText
                }
              >
                {item.message}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <MessageInput
            value={message}
            onChangeText={setMessage}
            editable={!isLoadingRequest}
          />
          <SendButton
            onPress={handleSendMessage}
            disable={isButtonDisabled}
            isLoading={isLoadingRequest}
          />
        </View>
      </Modalize>
    </>
  );
};

export default GptRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modal: {
    backgroundColor: newColors.fondo_principal,
    borderTopLeftRadius: constants.borderRadius,
    borderTopRightRadius: constants.borderRadius,
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
});
