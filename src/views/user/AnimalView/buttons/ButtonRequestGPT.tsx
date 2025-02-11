import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { newColors } from '../../../../assets/styles/colors';
import { CustomIcon } from '../../../../components/Customs';
import { Animal, Notes } from '../../../../lib/interfaces/animal';
import { requestGptStyles } from './styles/RequestGptStyles';
import MessageInput from './components/MessageInput';
import SendButton from './components/SendButton';
import { Message } from '../../../../lib/interfaces/messages';

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

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9), 
      message: message,
      owner: "User",
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };


  return (
    <>
      <Pressable style={styles.button} onPress={() => modalRefGpt.current?.open()}>
        <CustomIcon name="sparkles-sharp" size={30} color={newColors.fondo_principal} />
      </Pressable>
      
      <Modalize ref={modalRefGpt} adjustToContentHeight modalStyle={styles.modal}>

        {/* Header del modal */}
        <View style={styles.header}> 
          <Text style={styles.headerTitle}>
            Escribe tu pregunta a tu asistente personal
          </Text>
          <Pressable style={{ justifyContent: 'flex-end' }} onPress={() => modalRefGpt.current?.close()}>
            <CustomIcon name="close-circle-outline" size={30} color={newColors.rojo} />
          </Pressable>
        </View>

        {/* Contenedor de mensajes */}
        <View style={styles.container}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.messageBubble, item.owner === "User" ? styles.userMessage : styles.gptMessage]}>
                <Text style={[item.owner === "User" ? styles.userText : styles.gptText]}>{item.message}</Text>
              </View>
            )}
          />
        </View>

        {/* Footer con input y opciones de envío */}
        <View style={styles.footer}>
          <MessageInput value={message} onChangeText={setMessage} />
          <SendButton onPress={() => handleSendMessage()}/>
        </View>

      </Modalize>
    </>
  );
};

export default ButtonRequestGPT;
