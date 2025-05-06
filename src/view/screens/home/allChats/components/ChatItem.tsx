import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable, Modal, Platform, ActionSheetIOS, TouchableWithoutFeedback, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAnimalStore } from '../../../../../lib/store/useAnimalStore';
import { useChat } from '../../../../../lib/hooks/useChat';
import { NavigationProp } from '../../../../navigator/navigationTypes';
import { Chat } from '../../../../../lib/interfaces/chats';
import { newColors } from '../../../../styles/colors';
import { constants } from '../../../../styles/constants';
import Icon from '@react-native-vector-icons/ionicons';


const ChatItem = ({ item }: { item: Chat }) => {
  const { animals } = useAnimalStore();
  const { deleteChat } = useChat();
  const navigation = useNavigation<NavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);

  const animal = animals.find((a) => a.id === item.animalId);
  const animalImage = animal?.image ?? 'https://example.com/default-image.png';
  const lastMessage = item.lastMessage?.content
    ? item.lastMessage.content.substring(0, 50) + (item.lastMessage.content.length > 50 ? '...' : '')
    : 'No messages yet';

  const handleDeleteChat = async () => {
    try {
      setModalVisible(false);
      await deleteChat(item.id);
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while deleting the chat. Please try again later.',
        [{ text: 'OK' }],
      );
    }

  };

  const confirmDeleteChat = () => {
    Alert.alert(
      'Delete Chat',
      'Are you sure you want to delete this chat? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: handleDeleteChat,
        },
      ],
      { cancelable: true }
    );
  };

  const handleOptionsPress = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Delete Chat'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
          title: 'Chat Options',
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            confirmDeleteChat();
          }
        }
      );
    } else {
      setModalVisible(true);
    }
  };

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
        <Pressable style={styles.pressable} onPress={handleOptionsPress}>
          <Icon name="ellipsis-vertical" color={newColors.fondo_secundario} size={20} accessibilityLabel="Chat options" />
        </Pressable>
      </View>

      {/* Android Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Chat Options</Text>
                <TouchableOpacity style={styles.modalButton} onPress={confirmDeleteChat}>
                  <Text style={styles.modalButtonTextDestructive}>Delete Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  pressable: {
    paddingTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: newColors.fondo_principal,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: newColors.fondo_secundario,
    fontFamily: constants.FontTitle,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  modalButtonText: {
    fontSize: 16,
    color: newColors.fondo_secundario,
    fontFamily: constants.FontText,
    textAlign: 'center',
  },
  modalButtonTextDestructive: {
    fontSize: 16,
    color: newColors.rojo,
    fontFamily: constants.FontText,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: newColors.fondo_secundario,
  },
});

export default ChatItem;
