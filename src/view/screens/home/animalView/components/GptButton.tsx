import React from 'react';
import CustomButton from '../../../../components/customs/CustomButton';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '../../../../navigator/navigationTypes';
import { Animal } from '../../../../../lib/interfaces/Animal';
import { newColors } from '../../../../styles/colors';
import { useChat } from '../../../../../lib/hooks/useChat';

interface GptButtonProps {
  animal: Animal;
}

const GptButton = ({ animal }: GptButtonProps) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { createChat } = useChat();

  const generateChatId = () => Math.random().toString(36).substr(2, 9);

  const handleNewChat = async () => {
    const chatId = generateChatId();
    const chatTitle = `Chat with ${animal.nombre}`;
    await createChat(animal.id, chatTitle, chatId);
    navigate('GptChat', {
      chatData: {
        id: chatId,
        animalId: animal.id,
        title: chatTitle,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    });
  };

  return (
    <View style={styles.container}>
      <CustomButton text="Request GPT" onPress={handleNewChat} />
      <CustomButton
        text="View All Chats"
        onPress={() => navigate('AllChats')}
        backgroundColor={newColors.fondo_principal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default GptButton;
