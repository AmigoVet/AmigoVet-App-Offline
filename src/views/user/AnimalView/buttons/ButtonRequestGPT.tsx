import { View, Text, Pressable, StyleSheet, FlatList, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { newColors } from '../../../../assets/styles/colors';
import { CustomIcon } from '../../../../components/Customs';
import { Animal, Notes } from '../../../../lib/interfaces/animal';
import { requestGptStyles } from './styles/RequestGptStyles';
import MessageInput from './components/MessageInput';
import SendButton from './components/SendButton';
import { Message } from '../../../../lib/interfaces/messages';
import { gptRequest, testGptRequest } from '../../../../lib/functions/gptRequest';

interface Props {
  animal: Animal;
  registers: any[]; 
  notes: Notes[];
}

const ButtonRequestGPT: React.FC<Props> = ({ animal, registers, notes }) => {
  const modalRefGpt = useRef<Modalize>(null);
  const styles = requestGptStyles;

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);

  const splitResponseIntoParagraphs = (response: string): string[] => {
    return response
      .split('\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0);
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    
    setIsLoadingRequest(true);

    try {
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9), 
        message: message,
        owner: "User",
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage("");

      const response = await testGptRequest(message, animal, registers, notes);
      
      const paragraphs = splitResponseIntoParagraphs(response);

      paragraphs.forEach((paragraph) => {
        const newMessageGpt: Message = {
          id: Math.random().toString(36).substr(2, 9), 
          message: paragraph,
          owner: "IA",
        };
        setMessages(prevMessages => [...prevMessages, newMessageGpt]);
      });

    } catch (error) {
      console.error('Error al procesar el mensaje:', error);
      const errorMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        message: "Lo siento, hubo un error al procesar tu mensaje.",
        owner: "IA",
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoadingRequest(false);
    }
  };

  const isButtonDisabled = isLoadingRequest || message.trim() === "";

  return (
    <>
      <Pressable style={styles.button} onPress={() => modalRefGpt.current?.open()}>
        <CustomIcon name="sparkles-sharp" size={30} color={newColors.fondo_principal} />
      </Pressable>
      
      <Modalize
        ref={modalRefGpt}
        adjustToContentHeight
        modalStyle={styles.modal}
        scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
        closeOnOverlayTap={false} 
        panGestureEnabled={false} 
      >
        {/* Header del modal */}
        <View style={styles.header}> 
          <Text style={styles.headerTitle}>
            Escribe tu pregunta a tu asistente personal
          </Text>
          <Pressable 
            style={{ justifyContent: 'flex-end' }} 
            onPress={() => modalRefGpt.current?.close()}
          >
            <CustomIcon name="close-circle-outline" size={30} color={newColors.rojo} />
          </Pressable>
        </View>

        {/* Contenedor de mensajes */}
        <ScrollView 
          style={[styles.container]}
          ref={scrollViewRef => {
            if (scrollViewRef) {
              scrollViewRef.scrollToEnd({ animated: true });
            }
          }}
        >
          {messages.map((item, index) => (
            <View 
              key={item.id}
              style={[
                styles.messageBubble, 
                item.owner === "User" ? styles.userMessage : styles.gptMessage,
                index === messages.length - 1 && { marginBottom: 40 }
              ]}
            >
              <Text style={[
                item.owner === "User" ? styles.userText : styles.gptText
              ]}>
                {item.message}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Footer con input y opciones de envío */}
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

export default ButtonRequestGPT;