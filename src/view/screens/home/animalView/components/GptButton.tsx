import React from 'react';
import CustomButton from '../../../../components/customs/CustomButton';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '../../../../navigator/navigationTypes';
import { Animal } from '../../../../../lib/interfaces/Animal';
import { useChat } from '../../../../../lib/hooks/useChat';
import { v4 as uuidv4 } from 'uuid';

interface GptButtonProps {
  animal: Animal;
}

const GptButton = ({ animal }: GptButtonProps) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { createChat } = useChat();

  const handleNewChat = async () => {
    const chatId = uuidv4();
    const chatTitle = `Chat con ${animal.nombre}`;
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
      <CustomButton text="Pregunta a una IA" onPress={handleNewChat} />
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
